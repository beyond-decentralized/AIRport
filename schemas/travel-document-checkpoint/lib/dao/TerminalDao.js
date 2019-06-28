"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class TerminalDao extends generated_1.BaseTerminalDao {
    async findMapByIds(ownerIds, names, secondIds) {
        const terminalMap = new Map();
        const terminals = await this.findByIds(ownerIds, names, secondIds);
        for (const terminal of terminals) {
            ground_control_1.ensureChildJsMap(ground_control_1.ensureChildJsMap(terminalMap, terminal.owner.id), terminal.name)
                .set(terminal.secondId, terminal);
        }
        return terminalMap;
    }
    async findByIds(ownerIds, names, secondIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = generated_1.Q.Terminal
            ],
            where: air_control_1.and(d.owner.id.in(ownerIds), d.name.in(names), d.secondId.in(secondIds))
        });
    }
}
exports.TerminalDao = TerminalDao;
di_1.DI.set(diTokens_1.TERMINAL_DAO, TerminalDao);
//# sourceMappingURL=TerminalDao.js.map