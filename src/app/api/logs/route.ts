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

export async function GET() {
  const logs = await loadLogs()
  return Response.json(logs)
}

export async function POST(request: Request) {
  const newLog = await request.json()
  const logs = await loadLogs()
  logs.push({
    ...newLog,
    id: (logs.length + 1).toString(),
    CreatedAt: new Date(),
    UpdatedAt: new Date()
  })
  await saveLogs(logs)
  return Response.json(newLog, { status: 201, headers: { 'Content-Type': 'application/json' } })
}
