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
Object.defineProperty(exports, "__esModule", { value: true });
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let SharingNodeRepoTransBlockStageDao = class SharingNodeRepoTransBlockStageDao extends generated_1.BaseSharingNodeRepoTransBlockStageDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlockStage;
        let snrtbs;
        return await this.airportDb.db.insertValues(dbEntity, {
            insertInto: snrtbs = generated_1.Q.SharingNodeRepoTransBlockStage,
            columns: [
                snrtbs.sharingNodeId,
                snrtbs.repositoryTransactionBlockId,
                // snrtbs.syncStatus,
                snrtbs.syncOutcomeType
            ],
            values
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: generated_1.Q.SharingNodeRepoTransBlockStage
        });
    }
};
SharingNodeRepoTransBlockStageDao = __decorate([
    Service_1.Service(InjectionTokens_2.SharingNodeRepoTransBlockStageDaoToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.AirportDatabaseToken)),
    __param(1, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], SharingNodeRepoTransBlockStageDao);
exports.SharingNodeRepoTransBlockStageDao = SharingNodeRepoTransBlockStageDao;
//# sourceMappingURL=SharingNodeRepoTransBlockStageDao.js.map