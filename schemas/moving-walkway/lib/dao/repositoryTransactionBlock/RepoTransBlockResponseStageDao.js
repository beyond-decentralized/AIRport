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
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let RepoTransBlockResponseStageDao = class RepoTransBlockResponseStageDao extends generated_1.BaseRepoTransBlockResponseStageDao {
    constructor(airportDb, repoTransBlockResponseStageDao, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RepoTransBlockResponseStage;
        let smrs;
        return await this.airportDb.db.insertValues(dbEntity, {
            insertInto: smrs = generated_1.Q.RepoTransBlockResponseStage,
            columns: [
                smrs.id,
                // smrs.agtSyncRecordId,
                smrs.syncOutcomeType
            ],
            values
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: generated_1.Q.RepoTransBlockResponseStage
        });
    }
};
RepoTransBlockResponseStageDao = __decorate([
    Service_1.Service(InjectionTokens_2.RepoTransBlockResponseStageDaoToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.AirportDatabaseToken)),
    __param(2, Inject_1.Inject(air_control_1.UtilsToken))
], RepoTransBlockResponseStageDao);
exports.RepoTransBlockResponseStageDao = RepoTransBlockResponseStageDao;
//# sourceMappingURL=RepoTransBlockResponseStageDao.js.map