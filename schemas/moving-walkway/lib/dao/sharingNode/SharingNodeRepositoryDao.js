"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const holding_pattern_1 = require("@airport/holding-pattern");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SharingNodeRepositoryDao extends generated_1.BaseSharingNodeRepositoryDao {
    constructor() {
        super();
        di_1.DI.get((qMetadataUtils, repositoryTransactionHistoryDao, recordHistoryNewValueDao, recordHistoryOldValueDao) => {
            this.qMetadataUtils = qMetadataUtils;
            this.repoTransHistoryDao = repositoryTransactionHistoryDao;
            this.recHistNewValueDao = recordHistoryNewValueDao;
            this.recHistOldValueDao = recordHistoryOldValueDao;
        }, air_control_1.Q_METADATA_UTILS, holding_pattern_1.REPO_TRANS_HISTORY_DAO, holding_pattern_1.REC_HIST_NEW_VALUE_DAO, holding_pattern_1.REC_HIST_OLD_VALUE_DAO);
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
        const sharingNodeIdsWithRepoTransHistoryIds = await this.airDb.find.sheet({
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
        const repositoryTransactionHistories = await this.repoTransHistoryDao
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
        const oldValues = await this.recHistOldValueDao.findByRecordHistoryIdIn(recordHistoryIds);
        for (const oldValue of oldValues) {
            const recordHistoryId = oldValue.recordHistory.id;
            recordHistoryMapById.get(recordHistoryId).oldValues.push(oldValue);
        }
        const newValues = await this.recHistNewValueDao.findByRecordHistoryIdIn(recordHistoryIds);
        for (const newValue of newValues) {
            const recordHistoryId = newValue.recordHistory.id;
            recordHistoryMapById.get(recordHistoryId).newValues.push(newValue);
        }
        return [sharingNodeIdMapByRepositoryId, repositoryTransactionHistories];
    }
}
exports.SharingNodeRepositoryDao = SharingNodeRepositoryDao;
di_1.DI.set(diTokens_1.SHARING_NODE_REPOSITORY_DAO, SharingNodeRepositoryDao);
//# sourceMappingURL=SharingNodeRepositoryDao.js.map