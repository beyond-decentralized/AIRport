import { and } from '@airport/air-control';
import { DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { TERMINAL_DAO } from '../tokens';
import { BaseTerminalDao, Q } from '../generated/generated';
export class TerminalDao extends BaseTerminalDao {
    async findMapByIds(ownerIds, uuIds) {
        const terminalMap = new Map();
        const terminals = await this.findByIds(ownerIds, uuIds);
        for (const terminal of terminals) {
            ensureChildJsMap(terminalMap, terminal.owner.id)
                .set(terminal.uuId, terminal);
        }
        return terminalMap;
    }
    async findByIds(ownerIds, uuIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = Q.Terminal
            ],
            where: and(d.owner.id.in(ownerIds), d.uuId.in(uuIds))
        });
    }
}
DI.set(TERMINAL_DAO, TerminalDao);
//# sourceMappingURL=TerminalDao.js.map