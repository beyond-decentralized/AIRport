"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const typedi_1 = require("typedi");
const baseDaos_1 = require("../../generated/baseDaos");
const qSchema_1 = require("../../generated/qSchema");
const diTokens_1 = require("../../diTokens");
let TerminalDao = class TerminalDao extends baseDaos_1.BaseTerminalDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async findTerminalVerificationRecords(terminalIds) {
        const resultMapByTerminalId = new Map();
        let t;
        const results = await this.airportDb.find.sheet({
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
        const results = await this.airportDb.find.sheet({
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
};
TerminalDao = __decorate([
    typedi_1.Service(diTokens_1.TERMINAL_DAO),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.UtilsToken))
], TerminalDao);
exports.TerminalDao = TerminalDao;
//# sourceMappingURL=TerminalDao.js.map