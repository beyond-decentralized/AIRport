import { DI } from '@airport/di';
import { LOG_ENTRY_VALUE_DAO } from '../tokens';
import { BaseLogEntryValueDao } from '../generated/baseDaos';
export class LogEntryValueDao extends BaseLogEntryValueDao {
}
DI.set(LOG_ENTRY_VALUE_DAO, LogEntryValueDao);
//# sourceMappingURL=LogEntryValueDao.js.map