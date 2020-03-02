"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const tokens_1 = require("../../tokens");
class SyncOutRepositoryTransactionBlockCreator {
    // Get new repository transaction histories not yet in RepoTransBlocks
    async createNewBlocks(sharingNodeIds, terminal) {
        const [actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, schemaDao, sharingNodeRepositoryDao] = await di_1.container(this).get(holding_pattern_1.ACTOR_DAO, holding_pattern_1.REPOSITORY_DAO, moving_walkway_1.REPO_TRANS_BLOCK_DAO, moving_walkway_1.REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, traffic_pattern_1.SCHEMA_DAO, moving_walkway_1.SHARING_NODE_REPOSITORY_DAO);
        const [sharingNodeIdMapByRepositoryId, repoTransHistoriesToSync] = await sharingNodeRepositoryDao
            .findNewRepoTransHistoriesForSharingNodes(sharingNodeIds);
        const repositoryIdSet = new Set();
        const actorIdSet = new Set();
        const repositoryIdsByActorId = new Map();
        const repoTransHistoryMapByRepositoryId = new Map();
        const schemaVersionIds = new Set();
        const schemaVersionIdSetsByRepository = new Map();
        const repositoryTransactionHistoryIds = new Set();
        this.gatherIdsForBlockCreation(repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet, repoTransHistoryMapByRepositoryId, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
        const repositoryTransactionBlocks = await this.createNewBlocksAndSetRepoTransHistoryBlockIds(schemaVersionIds, schemaVersionIdSetsByRepository, terminal, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId, actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, schemaDao);
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
            const repoTransHistoriesForRepositoryId = ground_control_1.ensureChildArray(repoTransHistoryMapByRepositoryId, repositoryId);
            repoTransHistoriesForRepositoryId.push(repoTransHistory);
            this.gatherHistoryIds(repoTransHistory, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
        });
    }
    gatherHistoryIds(repoTransHistory, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId) {
        const repoTransHistoryActorId = repoTransHistory.actor.id;
        actorIdSet.add(repoTransHistoryActorId);
        const repositoryId = repoTransHistory.repository.id;
        let repositoryIdsForActorId = ground_control_1.ensureChildJsSet(repositoryIdsByActorId, repoTransHistoryActorId);
        repositoryIdsForActorId.add(repositoryId);
        const schemaVersionIdSetForRepo = ground_control_1.ensureChildJsSet(schemaVersionIdSetsByRepository, repositoryId);
        repoTransHistory.operationHistory.forEach(operationHistory => {
            const schemaVersionId = operationHistory.entity.schemaVersion.id;
            schemaVersionIds.add(schemaVersionId);
            schemaVersionIdSetForRepo.add(schemaVersionId);
            operationHistory.recordHistory.forEach(recordHistory => {
                const recordHistoryActorId = recordHistory.actor.id;
                actorIdSet.add(recordHistoryActorId);
                repositoryIdsForActorId
                    = ground_control_1.ensureChildJsSet(repositoryIdsByActorId, recordHistoryActorId);
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
    async createNewBlocksAndSetRepoTransHistoryBlockIds(schemaVersionIds, schemaVersionIdSetsByRepository, terminal, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId, actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, schemaDao) {
        const schemasByRepositoryIdMap = await this.findSchemasByRepositoryMap(schemaVersionIds, schemaVersionIdSetsByRepository, schemaDao);
        const repoTransBlockDataByRepoId = new Map();
        const repositoryMapById = await repositoryDao.findReposWithGlobalIds(Array.from(repositoryIdSet));
        const repositoryTransactionBlocks = [];
        const repoTransBlocksByRepositoryId = new Map();
        const repoTransHistoryUpdateStageValuesByBlock = new Map();
        const repoTransHistoryUpdateStageValues = [];
        for (const [repositoryId, repositoryTransactionHistories] of repoTransHistoryMapByRepositoryId) {
            this.createRepositoryTransactionBlockAndStageData(repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId, repositoryTransactionHistories, schemasByRepositoryIdMap, repoTransBlockDataByRepoId, terminal, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock);
        }
        await this.finishPopulatingRepositoryTransactionBlockData(actorIdSet, repositoryIdsByActorId, repoTransBlockDataByRepoId, repoTransBlocksByRepositoryId, repositoryTransactionBlocks, actorDao, repositoryTransactionBlockDao);
        await this.setRepositoryTransactionBlockBlockIds(repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues, repositoryTransactionHistoryUpdateStageDao);
        return repositoryTransactionBlocks;
    }
    async findSchemasByRepositoryMap(schemaVersionIds, schemaVersionIdSetsByRepository, schemaDao) {
        const schemasByRepositoryIdMap = new Map();
        const schemaMapByVersionId = await schemaDao
            .findMapByVersionIds(Array.from(schemaVersionIds));
        for (const [repositoryId, schemaVersionIdSetForRepo] of schemaVersionIdSetsByRepository) {
            const schemasForRepository = ground_control_1.ensureChildArray(schemasByRepositoryIdMap, repositoryId);
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
        let repositoryIdsForActorId = ground_control_1.ensureChildJsSet(repositoryIdsByActorId, repositoryOwnerActorId);
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
    async finishPopulatingRepositoryTransactionBlockData(actorIdSet, repositoryIdsByActorId, repoTransBlockDataByRepoId, repoTransBlocksByRepositoryId, repositoryTransactionBlocks, actorDao, repositoryTransactionBlockDao) {
        const actors = await actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(actorIdSet));
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
        await (await repositoryTransactionBlockDao).bulkCreate(repositoryTransactionBlocks, ground_control_1.CascadeOverwrite.DEFAULT, false);
    }
    async setRepositoryTransactionBlockBlockIds(repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues, repositoryTransactionHistoryUpdateStageDao) {
        for (const [repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock] of repoTransHistoryUpdateStageValuesByBlock) {
            repoTransHistoryUpdateStageValuesForBlock.forEach(repoTransHistoryUpdateStageValuesRecord => repoTransHistoryUpdateStageValuesRecord[1] = repositoryTransactionBlock.id);
        }
        await repositoryTransactionHistoryUpdateStageDao
            .insertValues(repoTransHistoryUpdateStageValues);
        await repositoryTransactionHistoryUpdateStageDao.updateRepositoryTransactionHistory();
        await repositoryTransactionHistoryUpdateStageDao.delete();
    }
    groupRepoTransBlocksBySharingNode(repositoryTransactionBlocks, sharingNodeIdMapByRepositoryId) {
        const reposTransHistoryBlockMapBySharingNodeId = new Map();
        for (const repositoryTransactionBlock of repositoryTransactionBlocks) {
            const repositoryId = repositoryTransactionBlock.repository.id;
            const sharingNodeIdSet = sharingNodeIdMapByRepositoryId.get(repositoryId);
            for (const sharingNodeId of sharingNodeIdSet) {
                ground_control_1.ensureChildArray(reposTransHistoryBlockMapBySharingNodeId, sharingNodeId)
                    .push(repositoryTransactionBlock);
            }
        }
        return reposTransHistoryBlockMapBySharingNodeId;
    }
}
exports.SyncOutRepositoryTransactionBlockCreator = SyncOutRepositoryTransactionBlockCreator;
di_1.DI.set(tokens_1.SYNC_OUT_REPO_TRANS_BLOCK_CREATOR, SyncOutRepositoryTransactionBlockCreator);
//# sourceMappingURL=SyncOutRepositoryTransactionBlockCreator.js.map