"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
const qSchema_1 = require("../../generated/qSchema");
class TerminalRepositoryDao extends generated_1.BaseTerminalRepositoryDao {
    async findByTerminalIdInAndRepositoryIdIn(terminalIds, repositoryIds) {
        const resultMapByTerminalId = new Map();
        let tr;
        const results = await this.airDb.find.sheet({
            from: [
                tr = qSchema_1.Q.TerminalRepository
            ],
            select: [
                tr.terminal.id,
                tr.repository.id,
                tr.permission,
            ],
            where: air_control_1.and(tr.terminal.id.in(terminalIds), tr.repository.id.in(repositoryIds))
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
exports.TerminalRepositoryDao = TerminalRepositoryDao;
di_1.DI.set(diTokens_1.TERMINAL_REPOSITORY_DAO, TerminalRepositoryDao);
//# sourceMappingURL=TerminalRepositoryDao.js.map