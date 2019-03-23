import {diToken}           from '@airport/di'
import {ILogEntryDao}      from './dao/LogEntryDao'
import {ILogEntryTypeDao}  from './dao/LogEntryTypeDao'
import {ILogEntryValueDao} from './dao/LogEntryValueDao'

export const LOG_ENTRY_DAO       = diToken<ILogEntryDao>()
export const LOG_ENTRY_TYPE_DAO  = diToken<ILogEntryTypeDao>()
export const LOG_ENTRY_VALUE_DAO = diToken<ILogEntryValueDao>()