"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const baseDaos_1 = require("../../generated/baseDaos");
const qSchema_1 = require("../../generated/qSchema");
class TerminalDao extends baseDaos_1.BaseTerminalDao {
    async findTerminalVerificationRecords(terminalIds) {
        const resultMapByTerminalId = new Map();
        let t;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        const results = await airDb.find.sheet({
            from: [
                t = qSchema_1.Q.Terminal
            ],
            select: [
                t.password,
                t.lastPollConnectionDatetime,
                t.id,
            ],
            where: t.id.in(terminalIds)
        });
        for (const result of results) {
            resultMapByTerminalId.set(result[2], result);
        }
        return resultMapByTerminalId;
    }
    async findTerminalRepositoryVerificationRecords(terminalIds, 
    // Superset of all of repository ids received for all of the above terminals
    repositoryIds) {
        const resultMapByTerminalId = new Map();
        let tr;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        const results = await airDb.find.sheet({
            from: [
                tr = qSchema_1.Q.TerminalRepository,
            ],
            select: [
                tr.terminal.id,
                tr.repository.id
            ],
            where: air_control_1.and(tr.terminal.id.in(terminalIds), 
            // Joining on the superset of the repositories should return
            // all needed records and possibly additional ones
            tr.repository.id.in(repositoryIds))
        });
        for (const result of results) {
            resultMapByTerminalId.set(result[0], result[1]);
        }
        return resultMapByTerminalId;
    }
    async findSseLoginVerificationRecords(terminalPasswords) {
        const resultMapByPassword = new Map();
        let t, tr;
        const id = air_control_1.Y, password = air_control_1.Y, lastConnectionDatetime = air_control_1.Y;
        const results = await this.db.find.tree({
            select: {
                id,
                password,
                lastConnectionDatetime
            },
            from: [
                t = qSchema_1.Q.Terminal,
            ],
            where: t.password.in(terminalPasswords),
        });
        for (const result of results) {
            resultMapByPassword.set(result.password, result);
        }
        return resultMapByPassword;
    }
    async updateLastPollConnectionDatetime(terminalIds, lastPollConnectionDatetime) {
        let t;
        await this.db.updateWhere({
            update: t = qSchema_1.Q.Terminal,
            set: {
                lastPollConnectionDatetime
            },
            where: t.id.in(terminalIds)
        });
    }
    async updateLastSseConnectionDatetime(terminalPasswords) {
        let t;
        await this.db.updateWhere({
            update: t = qSchema_1.Q.Terminal,
            set: {
                lastSseConnectionDatetime: new Date().getTime()
            },
            where: t.password.in(terminalPasswords)
        });
    }
}
exports.TerminalDao = TerminalDao;
di_1.DI.set(diTokens_1.TERMINAL_DAO, TerminalDao);
//# sourceMappingURL=TerminalDao.js.map