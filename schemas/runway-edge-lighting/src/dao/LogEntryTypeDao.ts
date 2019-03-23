import {DI}                 from '@airport/di'
import {LOG_ENTRY_TYPE_DAO} from '../diTokens'
import {
	BaseLogEntryTypeDao,
	IBaseLogEntryDao
}                           from '../generated/baseDaos'

export interface ILogEntryTypeDao
	extends IBaseLogEntryDao {

}

export class LogEntryTypeDao
	extends BaseLogEntryTypeDao
	implements ILogEntryTypeDao {

}

DI.set(LOG_ENTRY_TYPE_DAO, LogEntryTypeDao)