import { DI } from '@airport/di';
import { TERMINAL_RUN_DAO } from '../tokens';
import { BaseTerminalRunDao } from '../generated/generated';
export class TerminalRunDao extends BaseTerminalRunDao {
}
DI.set(TERMINAL_RUN_DAO, TerminalRunDao);
//# sourceMappingURL=TerminalRunDao.js.map