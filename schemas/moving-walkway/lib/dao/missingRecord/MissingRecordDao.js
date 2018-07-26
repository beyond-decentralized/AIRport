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
const air_control_1 = require("@airport/air-control");
const typedi_1 = require("typedi");
const Inject_1 = require("typedi/decorators/Inject");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let MissingRecordDao = class MissingRecordDao extends generated_1.BaseMissingRecordDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async setStatusWhereIdsInAndReturnIds(recordIdMap, status) {
        const ids = await this.findActualIdsByRecordIds(recordIdMap);
        if (!ids.length) {
            return ids;
        }
        let mr;
        await this.db.updateWhere({
            update: mr = generated_1.Q.MissingRecord,
            set: {
                status
            },
            where: mr.id.in(ids)
        });
        return ids;
    }
    async findActualIdsByRecordIds(recordIdMap) {
        const mr = generated_1.Q.MissingRecord;
        let numClauses = 0;
        let repositoryWhereFragments = [];
        for (const [repositoryId, recordIdsForRepository] of recordIdMap) {
            let schemaWhereFragments = [];
            for (const [schemaVersionId, recordIdsForSchema] of recordIdsForRepository) {
                let tableWhereFragments = [];
                for (const [tableIndex, recordIdsForTable] of recordIdsForSchema) {
                    let actorWhereFragments = [];
                    for (const [actorId, recordIdsForActor] of recordIdsForTable) {
                        numClauses++;
                        actorWhereFragments.push(air_control_1.and(mr.actorRecordId.in(Array.from(recordIdsForActor)), mr.actor.id.equals(actorId)));
                    }
                    tableWhereFragments.push(air_control_1.and(mr.entity.index.equals(tableIndex), air_control_1.or(...actorWhereFragments)));
                }
                schemaWhereFragments.push(air_control_1.and(mr.schemaVersion.id.equals(schemaVersionId), air_control_1.or(...tableWhereFragments)));
            }
            repositoryWhereFragments.push(air_control_1.and(mr.repository.id.equals(repositoryId), air_control_1.or(...schemaWhereFragments)));
        }
        if (!numClauses) {
            return [];
        }
        return await this.airportDb.find.field({
            select: mr.id,
            from: [mr],
            where: air_control_1.or(...repositoryWhereFragments)
        });
    }
    async deleteWhereIdsIn(ids) {
        let mr;
        await this.db.deleteWhere({
            deleteFrom: mr = generated_1.Q.MissingRecord,
            where: mr.id.in(ids)
        });
    }
};
MissingRecordDao = __decorate([
    typedi_1.Service(InjectionTokens_1.MissingRecordDaoToken),
    __param(0, Inject_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, Inject_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], MissingRecordDao);
exports.MissingRecordDao = MissingRecordDao;
//# sourceMappingURL=MissingRecordDao.js.map