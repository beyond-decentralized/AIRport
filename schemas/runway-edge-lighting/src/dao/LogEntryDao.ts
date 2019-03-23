import {DI}            from '@airport/di'
import {LOG_ENTRY_DAO} from '../diTokens'
import {
	BaseLogEntryDao,
	IBaseLogEntryDao
}                      from '../generated/baseDaos'

export interface ILogEntryDao
	extends IBaseLogEntryDao {

}

export class LogEntryDao
	extends BaseLogEntryDao
	implements ILogEntryDao {

}

DI.set(LOG_ENTRY_DAO, LogEntryDao)