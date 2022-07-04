var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { and } from '@airport/air-traffic-control';
import { Injected } from '@airport/direction-indicator';
import { BaseTerminalDao, Q } from '../generated/generated';
let TerminalDao = class TerminalDao extends BaseTerminalDao {
    async findByOwnerIdsAndGUIDs(ownerIds, GUIDs) {
        let t;
        return await this.db.find.tree({
            select: {},
            from: [
                t = Q.Terminal
            ],
            where: and(t.owner._localId.in(ownerIds), t.GUID.in(GUIDs))
        });
    }
    async findByGUIDs(GUIDs) {
        let t;
        return await this.db.find.tree({
            select: {},
            from: [
                t = Q.Terminal
            ],
            where: t.GUID.in(GUIDs)
        });
    }
    async insert(terminals, context) {
        let t;
        const values = [];
        for (const terminal of terminals) {
            values.push([
                terminal.GUID, terminal.owner._localId, false,
            ]);
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            insertInto: t = Q.Terminal,
            columns: [
                t.GUID,
                t.owner._localId,
                t.isLocal
            ],
            values
        }, context);
        for (let i = 0; i < terminals.length; i++) {
            const terminal = terminals[i];
            terminal._localId = _localIds[i][0];
        }
    }
};
TerminalDao = __decorate([
    Injected()
], TerminalDao);
export { TerminalDao };
//# sourceMappingURL=TerminalDao.js.map