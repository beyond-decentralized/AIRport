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
const generated_1 = require("../../generated/generated");
const qSchema_1 = require("../../generated/qSchema");
const diTokens_1 = require("../../diTokens");
let TerminalRepositoryDao = class TerminalRepositoryDao extends generated_1.BaseTerminalRepositoryDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async findByTerminalIdInAndRepositoryIdIn(terminalIds, repositoryIds) {
        const resultMapByTerminalId = new Map();
        let tr;
        const results = await this.airportDb.find.sheet({
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
};
TerminalRepositoryDao = __decorate([
    typedi_1.Service(diTokens_1.TERMINAL_REPOSITORY_DAO),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.UtilsToken))
], TerminalRepositoryDao);
exports.TerminalRepositoryDao = TerminalRepositoryDao;
//# sourceMappingURL=TerminalRepositoryDao.js.map