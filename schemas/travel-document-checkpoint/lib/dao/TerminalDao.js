import { and } from '@airport/air-control';
import { DI } from '@airport/di';
import { TERMINAL_DAO } from '../tokens';
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
        for (const user of terminals) {
            values.push([
                user.uuId, user.owner.id, false,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: t = Q.Terminal,
            columns: [
                t.uuId,
                t.owner.id,
                t.isLocal
            ],
            values
        });
    }
}
DI.set(TERMINAL_DAO, TerminalDao);
//# sourceMappingURL=TerminalDao.js.map