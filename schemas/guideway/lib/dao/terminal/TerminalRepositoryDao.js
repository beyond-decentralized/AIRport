import { AIRPORT_DATABASE, and } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { TERMINAL_REPOSITORY_DAO } from '../../tokens';
import { BaseTerminalRepositoryDao } from '../../generated/generated';
import { Q } from '../../generated/qSchema';
export class TerminalRepositoryDao extends BaseTerminalRepositoryDao {
    async findByTerminalIdInAndRepositoryIdIn(terminalIds, repositoryIds) {
        const resultMapByTerminalId = new Map();
        let tr;
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const results = await airDb.find.sheet({
            from: [
                tr = Q.TerminalRepository
            ],
            select: [
                tr.terminal.id,
                tr.repository.id,
                tr.permission,
            ],
            where: and(tr.terminal.id.in(terminalIds), tr.repository.id.in(repositoryIds))
        });
        for (const result of results) {
            const terminalId = result[0];
            let repoMapForTerminal = resultMapByTerminalId.get(terminalId);
            if (!repoMapForTerminal) {
                repoMapForTerminal = new Map();
                resultMapByTerminalId.set(terminalId, repoMapForTerminal);
            }
            repoMapForTerminal.set(result[1], result[2]);
        }
        return resultMapByTerminalId;
    }
}
DI.set(TERMINAL_REPOSITORY_DAO, TerminalRepositoryDao);
//# sourceMappingURL=TerminalRepositoryDao.js.map