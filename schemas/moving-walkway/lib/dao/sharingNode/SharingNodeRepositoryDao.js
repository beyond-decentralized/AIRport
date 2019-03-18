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
const air_control_2 = require("@airport/air-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const typedi_1 = require("typedi");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let SharingNodeRepositoryDao = class SharingNodeRepositoryDao extends generated_1.BaseSharingNodeRepositoryDao {
    constructor(airportDb, qMetadataUtils, repositoryTransactionHistoryDao, recordHistoryNewValueDao, recordHistoryOldValueDao, utils) {
        super(utils);
        this.airportDb = airportDb;
        this.qMetadataUtils = qMetadataUtils;
        this.repositoryTransactionHistoryDao = repositoryTransactionHistoryDao;
        this.recordHistoryNewValueDao = recordHistoryNewValueDao;
        this.recordHistoryOldValueDao = recordHistoryOldValueDao;
    }
    async findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds, sharingNodeIds) {
        const repositoriesBySharingNodeIds = new Map();
        let snr;
        let r;
        const id = air_control_1.Y;
        const sharingNodeRepos = await this.db.find.tree({
            select: {
                agtRepositoryId: air_control_1.Y,
                repository: {
                    id,
                    ownerActor: {
                        id
                    },
                    orderedId: air_control_1.Y,
                    randomId: air_control_1.Y,
                },
                sharingNode: {
                    id,
                },
            },
            from: [
                snr = generated_1.Q.SharingNodeRepository,
                r = snr.repository.innerJoin()
            ],
            where: air_control_1.and(snr.repository.id.in(repositoryIds), snr.sharingNode.id.in(sharingNodeIds))
        });
        sharingNodeRepos.forEach(sharingNodeRepo => {
            this.utils.ensureChildJsMap(repositoriesBySharingNodeIds, sharingNodeRepo.sharingNode.id)
                .set(sharingNodeRepo.repository.id, sharingNodeRepo);
        });
        return repositoriesBySharingNodeIds;
    }
    async findBySharingNodeAndAgtRepositoryIds(sharingNodeIds, agtRepositoryIds) {
        const repositoryIdsBySharingNodeAndAgtRepositoryIds = new Map();
        let snr;
        const id = air_control_1.Y;
        const sharingNodeRepos = await this.db.find.tree({
            select: {
                agtRepositoryId: air_control_1.Y,
                repository: {
                    id,
                },
                sharingNode: {
                    id,
                },
            },
            from: [
                snr = generated_1.Q.SharingNodeRepository,
            ],
            where: air_control_1.and(snr.sharingNode.id.in(sharingNodeIds), snr.agtRepositoryId.in(agtRepositoryIds))
        });
        sharingNodeRepos.forEach(sharingNodeRepo => {
            this.utils.ensureChildJsMap(repositoryIdsBySharingNodeAndAgtRepositoryIds, sharingNodeRepo.sharingNode.id)
                .set(sharingNodeRepo.agtRepositoryId, sharingNodeRepo.repository.id);
        });
        return repositoryIdsBySharingNodeAndAgtRepositoryIds;
    }
    async findNewRepoTransHistoriesForSharingNodes(sharingNodeIds) {
        const sharingNodeIdMapByRepositoryId = new Map();
        let snr = generated_1.Q.SharingNodeRepository;
        let r;
        let rth;
        // const dbEntity = this.qMetadataUtils.getDbEntity(snr);
        const sharingNodeIdsWithRepoTransHistoryIds = await this.airportDb.find.sheet({
            from: [
                snr,
                r = snr.repository.innerJoin(),
                rth = r.repositoryTransactionHistory.innerJoin(),
            ],
            select: air_control_1.distinct([
                snr.sharingNode.id,
                r.id,
                rth.id
            ]),
            where: air_control_1.and(snr.sharingNode.id.in(sharingNodeIds), rth.blockId.isNull())
        });
        const repositoryTransactionHistoryIdSet = new Set();
        for (const sharingNodeIdWithRepoTransHistoryId of sharingNodeIdsWithRepoTransHistoryIds) {
            const sharingNodeId = sharingNodeIdWithRepoTransHistoryId[0];
            const repositoryId = sharingNodeIdWithRepoTransHistoryId[1];
            this.utils.ensureChildJsSet(sharingNodeIdMapByRepositoryId, repositoryId)
                .add(sharingNodeId);
            repositoryTransactionHistoryIdSet.add(sharingNodeIdWithRepoTransHistoryId[2]);
        }
        const repositoryTransactionHistories = await this.repositoryTransactionHistoryDao
            .findWhereIdsIn(Array.from(repositoryTransactionHistoryIdSet));
        const recordHistoryIds = [];
        const recordHistoryIdSet = new Set();
        const recordHistoryMapById = new Map();
        for (const repoTransHistory of repositoryTransactionHistories) {
            for (const operationHistory of repoTransHistory.operationHistory) {
                for (const recordHistory of operationHistory.recordHistory) {
                    recordHistory.newValues = [];
                    recordHistory.oldValues = [];
                    const recordHistoryId = recordHistory.id;
                    recordHistoryIdSet.add(recordHistoryId);
                    recordHistoryMapById.set(recordHistoryId, recordHistory);
                }
            }
        }
        const oldValues = await this.recordHistoryOldValueDao.findByRecordHistoryIdIn(recordHistoryIds);
        for (const oldValue of oldValues) {
            const recordHistoryId = oldValue.recordHistory.id;
            recordHistoryMapById.get(recordHistoryId).oldValues.push(oldValue);
        }
        const newValues = await this.recordHistoryNewValueDao.findByRecordHistoryIdIn(recordHistoryIds);
        for (const newValue of newValues) {
            const recordHistoryId = newValue.recordHistory.id;
            recordHistoryMapById.get(recordHistoryId).newValues.push(newValue);
        }
        return [sharingNodeIdMapByRepositoryId, repositoryTransactionHistories];
    }
};
SharingNodeRepositoryDao = __decorate([
    typedi_1.Service(InjectionTokens_1.SharingNodeRepositoryDaoToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(air_control_2.QMetadataUtilsToken)),
    __param(2, typedi_1.Inject(holding_pattern_1.RepositoryTransactionHistoryDaoToken)),
    __param(3, typedi_1.Inject(holding_pattern_1.RecordHistoryNewValueDaoToken)),
    __param(4, typedi_1.Inject(holding_pattern_1.RecordHistoryOldValueDaoToken)),
    __param(5, typedi_1.Inject(air_control_1.UtilsToken))
], SharingNodeRepositoryDao);
exports.SharingNodeRepositoryDao = SharingNodeRepositoryDao;
//# sourceMappingURL=SharingNodeRepositoryDao.js.map