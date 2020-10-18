import { DI } from '@airport/di';
import { LOG_ENTRY_TYPE_DAO } from '../tokens';
import { BaseLogEntryTypeDao } from '../generated/baseDaos';
export class LogEntryTypeDao extends BaseLogEntryTypeDao {
}
DI.set(LOG_ENTRY_TYPE_DAO, LogEntryTypeDao);
//# sourceMappingURL=LogEntryTypeDao.js.map