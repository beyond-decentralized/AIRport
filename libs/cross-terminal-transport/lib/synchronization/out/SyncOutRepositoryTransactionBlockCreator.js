import { container, DI } from '@airport/di';
import { ensureChildArray, ensureChildJsSet } from '@airport/ground-control';
import { ACTOR_DAO, REPOSITORY_DAO } from '@airport/holding-pattern';
import { DataOrigin, REPO_TRANS_BLOCK_DAO, REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, SHARING_NODE_REPOSITORY_DAO } from '@airport/moving-walkway';
import { SCHEMA_DAO } from '@airport/traffic-pattern';
import { SYNC_OUT_REPO_TRANS_BLOCK_CREATOR } from '../../tokens';
export class SyncOutRepositoryTransactionBlockCreator {
    // Get new repository transaction histories not yet in RepoTransBlocks
    async createNewBlocks(sharingNodeIds, terminal) {
        const [actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, applicationDao, sharingNodeRepositoryDao] = await container(this).get(ACTOR_DAO, REPOSITORY_DAO, REPO_TRANS_BLOCK_DAO, REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, SCHEMA_DAO, SHARING_NODE_REPOSITORY_DAO);
        const [sharingNodeIdMapByRepositoryId, repoTransHistoriesToSync] = await sharingNodeRepositoryDao
            .findNewRepoTransHistoriesForSharingNodes(sharingNodeIds);
        const repositoryIdSet = new Set();
        const actorIdSet = new Set();
        const repositoryIdsByActorId = new Map();
        const repoTransHistoryMapByRepositoryId = new Map();
        const applicationVersionIds = new Set();
        const applicationVersionIdSetsByRepository = new Map();
        const repositoryTransactionHistoryIds = new Set();
        this.gatherIdsForBlockCreation(repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet, repoTransHistoryMapByRepositoryId, applicationVersionIds, applicationVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
        const repositoryTransactionBlocks = await this.createNewBlocksAndSetRepoTransHistoryBlockIds(applicationVersionIds, applicationVersionIdSetsByRepository, terminal, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId, actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, applicationDao);
        return this.groupRepoTransBlocksBySharingNode(repositoryTransactionBlocks, sharingNodeIdMapByRepositoryId);
    }
    /*    Every history record is recorded as corresponding application version.
     * Where does application get used?
     *    OperationHistory - records which application and version was used for a particular
     *        operation
     *    RepositoryApplication - records which applications are used in a repository
     * Are previous versions of applications needed?
     *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, application
     *    upgrades generate their own (not-syncable) transaction history
     *
     * So, we need all of the versions used by transaction history records. */
    gatherIdsForBlockCreation(repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet, repoTransHistoryMapByRepositoryId, applicationVersionIds, applicationVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId) {
        repoTransHistoriesToSync.forEach(repoTransHistory => {
            // serialize saveTimestamp
            repoTransHistory.saveTimestamp = repoTransHistory.saveTimestamp.getTime();
            repositoryTransactionHistoryIds.add(repoTransHistory.id);
            const repositoryId = repoTransHistory.repository.id;
            repositoryIdSet.add(repoTransHistory.repository.id);
            const repoTransHistoriesForRepositoryId = ensureChildArray(repoTransHistoryMapByRepositoryId, repositoryId);
            repoTransHistoriesForRepositoryId.push(repoTransHistory);
            this.gatherHistoryIds(repoTransHistory, applicationVersionIds, applicationVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
        });
    }
    gatherHistoryIds(repoTransHistory, applicationVersionIds, applicationVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId) {
        const repoTransHistoryActorId = repoTransHistory.actor.id;
        actorIdSet.add(repoTransHistoryActorId);
        const repositoryId = repoTransHistory.repository.id;
        let repositoryIdsForActorId = ensureChildJsSet(repositoryIdsByActorId, repoTransHistoryActorId);
        repositoryIdsForActorId.add(repositoryId);
        const applicationVersionIdSetForRepo = ensureChildJsSet(applicationVersionIdSetsByRepository, repositoryId);
        repoTransHistory.operationHistory.forEach(operationHistory => {
            const applicationVersionId = operationHistory.entity.applicationVersion.id;
            applicationVersionIds.add(applicationVersionId);
            applicationVersionIdSetForRepo.add(applicationVersionId);
            operationHistory.recordHistory.forEach(recordHistory => {
                const recordHistoryActorId = recordHistory.actor.id;
                actorIdSet.add(recordHistoryActorId);
                repositoryIdsForActorId
                    = ensureChildJsSet(repositoryIdsByActorId, recordHistoryActorId);
                repositoryIdsForActorId.add(repositoryId);
                // actorIdsForRepositoryId.add(recordHistoryActorId);
            });
        });
    }
    /*    Every history record is recorded as corresponding application version.
     * Where does application get used?
     *    OperationHistory - records which application and version was used for a particular
     *        operation
     *    RepositoryApplication - records which applications are used in a repository
     * Are previous versions of applications needed?
     *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, application
     *    upgrades generate their own (not-syncable) transaction history
     *
     * So, we need all of the versions used by transaction history records. */
    async createNewBlocksAndSetRepoTransHistoryBlockIds(applicationVersionIds, applicationVersionIdSetsByRepository, terminal, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId, actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, applicationDao) {
        const applicationsByRepositoryIdMap = await this.findApplicationsByRepositoryMap(applicationVersionIds, applicationVersionIdSetsByRepository, applicationDao);
        const repoTransBlockDataByRepoId = new Map();
        const repositoryMapById = await repositoryDao.findReposWithGlobalIds(Array.from(repositoryIdSet));
        const repositoryTransactionBlocks = [];
        const repoTransBlocksByRepositoryId = new Map();
        const repoTransHistoryUpdateStageValuesByBlock = new Map();
        const repoTransHistoryUpdateStageValues = [];
        for (const [repositoryId, repositoryTransactionHistories] of repoTransHistoryMapByRepositoryId) {
            this.createRepositoryTransactionBlockAndStageData(repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId, repositoryTransactionHistories, applicationsByRepositoryIdMap, repoTransBlockDataByRepoId, terminal, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock);
        }
        await this.finishPopulatingRepositoryTransactionBlockData(actorIdSet, repositoryIdsByActorId, repoTransBlockDataByRepoId, repoTransBlocksByRepositoryId, repositoryTransactionBlocks, actorDao, repositoryTransactionBlockDao);
        await this.setRepositoryTransactionBlockBlockIds(repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues, repositoryTransactionHistoryUpdateStageDao);
        return repositoryTransactionBlocks;
    }
    async findApplicationsByRepositoryMap(applicationVersionIds, applicationVersionIdSetsByRepository, applicationDao) {
        const applicationsByRepositoryIdMap = new Map();
        const applicationMapByVersionId = await applicationDao
            .findMapByVersionIds(Array.from(applicationVersionIds));
        for (const [repositoryId, applicationVersionIdSetForRepo] of applicationVersionIdSetsByRepository) {
            const applicationsForRepository = ensureChildArray(applicationsByRepositoryIdMap, repositoryId);
            for (const applicationVersionId of applicationVersionIdSetForRepo) {
                applicationsForRepository.push(applicationMapByVersionId.get(applicationVersionId));
            }
        }
        return applicationsByRepositoryIdMap;
    }
    createRepositoryTransactionBlockAndStageData(repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId, repositoryTransactionHistories, applicationsByRepositoryIdMap, repoTransBlockDataByRepoId, terminal, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock) {
        const repository = repositoryMapById.get(repositoryId);
        const repositoryOwnerActorId = repository.ownerActor.id;
        actorIdSet.add(repositoryOwnerActorId);
        let repositoryIdsForActorId = ensureChildJsSet(repositoryIdsByActorId, repositoryOwnerActorId);
        repositoryIdsForActorId.add(repositoryId);
        const repoTransBlockData = {
            terminal: {
                id: terminal.id,
                uuId: terminal.uuId,
                owner: {
                    uniqueId: terminal.owner.uniqueId
                }
            },
            actors: [],
            repository: repositoryMapById.get(repositoryId),
            repoTransHistories: repositoryTransactionHistories,
            applications: applicationsByRepositoryIdMap.get(repositoryId),
        };
        repoTransBlockDataByRepoId.set(repositoryId, repoTransBlockData);
        const repositoryTransactionBlock = {
            source: terminal,
            repository,
            origin: DataOrigin.LOCAL
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
        await (await repositoryTransactionBlockDao).bulkCreate(repositoryTransactionBlocks, false);
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
                ensureChildArray(reposTransHistoryBlockMapBySharingNodeId, sharingNodeId)
                    .push(repositoryTransactionBlock);
            }
        }
        return reposTransHistoryBlockMapBySharingNodeId;
    }
}
DI.set(SYNC_OUT_REPO_TRANS_BLOCK_CREATOR, SyncOutRepositoryTransactionBlockCreator);
//# sourceMappingURL=SyncOutRepositoryTransactionBlockCreator.js.map