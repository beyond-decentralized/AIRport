import { and } from '@airport/air-control';
import { DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { TERMINAL_DAO } from '../tokens';
import { BaseTerminalDao, Q } from '../generated/generated';
export class TerminalDao extends BaseTerminalDao {
    async findMapByIds(ownerIds, names, secondIds) {
        const terminalMap = new Map();
        const terminals = await this.findByIds(ownerIds, names, secondIds);
        for (const terminal of terminals) {
            ensureChildJsMap(ensureChildJsMap(terminalMap, terminal.owner.id), terminal.name)
                .set(terminal.secondId, terminal);
        }
        return terminalMap;
    }
    async findByIds(ownerIds, names, secondIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = Q.Terminal
            ],
            where: and(d.owner.id.in(ownerIds), d.name.in(names), d.secondId.in(secondIds))
        });
    }
}
DI.set(TERMINAL_DAO, TerminalDao);
//# sourceMappingURL=TerminalDao.js.map