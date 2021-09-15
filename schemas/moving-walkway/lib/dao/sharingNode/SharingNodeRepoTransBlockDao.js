import { AIRPORT_DATABASE, and, field } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { ensureChildArray, ensureChildJsMap } from '@airport/ground-control';
import { BaseSharingNodeRepoTransBlockDao, Q, } from '../../generated/generated';
import { SHARING_NODE_REPO_TRANS_BLOCK_DAO } from '../../tokens';
export class SharingNodeRepoTransBlockDao extends BaseSharingNodeRepoTransBlockDao {
    async findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds, repoTransBlockIds) {
        const mapBySharingNodeId = new Map();
        let snrtb;
        const records = await this.db.find.tree({
            select: {},
            from: [
                snrtb = Q.SharingNodeRepoTransBlock
            ],
            where: and(snrtb.sharingNode.id.in(sharingNodeIds), snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds))
        });
        for (const record of records) {
            ensureChildJsMap(mapBySharingNodeId, record.sharingNode.id)
                .set(record.repositoryTransactionBlock.id, record);
        }
        return mapBySharingNodeId;
    }
    async updateFromResponseStage( //
    ) {
        let snrtb;
        let snrtbs;
        return await this.db.updateWhere({
            update: snrtb = Q.SharingNodeRepoTransBlock,
            set: {
                syncStatus: field({
                    from: [
                        snrtbs = Q.SharingNodeRepoTransBlockStage
                    ],
                    select: snrtbs.syncStatus,
                    where: and(snrtbs.sharingNodeId.equals(snrtb.sharingNode.id), snrtbs.repositoryTransactionBlockId.equals(snrtb.repositoryTransactionBlock.id))
                })
            }
        });
    }
    async updateBlockSyncStatus(sharingNodeIds, repoTransBlockIds, existingSyncStatus, newSyncStatus) {
        let snrtb;
        await this.db.updateWhere({
            update: snrtb = Q.SharingNodeRepoTransBlock,
            set: {
                syncStatus: newSyncStatus
            },
            where: and(snrtb.syncStatus.equals(existingSyncStatus), snrtb.sharingNode.id.in(sharingNodeIds), snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds))
        });
    }
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion[0].schemaVersion
            .entityMapByName.SharingNodeRepoTransBlock;
        const airDb = await container(this)
            .get(AIRPORT_DATABASE);
        let snrtb;
        return await airDb.insertValues({
            insertInto: snrtb = Q.SharingNodeRepoTransBlock,
            columns: [
                snrtb.sharingNode.id,
                snrtb.repositoryTransactionBlock.id,
                // snrtb.syncTimestamp,
                // snrtb.syncOutcomeType,
                // snrtb.origin,
                snrtb.syncStatus
            ],
            values
        }, {
            dbEntity
        });
    }
    async getForSharingNodeIdsAndBlockStatus(sharingNodeIds, syncStatus) {
        const repoTransBlocksBySharingNodeId = new Map();
        const repositoryTransactionBlockIds = new Set();
        let snrtb;
        const airDb = await container(this)
            .get(AIRPORT_DATABASE);
        const records = await airDb.find.sheet({
            from: [
                snrtb = Q.SharingNodeRepoTransBlock,
            ],
            select: [
                snrtb.sharingNode.id,
                snrtb.repositoryTransactionBlock.id
            ],
            where: and(snrtb.syncStatus.equals(syncStatus), snrtb.sharingNode.id.in(sharingNodeIds))
        });
        for (const record of records) {
            const sharingNodeRepoTransBlockId = record[1];
            ensureChildArray(repoTransBlocksBySharingNodeId, record[0])
                .push(sharingNodeRepoTransBlockId);
            repositoryTransactionBlockIds.add(sharingNodeRepoTransBlockId);
        }
        return {
            repositoryTransactionBlockIds,
            repoTransBlocksBySharingNodeId
        };
    }
}
DI.set(SHARING_NODE_REPO_TRANS_BLOCK_DAO, SharingNodeRepoTransBlockDao);
//# sourceMappingURL=SharingNodeRepoTransBlockDao.js.map