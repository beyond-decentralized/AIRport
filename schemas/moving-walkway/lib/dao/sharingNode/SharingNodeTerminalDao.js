import { and } from '@airport/air-control';
import { DI } from '@airport/di';
import { SHARING_NODE_TERMINAL_DAO } from '../../tokens';
import { BaseSharingNodeTerminalDao, Q } from '../../generated/generated';
export class SharingNodeTerminalDao extends BaseSharingNodeTerminalDao {
    async findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(terminalId, sharingNodeIds) {
        const sharingNodeTmMapBySharingNodeId = new Map();
        let snd;
        const sharingNodeTerminals = await this.db.find.tree({
            select: {},
            from: [snd = Q.SharingNodeTerminal],
            where: and(snd.terminal.id.equals(terminalId), snd.sharingNode.id.in(sharingNodeIds))
        });
        for (const sharingNodeTerminal of sharingNodeTerminals) {
            sharingNodeTmMapBySharingNodeId.set(sharingNodeTerminal.sharingNode.id, sharingNodeTerminal);
        }
        return sharingNodeTmMapBySharingNodeId;
    }
}
DI.set(SHARING_NODE_TERMINAL_DAO, SharingNodeTerminalDao);
//# sourceMappingURL=SharingNodeTerminalDao.js.map