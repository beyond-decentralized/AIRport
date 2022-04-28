import { and } from '@airport/air-control';
import { BaseTerminalDao, Q } from '../generated/generated';
export class TerminalDao extends BaseTerminalDao {
    async findByOwnerIdsAndUuIds(ownerIds, uuIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = Q.Terminal
            ],
            where: and(d.owner.id.in(ownerIds), d.uuId.in(uuIds))
        });
    }
    async findByUuIds(uuIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = Q.Terminal
            ],
            where: d.uuId.in(uuIds)
        });
    }
    async insert(terminals) {
        let t;
        const values = [];
        for (const terminal of terminals) {
            values.push([
                terminal.uuId, terminal.owner.id, false,
            ]);
        }
        const ids = await this.db.insertValuesGenerateIds({
            insertInto: t = Q.Terminal,
            columns: [
                t.uuId,
                t.owner.id,
                t.isLocal
            ],
            values
        });
        for (let i = 0; i < terminals.length; i++) {
            const terminal = terminals[i];
            terminal.id = ids[i][0];
        }
    }
}
//# sourceMappingURL=TerminalDao.js.map