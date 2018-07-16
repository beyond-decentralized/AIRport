"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const typedi_1 = require("typedi");
const baseDaos_1 = require("../../generated/baseDaos");
const qSchema_1 = require("../../generated/qSchema");
const InjectionTokens_2 = require("../../InjectionTokens");
let TerminalDao = class TerminalDao extends baseDaos_1.BaseTerminalDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    findTerminalVerificationRecords(terminalIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultMapByTerminalId = new Map();
            let t;
            const results = yield this.airportDb.find.sheet({
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
        });
    }
    findTerminalRepositoryVerificationRecords(terminalIds, 
    // Superset of all of repository ids received for all of the above terminals
    repositoryIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultMapByTerminalId = new Map();
            let tr;
            const results = yield this.airportDb.find.sheet({
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
        });
    }
    findSseLoginVerificationRecords(terminalPasswords) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultMapByPassword = new Map();
            let t, tr;
            const id = air_control_1.Y, password = air_control_1.Y, lastConnectionDatetime = air_control_1.Y;
            const results = yield this.db.find.tree({
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
        });
    }
    updateLastPollConnectionDatetime(terminalIds, lastPollConnectionDatetime) {
        return __awaiter(this, void 0, void 0, function* () {
            let t;
            yield this.db.updateWhere({
                update: t = qSchema_1.Q.Terminal,
                set: {
                    lastPollConnectionDatetime
                },
                where: t.id.in(terminalIds)
            });
        });
    }
    updateLastSseConnectionDatetime(terminalPasswords) {
        return __awaiter(this, void 0, void 0, function* () {
            let t;
            yield this.db.updateWhere({
                update: t = qSchema_1.Q.Terminal,
                set: {
                    lastSseConnectionDatetime: new Date().getTime()
                },
                where: t.password.in(terminalPasswords)
            });
        });
    }
};
TerminalDao = __decorate([
    typedi_1.Service(InjectionTokens_2.TerminalDaoToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], TerminalDao);
exports.TerminalDao = TerminalDao;
//# sourceMappingURL=TerminalDao.js.map