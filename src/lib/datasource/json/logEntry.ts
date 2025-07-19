import { v4 as uuid } from 'uuid'
import fs from 'fs/promises'
import path from 'path'
import { LogEntryDataSource } from '../base/logEntry'
import { type ILogEntry } from '@/types/logEntry'

const filePath = path.join(process.cwd(), 'data', 'logEntries.json')

async function read(): Promise<ILogEntry[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function write(logEntries: ILogEntry[]) {
  await fs.writeFile(filePath, JSON.stringify(logEntries, null, 2), 'utf-8')
}

export class JsonLogEntryDataSource extends LogEntryDataSource {
  async getAll() {
    return await read()
  }

  async getById(id: string) {
    const logs = await read()
    return logs.find((c) => c.id === id) || null
  }

  async create(data: Pick<ILogEntry, 'Owner' | 'LogText'>) {
    const logs = await read()
    const newLog = { id: uuid(), CreatedAt: new Date(), UpdatedAt: new Date(), ...data }
    logs.push(newLog)
    await write(logs)
    return newLog
  }

  async update(id: string, data: Partial<Pick<ILogEntry, 'Owner' | 'LogText'>>) {
    const logs = await read()
    const index = logs.findIndex((c) => c.id === id)
    if (index === -1) return null
    logs[index] = { ...logs[index], ...data }
    await write(logs)
    return logs[index]
  }

  async delete(id: string) {
    const logs = await read()
    const updated = logs.filter((c) => c.id !== id)
    await write(updated)
    return updated.length < logs.length
  }
}
