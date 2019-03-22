"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SharingNodeRepoTransBlockDao extends generated_1.BaseSharingNodeRepoTransBlockDao {
    async findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds, repoTransBlockIds) {
        const mapBySharingNodeId = new Map();
        let snrtb;
        const records = await this.db.find.tree({
            select: {},
            from: [
                snrtb = generated_1.Q.SharingNodeRepoTransBlock
            ],
            where: air_control_1.and(snrtb.sharingNode.id.in(sharingNodeIds), snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds))
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
                    where: air_control_1.and(snrtbs.sharingNodeId.equals(snrtb.sharingNode.id), snrtbs.repositoryTransactionBlockId.equals(snrtb.repositoryTransactionBlock.id))
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
            where: air_control_1.and(snrtb.syncStatus.equals(existingSyncStatus), snrtb.sharingNode.id.in(sharingNodeIds), snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds))
        });
    }
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlock;
        let snrtb;
        return await this.airDb.db.insertValues(dbEntity, {
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
        const records = await this.airDb.find.sheet({
            from: [
                snrtb = generated_1.Q.SharingNodeRepoTransBlock,
            ],
            select: [
                snrtb.sharingNode.id,
                snrtb.repositoryTransactionBlock.id
            ],
            where: air_control_1.and(snrtb.syncStatus.equals(syncStatus), snrtb.sharingNode.id.in(sharingNodeIds))
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
}
exports.SharingNodeRepoTransBlockDao = SharingNodeRepoTransBlockDao;
di_1.DI.set(diTokens_1.SHARING_NODE_REPO_TRANS_BLOCK_DAO, SharingNodeRepoTransBlockDao);
//# sourceMappingURL=SharingNodeRepoTransBlockDao.js.map