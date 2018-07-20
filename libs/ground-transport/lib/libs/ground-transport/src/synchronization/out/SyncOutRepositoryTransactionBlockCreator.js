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
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
let SyncOutRepositoryTransactionBlockCreator = class SyncOutRepositoryTransactionBlockCreator {
    constructor(actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, schemaDao, sharingNodeRepositoryDao, utils) {
        this.actorDao = actorDao;
        this.repositoryDao = repositoryDao;
        this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
        this.repositoryTransactionHistoryUpdateStageDao = repositoryTransactionHistoryUpdateStageDao;
        this.schemaDao = schemaDao;
        this.sharingNodeRepositoryDao = sharingNodeRepositoryDao;
        this.utils = utils;
    }
    // Get new repository transaction histories not yet in RepoTransBlocks
    async createNewBlocks(sharingNodeIds, terminal) {
        const [sharingNodeIdMapByRepositoryId, repoTransHistoriesToSync] = await this.sharingNodeRepositoryDao
            .findNewRepoTransHistoriesForSharingNodes(sharingNodeIds);
        const repositoryIdSet = new Set();
        const actorIdSet = new Set();
        const repositoryIdsByActorId = new Map();
        const repoTransHistoryMapByRepositoryId = new Map();
        const schemaVersionIds = new Set();
        const schemaVersionIdSetsByRepository = new Map();
        const repositoryTransactionHistoryIds = new Set();
        this.gatherIdsForBlockCreation(repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet, repoTransHistoryMapByRepositoryId, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
        const repositoryTransactionBlocks = await this.createNewBlocksAndSetRepoTransHistoryBlockIds(schemaVersionIds, schemaVersionIdSetsByRepository, terminal, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId);
        return this.groupRepoTransBlocksBySharingNode(repositoryTransactionBlocks, sharingNodeIdMapByRepositoryId);
    }
    /*    Every history record is recorded as corresponding schema version.
     * Where does schema get used?
     *    OperationHistory - records which schema and version was used for a particular
     *        operation
     *    RepositorySchema - records which schemas are used in a repository
     * Are previous versions of schemas needed?
     *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, schema
     *    upgrades generate their own (not-syncable) transaction history
     *
     * So, we need all of the versions used by transaction history records. */
    gatherIdsForBlockCreation(repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet, repoTransHistoryMapByRepositoryId, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId) {
        repoTransHistoriesToSync.forEach(repoTransHistory => {
            // serialize saveTimestamp
            repoTransHistory.saveTimestamp = repoTransHistory.saveTimestamp.getTime();
            repositoryTransactionHistoryIds.add(repoTransHistory.id);
            const repositoryId = repoTransHistory.repository.id;
            repositoryIdSet.add(repoTransHistory.repository.id);
            const repoTransHistoriesForRepositoryId = this.utils.ensureChildArray(repoTransHistoryMapByRepositoryId, repositoryId);
            repoTransHistoriesForRepositoryId.push(repoTransHistory);
            this.gatherHistoryIds(repoTransHistory, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
        });
    }
    gatherHistoryIds(repoTransHistory, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId) {
        const repoTransHistoryActorId = repoTransHistory.actor.id;
        actorIdSet.add(repoTransHistoryActorId);
        const repositoryId = repoTransHistory.repository.id;
        let repositoryIdsForActorId = this.utils.ensureChildJsSet(repositoryIdsByActorId, repoTransHistoryActorId);
        repositoryIdsForActorId.add(repositoryId);
        const schemaVersionIdSetForRepo = this.utils.ensureChildJsSet(schemaVersionIdSetsByRepository, repositoryId);
        repoTransHistory.operationHistory.forEach(operationHistory => {
            const schemaVersionId = operationHistory.schemaVersion.id;
            schemaVersionIds.add(schemaVersionId);
            schemaVersionIdSetForRepo.add(schemaVersionId);
            operationHistory.recordHistory.forEach(recordHistory => {
                const recordHistoryActorId = recordHistory.actor.id;
                actorIdSet.add(recordHistoryActorId);
                repositoryIdsForActorId
                    = this.utils.ensureChildJsSet(repositoryIdsByActorId, recordHistoryActorId);
                repositoryIdsForActorId.add(repositoryId);
                // actorIdsForRepositoryId.add(recordHistoryActorId);
            });
        });
    }
    /*    Every history record is recorded as corresponding schema version.
     * Where does schema get used?
     *    OperationHistory - records which schema and version was used for a particular
     *        operation
     *    RepositorySchema - records which schemas are used in a repository
     * Are previous versions of schemas needed?
     *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, schema
     *    upgrades generate their own (not-syncable) transaction history
     *
     * So, we need all of the versions used by transaction history records. */
    async createNewBlocksAndSetRepoTransHistoryBlockIds(schemaVersionIds, schemaVersionIdSetsByRepository, terminal, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId) {
        const schemasByRepositoryIdMap = await this.findSchemasByRepositoryMap(schemaVersionIds, schemaVersionIdSetsByRepository);
        const repoTransBlockDataByRepoId = new Map();
        const repositoryMapById = await this.repositoryDao.findReposWithGlobalIds(Array.from(repositoryIdSet));
        const repositoryTransactionBlocks = [];
        const repoTransBlocksByRepositoryId = new Map();
        const repoTransHistoryUpdateStageValuesByBlock = new Map();
        const repoTransHistoryUpdateStageValues = [];
        for (const [repositoryId, repositoryTransactionHistories] of repoTransHistoryMapByRepositoryId) {
            this.createRepositoryTransactionBlockAndStageData(repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId, repositoryTransactionHistories, schemasByRepositoryIdMap, repoTransBlockDataByRepoId, terminal, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock);
        }
        await this.finishPopulatingRepositoryTransactionBlockData(actorIdSet, repositoryIdsByActorId, repoTransBlockDataByRepoId, repoTransBlocksByRepositoryId, repositoryTransactionBlocks);
        await this.setRepositoryTransactionBlockBlockIds(repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues);
        return repositoryTransactionBlocks;
    }
    async findSchemasByRepositoryMap(schemaVersionIds, schemaVersionIdSetsByRepository) {
        const schemasByRepositoryIdMap = new Map();
        const schemaMapByVersionId = await this.schemaDao
            .findMapByVersionIds(Array.from(schemaVersionIds));
        for (const [repositoryId, schemaVersionIdSetForRepo] of schemaVersionIdSetsByRepository) {
            const schemasForRepository = this.utils.ensureChildArray(schemasByRepositoryIdMap, repositoryId);
            for (const schemaVersionId of schemaVersionIdSetForRepo) {
                schemasForRepository.push(schemaMapByVersionId.get(schemaVersionId));
            }
        }
        return schemasByRepositoryIdMap;
    }
    createRepositoryTransactionBlockAndStageData(repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId, repositoryTransactionHistories, schemasByRepositoryIdMap, repoTransBlockDataByRepoId, terminal, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock) {
        const repository = repositoryMapById.get(repositoryId);
        const repositoryOwnerActorId = repository.ownerActor.id;
        actorIdSet.add(repositoryOwnerActorId);
        let repositoryIdsForActorId = this.utils.ensureChildJsSet(repositoryIdsByActorId, repositoryOwnerActorId);
        repositoryIdsForActorId.add(repositoryId);
        const repoTransBlockData = {
            terminal: {
                id: terminal.id,
                name: terminal.name,
                secondId: terminal.secondId,
                owner: {
                    uniqueId: terminal.owner.uniqueId
                }
            },
            actors: [],
            repository: repositoryMapById.get(repositoryId),
            repoTransHistories: repositoryTransactionHistories,
            schemas: schemasByRepositoryIdMap.get(repositoryId),
        };
        repoTransBlockDataByRepoId.set(repositoryId, repoTransBlockData);
        const repositoryTransactionBlock = {
            source: terminal,
            repository,
            origin: moving_walkway_1.DataOrigin.LOCAL
        };
        repositoryTransactionBlocks.push(repositoryTransactionBlock);
        repoTransBlocksByRepositoryId.set(repositoryId, repositoryTransactionBlock);
        this.createRepoTransHistoryUpdateStageValuesForBlock(repositoryTransactionHistories, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock, repositoryTransactionBlock);
        return repositoryTransactionBlock;
    }
    createRepoTransHistoryUpdateStageValuesForBlock(repositoryTransactionHistories, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock, repositoryTransactionBlock) {
        const repoTransHistoryUpdateStageValuesForBlock = [];
        for (const repositoryTransactionHistory of repositoryTransactionHistories) {
            const repoTransHistoryUpdateStageRecordValues = [
                repositoryTransactionHistory.id,
                null
            ];
            repoTransHistoryUpdateStageValuesForBlock.push(repoTransHistoryUpdateStageRecordValues);
            repoTransHistoryUpdateStageValues.push(repoTransHistoryUpdateStageRecordValues);
        }
        repoTransHistoryUpdateStageValuesByBlock.set(repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock);
    }
    async finishPopulatingRepositoryTransactionBlockData(actorIdSet, repositoryIdsByActorId, repoTransBlockDataByRepoId, repoTransBlocksByRepositoryId, repositoryTransactionBlocks) {
        const actors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(actorIdSet));
        for (const actor of actors) {
            const repositoryIdsForActorId = repositoryIdsByActorId.get(actor.id);
            for (const repositoryId of repositoryIdsForActorId) {
                const repoTransBlockData = repoTransBlockDataByRepoId.get(repositoryId);
                repoTransBlockData.actors.push(actor);
            }
        }
        for (const [repositoryId, repositoryTransactionBlock] of repoTransBlocksByRepositoryId) {
            const repoTransBlockData = repoTransBlockDataByRepoId.get(repositoryId);
            repositoryTransactionBlock.contents = JSON.stringify(repoTransBlockData);
        }
        await this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
    }
    async setRepositoryTransactionBlockBlockIds(repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues) {
        for (const [repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock] of repoTransHistoryUpdateStageValuesByBlock) {
            repoTransHistoryUpdateStageValuesForBlock.forEach(repoTransHistoryUpdateStageValuesRecord => repoTransHistoryUpdateStageValuesRecord[1] = repositoryTransactionBlock.id);
        }
        await this.repositoryTransactionHistoryUpdateStageDao
            .insertValues(repoTransHistoryUpdateStageValues);
        await this.repositoryTransactionHistoryUpdateStageDao.updateRepositoryTransactionHistory();
        await this.repositoryTransactionHistoryUpdateStageDao.delete();
    }
    groupRepoTransBlocksBySharingNode(repositoryTransactionBlocks, sharingNodeIdMapByRepositoryId) {
        const reposTransHistoryBlockMapBySharingNodeId = new Map();
        for (const repositoryTransactionBlock of repositoryTransactionBlocks) {
            const repositoryId = repositoryTransactionBlock.repository.id;
            const sharingNodeIdSet = sharingNodeIdMapByRepositoryId.get(repositoryId);
            for (const sharingNodeId of sharingNodeIdSet) {
                this.utils.ensureChildArray(reposTransHistoryBlockMapBySharingNodeId, sharingNodeId)
                    .push(repositoryTransactionBlock);
            }
        }
        return reposTransHistoryBlockMapBySharingNodeId;
    }
};
SyncOutRepositoryTransactionBlockCreator = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncOutRepositoryTransactionBlockCreatorToken),
    __param(0, typedi_1.Inject(holding_pattern_1.ActorDaoToken)),
    __param(1, typedi_1.Inject(holding_pattern_1.RepositoryDao)),
    __param(2, typedi_1.Inject(moving_walkway_1.RepositoryTransactionBlockDaoToken)),
    __param(3, typedi_1.Inject(moving_walkway_1.RepositoryTransactionHistoryUpdateStageDaoToken)),
    __param(4, typedi_1.Inject(traffic_pattern_1.SchemaDaoToken)),
    __param(5, typedi_1.Inject(moving_walkway_1.SharingNodeRepositoryDaoToken)),
    __param(6, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], SyncOutRepositoryTransactionBlockCreator);
exports.SyncOutRepositoryTransactionBlockCreator = SyncOutRepositoryTransactionBlockCreator;
//# sourceMappingURL=SyncOutRepositoryTransactionBlockCreator.js.map