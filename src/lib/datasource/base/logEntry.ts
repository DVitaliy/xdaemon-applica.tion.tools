import { type ILogEntry } from '@/types/logEntry'

export abstract class LogEntryDataSource {
  abstract getAll(): Promise<ILogEntry[]>
  abstract getById(id: string): Promise<ILogEntry | null>
  abstract create(data: Pick<ILogEntry, 'Owner' | 'LogText'>): Promise<ILogEntry>
  abstract update(id: string, data: Partial<Omit<ILogEntry, 'id'>>): Promise<ILogEntry | null>
  abstract delete(id: string): Promise<boolean>
}
