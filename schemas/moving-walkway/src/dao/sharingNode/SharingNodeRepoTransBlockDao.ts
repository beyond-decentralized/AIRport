import {
	and,
	field
}                                          from '@airport/air-control'
import {AIR_DB}                            from '@airport/air-control'
import {
	SharingNodeRepoTransBlockSyncStatus,
	TmRepositoryTransactionBlockId
}                                          from '@airport/arrivals-n-departures'
import {DI}                                from '@airport/di'
import {ensureChildJsMap}                  from '@airport/ground-control'
import {ensureChildArray}                  from '@airport/ground-control'
import {SharingNodeId}                     from '../../ddl/ddl'
import {SHARING_NODE_REPO_TRANS_BLOCK_DAO} from '../../diTokens'
import {
	BaseSharingNodeRepoTransBlockDao,
	IBaseSharingNodeRepoTransBlockDao,
	ISharingNodeRepoTransBlock,
	Q,
	QSharingNodeRepoTransBlock,
	QSharingNodeRepoTransBlockStage,
}                                          from '../../generated/generated'

export type SharingNodeRepoTransBlockValues = [
	SharingNodeId,
	TmRepositoryTransactionBlockId,
	// SharingMessageSyncTimestamp,
	// RepoTransBlockSyncOutcomeType,
	// DataOrigin,
	SharingNodeRepoTransBlockSyncStatus
	];


export interface RepoTransBlocksForSharingNodes {
	repositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId>;
	repoTransBlocksBySharingNodeId
		: Map<SharingNodeId, TmRepositoryTransactionBlockId[]>;
}

export interface ISharingNodeRepoTransBlockDao
	extends IBaseSharingNodeRepoTransBlockDao {

	findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<Map<SharingNodeId,
		Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;

	updateFromResponseStage( //
	): Promise<number>;

	updateBlockSyncStatus(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[],
		existingSyncStatus: SharingNodeRepoTransBlockSyncStatus,
		newSyncStatus: SharingNodeRepoTransBlockSyncStatus
	): Promise<void>;

	insertValues(
		values: SharingNodeRepoTransBlockValues[]
	): Promise<number>;

	getForSharingNodeIdsAndBlockStatus(
		sharingNodeIds: SharingNodeId[],
		syncStatus: SharingNodeRepoTransBlockSyncStatus
	): Promise<RepoTransBlocksForSharingNodes>;

}

export class SharingNodeRepoTransBlockDao
	extends BaseSharingNodeRepoTransBlockDao
	implements ISharingNodeRepoTransBlockDao {

	async findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<Map<SharingNodeId,
		Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>> {
		const mapBySharingNodeId: Map<SharingNodeId,
			Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>> = new Map()

		let snrtb: QSharingNodeRepoTransBlock
		const records = await this.db.find.tree({
			select: {},
			from: [
				snrtb = Q.SharingNodeRepoTransBlock
			],
			where: and(
				snrtb.sharingNode.id.in(sharingNodeIds),
				snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds)
			)
		})

		for (const record of records) {
			ensureChildJsMap(mapBySharingNodeId, record.sharingNode.id)
				.set(record.repositoryTransactionBlock.id, record)
		}

		return mapBySharingNodeId
	}

	async updateFromResponseStage( //
	): Promise<number> {
		let snrtb: QSharingNodeRepoTransBlock
		let snrtbs: QSharingNodeRepoTransBlockStage
		return await this.db.updateWhere({
			update: snrtb = Q.SharingNodeRepoTransBlock,
			set: {
				syncStatus: field({
					from: [
						snrtbs = Q.SharingNodeRepoTransBlockStage
					],
					select: snrtbs.syncStatus,
					where: and(
						snrtbs.sharingNodeId.equals(snrtb.sharingNode.id),
						snrtbs.repositoryTransactionBlockId.equals(snrtb.repositoryTransactionBlock.id)
					)
				})
			}
		})
	}

	async updateBlockSyncStatus(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[],
		existingSyncStatus: SharingNodeRepoTransBlockSyncStatus,
		newSyncStatus: SharingNodeRepoTransBlockSyncStatus
	): Promise<void> {
		let snrtb: QSharingNodeRepoTransBlock
		await this.db.updateWhere({
			update: snrtb = Q.SharingNodeRepoTransBlock,
			set: {
				syncStatus: newSyncStatus
			},
			where: and(
				snrtb.syncStatus.equals(existingSyncStatus),
				snrtb.sharingNode.id.in(sharingNodeIds),
				snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds)
			)
		})
	}

	async insertValues(
		values: SharingNodeRepoTransBlockValues[]
	): Promise<number> {
		const dbEntity = Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlock

		const airDb = await DI.get(AIR_DB)

		let snrtb: QSharingNodeRepoTransBlock
		return await airDb.insertValues(dbEntity, {
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
		})

	}

	async getForSharingNodeIdsAndBlockStatus(
		sharingNodeIds: SharingNodeId[],
		syncStatus: SharingNodeRepoTransBlockSyncStatus
	): Promise<RepoTransBlocksForSharingNodes> {
		const repoTransBlocksBySharingNodeId
			      : Map<SharingNodeId, TmRepositoryTransactionBlockId[]>           = new Map()
		const repositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId> = new Set()

		let snrtb: QSharingNodeRepoTransBlock

		const airDb = await DI.get(AIR_DB)

		const records = await airDb.find.sheet({
			      from: [
				      snrtb = Q.SharingNodeRepoTransBlock,
			      ],
			      select: [
				      snrtb.sharingNode.id,
				      snrtb.repositoryTransactionBlock.id
			      ],
			      where: and(
				      snrtb.syncStatus.equals(syncStatus),
				      snrtb.sharingNode.id.in(sharingNodeIds)
			      )
		      })


		for (const record of records) {
			const sharingNodeRepoTransBlockId = record[1]
			ensureChildArray(repoTransBlocksBySharingNodeId, record[0])
				.push(sharingNodeRepoTransBlockId)
			repositoryTransactionBlockIds.add(sharingNodeRepoTransBlockId)
		}

		return {
			repositoryTransactionBlockIds,
			repoTransBlocksBySharingNodeId
		}
	}

}

DI.set(SHARING_NODE_REPO_TRANS_BLOCK_DAO, SharingNodeRepoTransBlockDao)
