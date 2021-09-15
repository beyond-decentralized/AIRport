import { AIRPORT_DATABASE, and, Y } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { TERMINAL_DAO } from '../../tokens';
import { BaseTerminalDao } from '../../generated/baseDaos';
import { Q } from '../../generated/qSchema';
export class TerminalDao extends BaseTerminalDao {
    async findTerminalVerificationRecords(terminalIds) {
        const resultMapByTerminalId = new Map();
        let t;
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const results = await airDb.find.sheet({
            from: [
                t = Q.Terminal
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
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const resultMapByTerminalId = new Map();
        let tr;
        const results = await airDb.find.sheet({
            from: [
                tr = Q.TerminalRepository,
            ],
            select: [
                tr.terminal.id,
                tr.repository.id
            ],
            where: and(tr.terminal.id.in(terminalIds), 
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
        const id = Y, password = Y, lastConnectionDatetime = Y;
        const results = await this.db.find.tree({
            select: {
                id,
                password,
                lastConnectionDatetime
            },
            from: [
                t = Q.Terminal,
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
            update: t = Q.Terminal,
            set: {
                lastPollConnectionDatetime
            },
            where: t.id.in(terminalIds)
        });
    }
    async updateLastSseConnectionDatetime(terminalPasswords) {
        let t;
        await this.db.updateWhere({
            update: t = Q.Terminal,
            set: {
                lastSseConnectionDatetime: new Date().getTime()
            },
            where: t.password.in(terminalPasswords)
        });
    }
}
DI.set(TERMINAL_DAO, TerminalDao);
//# sourceMappingURL=TerminalDao.js.map