import { DI } from '@airport/di';
import { LOG_ENTRY_DAO } from '../tokens';
import { BaseLogEntryDao } from '../generated/baseDaos';
export class LogEntryDao extends BaseLogEntryDao {
}
DI.set(LOG_ENTRY_DAO, LogEntryDao);
//# sourceMappingURL=LogEntryDao.js.map