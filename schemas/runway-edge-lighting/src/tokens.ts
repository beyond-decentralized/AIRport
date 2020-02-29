import {system}            from '@airport/di'
import {ILogEntryDao}      from './dao/LogEntryDao'
import {ILogEntryTypeDao}  from './dao/LogEntryTypeDao'
import {ILogEntryValueDao} from './dao/LogEntryValueDao'

const runwayEdgeLighting = system('airport').lib('runway-edge-lighting')

export const LOG_ENTRY_DAO       = runwayEdgeLighting.token<ILogEntryDao>()
export const LOG_ENTRY_TYPE_DAO  = runwayEdgeLighting.token<ILogEntryTypeDao>()
export const LOG_ENTRY_VALUE_DAO = runwayEdgeLighting.token<ILogEntryValueDao>()
