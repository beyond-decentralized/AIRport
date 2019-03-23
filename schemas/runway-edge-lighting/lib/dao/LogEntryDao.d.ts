import { BaseLogEntryDao, IBaseLogEntryDao } from '../generated/baseDaos';
export interface ILogEntryDao extends IBaseLogEntryDao {
}
export declare class LogEntryDao extends BaseLogEntryDao implements ILogEntryDao {
}
