import fs from 'node:fs/promises'
import express, { Router } from 'express'
import path from 'node:path'

const logsPath = path.join(process.cwd(), 'logs.json')

async function loadLogs() {
  const raw = await fs.readFile(logsPath, 'utf-8')
  return JSON.parse(raw)
}

async function saveLogs(logs) {
  await fs.writeFile(logsPath, JSON.stringify(logs, null, 2))
}

const router = Router()

router.get('/', async (req, res) => {
  const logs = await loadLogs()
  res.json(logs)
})

router.post('/', async (req, res) => {
  const { Owner, LogText } = req.body

  const logs = await loadLogs()
  const newLog = { id: logs.length + 1, Owner, CreatedAt: new Date().toISOString(), UpdatedAt: new Date().toISOString(), LogText }

  logs.push(newLog)
  await saveLogs(logs)

  res.status(201).json({ message: 'Log created', data: newLog })
})

router.put('/:id', async (req, res) => {
  const logs = await loadLogs()
  const logIndex = logs.findIndex((log) => log.id === parseInt(req.params.id))
  if (logIndex === -1) {
    return res.status(404).json({ message: 'Log not found' })
  }
  const log = logs[logIndex]
  if (!log) {
    return res.status(404).json({ message: 'Log not found' })
  }

  const { Owner, LogText } = req.body
  log.Owner = Owner
  log.LogText = LogText
  log.UpdatedAt = new Date().toISOString()

  logs[logIndex] = log
  await saveLogs(logs)
  res.json({ message: `Log ${req.params.id} updated`, data: log })
})

router.delete('/:id', async (req, res) => {
  const logs = await loadLogs()
  const updatedLogs = logs.filter((log) => log.id !== parseInt(req.params.id))
  if (updatedLogs.length === logs.length) {
    return res.status(404).json({ message: 'Log not found' })
  }
  await saveLogs(updatedLogs)
  res.json({ message: `Log ${req.params.id} deleted` })
})

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5002
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : ''

// Create http server
const app = express()
app.use(express.json())
app.use('/logs', router)

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    const html = template.replace(`<!--app-head-->`, rendered.head ?? '').replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
