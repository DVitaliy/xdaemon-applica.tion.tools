import fs from 'node:fs/promises'
import path from 'node:path'
import { type ILogEntry } from '@/types/logEntry'

const logsPath = path.join(process.cwd(), 'data', 'logEntries.json')

async function loadLogs() {
  const raw = await fs.readFile(logsPath, 'utf-8')
  return JSON.parse(raw)
}

async function saveLogs(logs: ILogEntry[]) {
  await fs.writeFile(logsPath, JSON.stringify(logs, null, 2))
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const logs = (await loadLogs()) as ILogEntry[]
  const index = logs.findIndex((log) => log.id === id)
  if (index === -1) {
    return new Response('Log entry not found', { status: 404 })
  }
  logs.splice(index, 1)
  await saveLogs(logs)
  return new Response('Log entry deleted', { status: 200 })
}
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const logs = (await loadLogs()) as ILogEntry[]
  const logEntry = logs.find((log) => log.id === id)
  if (!logEntry) {
    return new Response('Log entry not found', { status: 404 })
  }
  return Response.json(logEntry)
}
export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const logs = (await loadLogs()) as ILogEntry[]
  const logEntry = logs.find((log) => log.id === id)

  if (!logEntry) {
    return new Response('Log entry not found', { status: 404 })
  }

  const updatedLog = await _req.json()
  const updatedEntry = {
    ...logEntry,
    ...updatedLog,
    UpdatedAt: new Date().toISOString()
  }

  logs[logs.indexOf(logEntry)] = updatedEntry
  await saveLogs(logs)

  return Response.json(updatedEntry)
}
