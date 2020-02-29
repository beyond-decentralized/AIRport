import {DI}                  from '@airport/di'
import {LOG_ENTRY_VALUE_DAO} from '../tokens'
import {
	BaseLogEntryValueDao,
	IBaseLogEntryValueDao
}                            from '../generated/baseDaos'

export interface ILogEntryValueDao
	extends IBaseLogEntryValueDao {

}

export class LogEntryValueDao
	extends BaseLogEntryValueDao
	implements ILogEntryValueDao {

}

DI.set(LOG_ENTRY_VALUE_DAO, LogEntryValueDao)
