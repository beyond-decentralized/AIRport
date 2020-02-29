import { AIR_DB, and, distinct, Y } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { ensureChildJsMap, ensureChildJsSet } from '@airport/ground-control';
import { REC_HIST_NEW_VALUE_DAO, REC_HIST_OLD_VALUE_DAO, REPO_TRANS_HISTORY_DAO } from '@airport/holding-pattern';
import { SHARING_NODE_REPOSITORY_DAO } from '../../tokens';
import { BaseSharingNodeRepositoryDao, Q, } from '../../generated/generated';
export class SharingNodeRepositoryDao extends BaseSharingNodeRepositoryDao {
    async findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds, sharingNodeIds) {
        const repositoriesBySharingNodeIds = new Map();
        let snr;
        let r;
        const id = Y;
        const sharingNodeRepos = await this.db.find.tree({
            select: {
                agtRepositoryId: Y,
                repository: {
                    id,
                    ownerActor: {
                        id
                    },
                    orderedId: Y,
                    randomId: Y,
                },
                sharingNode: {
                    id,
                },
            },
            from: [
                snr = Q.SharingNodeRepository,
                r = snr.repository.innerJoin()
            ],
            where: and(snr.repository.id.in(repositoryIds), snr.sharingNode.id.in(sharingNodeIds))
        });
        sharingNodeRepos.forEach(sharingNodeRepo => {
            ensureChildJsMap(repositoriesBySharingNodeIds, sharingNodeRepo.sharingNode.id)
                .set(sharingNodeRepo.repository.id, sharingNodeRepo);
        });
        return repositoriesBySharingNodeIds;
    }
    async findBySharingNodeAndAgtRepositoryIds(sharingNodeIds, agtRepositoryIds) {
        const repositoryIdsBySharingNodeAndAgtRepositoryIds = new Map();
        let snr;
        const id = Y;
        const sharingNodeRepos = await this.db.find.tree({
            select: {
                agtRepositoryId: Y,
                repository: {
                    id,
                },
                sharingNode: {
                    id,
                },
            },
            from: [
                snr = Q.SharingNodeRepository,
            ],
            where: and(snr.sharingNode.id.in(sharingNodeIds), snr.agtRepositoryId.in(agtRepositoryIds))
        });
        sharingNodeRepos.forEach(sharingNodeRepo => {
            ensureChildJsMap(repositoryIdsBySharingNodeAndAgtRepositoryIds, sharingNodeRepo.sharingNode.id)
                .set(sharingNodeRepo.agtRepositoryId, sharingNodeRepo.repository.id);
        });
        return repositoryIdsBySharingNodeAndAgtRepositoryIds;
    }
    async findNewRepoTransHistoriesForSharingNodes(sharingNodeIds) {
        const sharingNodeIdMapByRepositoryId = new Map();
        const airDb = await container(this).get(AIR_DB);
        let snr = Q.SharingNodeRepository;
        let r;
        let rth;
        // const dbEntity = this.qMetadataUtils.getDbEntity(snr);
        const sharingNodeIdsWithRepoTransHistoryIds = await airDb.find.sheet({
            from: [
                snr,
                r = snr.repository.innerJoin(),
                rth = r.repositoryTransactionHistory.innerJoin(),
            ],
            select: distinct([
                snr.sharingNode.id,
                r.id,
                rth.id
            ]),
            where: and(snr.sharingNode.id.in(sharingNodeIds), rth.blockId.isNull())
        });
        const repositoryTransactionHistoryIdSet = new Set();
        for (const sharingNodeIdWithRepoTransHistoryId of sharingNodeIdsWithRepoTransHistoryIds) {
            const sharingNodeId = sharingNodeIdWithRepoTransHistoryId[0];
            const repositoryId = sharingNodeIdWithRepoTransHistoryId[1];
            ensureChildJsSet(sharingNodeIdMapByRepositoryId, repositoryId)
                .add(sharingNodeId);
            repositoryTransactionHistoryIdSet.add(sharingNodeIdWithRepoTransHistoryId[2]);
        }
        const [recHistNewValueDao, recHistOldValueDao, repoTransHistoryDao] = await container(this).get(REC_HIST_NEW_VALUE_DAO, REC_HIST_OLD_VALUE_DAO, REPO_TRANS_HISTORY_DAO);
        const repositoryTransactionHistories = await repoTransHistoryDao
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
        const oldValues = await recHistOldValueDao.findByRecordHistoryIdIn(recordHistoryIds);
        for (const oldValue of oldValues) {
            const recordHistoryId = oldValue.recordHistory.id;
            recordHistoryMapById.get(recordHistoryId).oldValues.push(oldValue);
        }
        const newValues = await recHistNewValueDao.findByRecordHistoryIdIn(recordHistoryIds);
        for (const newValue of newValues) {
            const recordHistoryId = newValue.recordHistory.id;
            recordHistoryMapById.get(recordHistoryId).newValues.push(newValue);
        }
        return [sharingNodeIdMapByRepositoryId, repositoryTransactionHistories];
    }
}
DI.set(SHARING_NODE_REPOSITORY_DAO, SharingNodeRepositoryDao);
//# sourceMappingURL=SharingNodeRepositoryDao.js.map