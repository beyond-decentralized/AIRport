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
const LogicalOperation_1 = require("@airport/air-control/lib/impl/core/operation/LogicalOperation");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let SharingNodeRepoTransBlockDao = class SharingNodeRepoTransBlockDao extends generated_1.BaseSharingNodeRepoTransBlockDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds, repoTransBlockIds) {
        const mapBySharingNodeId = new Map();
        let snrtb;
        const records = await this.db.find.tree({
            select: {},
            from: [
                snrtb = generated_1.Q.SharingNodeRepoTransBlock
            ],
            where: LogicalOperation_1.and(snrtb.sharingNode.id.in(sharingNodeIds), snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds))
        });
        for (const record of records) {
            this.utils.ensureChildJsMap(mapBySharingNodeId, record.sharingNode.id)
                .set(record.repositoryTransactionBlock.id, record);
        }
        return mapBySharingNodeId;
    }
    async updateFromResponseStage( //
    ) {
        let snrtb;
        let snrtbs;
        return await this.db.updateWhere({
            update: snrtb = generated_1.Q.SharingNodeRepoTransBlock,
            set: {
                syncStatus: air_control_1.field({
                    from: [
                        snrtbs = generated_1.Q.SharingNodeRepoTransBlockStage
                    ],
                    select: snrtbs.syncStatus,
                    where: LogicalOperation_1.and(snrtbs.sharingNodeId.equals(snrtb.sharingNode.id), snrtbs.repositoryTransactionBlockId.equals(snrtb.repositoryTransactionBlock.id))
                })
            }
        });
    }
    async updateBlockSyncStatus(sharingNodeIds, repoTransBlockIds, existingSyncStatus, newSyncStatus) {
        let snrtb;
        await this.db.updateWhere({
            update: snrtb = generated_1.Q.SharingNodeRepoTransBlock,
            set: {
                syncStatus: newSyncStatus
            },
            where: LogicalOperation_1.and(snrtb.syncStatus.equals(existingSyncStatus), snrtb.sharingNode.id.in(sharingNodeIds), snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds))
        });
    }
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlock;
        let snrtb;
        return await this.airportDb.db.insertValues(dbEntity, {
            insertInto: snrtb = generated_1.Q.SharingNodeRepoTransBlock,
            columns: [
                snrtb.sharingNode.id,
                snrtb.repositoryTransactionBlock.id,
                // snrtb.syncTimestamp,
                // snrtb.syncOutcomeType,
                // snrtb.origin,
                snrtb.syncStatus
            ],
            values
        });
    }
    async getForSharingNodeIdsAndBlockStatus(sharingNodeIds, syncStatus) {
        const repoTransBlocksBySharingNodeId = new Map();
        const repositoryTransactionBlockIds = new Set();
        let snrtb;
        const records = await this.airportDb.find.sheet({
            from: [
                snrtb = generated_1.Q.SharingNodeRepoTransBlock,
            ],
            select: [
                snrtb.sharingNode.id,
                snrtb.repositoryTransactionBlock.id
            ],
            where: LogicalOperation_1.and(snrtb.syncStatus.equals(syncStatus), snrtb.sharingNode.id.in(sharingNodeIds))
        });
        for (const record of records) {
            const sharingNodeRepoTransBlockId = record[1];
            this.utils.ensureChildArray(repoTransBlocksBySharingNodeId, record[0])
                .push(sharingNodeRepoTransBlockId);
            repositoryTransactionBlockIds.add(sharingNodeRepoTransBlockId);
        }
        return {
            repositoryTransactionBlockIds,
            repoTransBlocksBySharingNodeId
        };
    }
};
SharingNodeRepoTransBlockDao = __decorate([
    Service_1.Service(InjectionTokens_2.SharingNodeRepoTransBlockDaoToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.AirportDatabaseToken)),
    __param(1, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], SharingNodeRepoTransBlockDao);
exports.SharingNodeRepoTransBlockDao = SharingNodeRepoTransBlockDao;
//# sourceMappingURL=SharingNodeRepoTransBlockDao.js.map