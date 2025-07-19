import { LogEntryDataSource } from './datasource/base/logEntry'
import { JsonLogEntryDataSource } from './datasource/json/logEntry'

export const logEntryDataSource: LogEntryDataSource = new JsonLogEntryDataSource()
