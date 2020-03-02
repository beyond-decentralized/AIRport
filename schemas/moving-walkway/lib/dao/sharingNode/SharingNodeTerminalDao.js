"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class SharingNodeTerminalDao extends generated_1.BaseSharingNodeTerminalDao {
    async findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(terminalId, sharingNodeIds) {
        const sharingNodeTmMapBySharingNodeId = new Map();
        let snd;
        const sharingNodeTerminals = await this.db.find.tree({
            select: {},
            from: [snd = generated_1.Q.SharingNodeTerminal],
            where: air_control_1.and(snd.terminal.id.equals(terminalId), snd.sharingNode.id.in(sharingNodeIds))
        });
        for (const sharingNodeTerminal of sharingNodeTerminals) {
            sharingNodeTmMapBySharingNodeId.set(sharingNodeTerminal.sharingNode.id, sharingNodeTerminal);
        }
        return sharingNodeTmMapBySharingNodeId;
    }
}
exports.SharingNodeTerminalDao = SharingNodeTerminalDao;
di_1.DI.set(tokens_1.SHARING_NODE_TERMINAL_DAO, SharingNodeTerminalDao);
//# sourceMappingURL=SharingNodeTerminalDao.js.map