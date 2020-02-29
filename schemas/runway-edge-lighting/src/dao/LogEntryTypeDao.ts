import {DI}                 from '@airport/di'
import {LOG_ENTRY_TYPE_DAO} from '../tokens'
import {
	BaseLogEntryTypeDao,
	IBaseLogEntryTypeDao
}                           from '../generated/baseDaos'

export interface ILogEntryTypeDao
	extends IBaseLogEntryTypeDao {

}

export class LogEntryTypeDao
	extends BaseLogEntryTypeDao
	implements ILogEntryTypeDao {

}

DI.set(LOG_ENTRY_TYPE_DAO, LogEntryTypeDao)
