import { AIRPORT_DATABASE } from '@airport/air-control'
import {
	SharingNodeRepoTransBlockSyncStatus,
	TmRepositoryTransactionBlockId
} from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import { SharingNode_Id } from '../../ddl/ddl'
import {
	BaseSharingNodeRepoTransBlockStageDao,
	IBaseSharingNodeRepoTransBlockStageDao,
	Q,
	QSharingNodeRepoTransBlockStage
} from '../../generated/generated'
import { SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO } from '../../tokens'

export type SharingNodeRepoTransBlockStageValues = [
	SharingNode_Id,
	TmRepositoryTransactionBlockId,
	SharingNodeRepoTransBlockSyncStatus
];

export interface ISharingNodeRepoTransBlockStageDao
	extends IBaseSharingNodeRepoTransBlockStageDao {

	insertValues(
		values: SharingNodeRepoTransBlockStageValues[]
	): Promise<number>;

	delete( //
	): Promise<number>;

}

export class SharingNodeRepoTransBlockStageDao
	extends BaseSharingNodeRepoTransBlockStageDao
	implements ISharingNodeRepoTransBlockStageDao {

	async insertValues(
		values: SharingNodeRepoTransBlockStageValues[]
	): Promise<number> {
		const dbEntity = Q.db.currentVersion[0].schemaVersion
			.entityMapByName.SharingNodeRepoTransBlockStage

		const airDb = await container(this)
			.get(AIRPORT_DATABASE)

		let snrtbs: QSharingNodeRepoTransBlockStage
		return await airDb.insertValues({
			insertInto: snrtbs = Q.SharingNodeRepoTransBlockStage,
			columns: [
				snrtbs.sharingNodeId,
				snrtbs.repositoryTransactionBlockId,
				// snrtbs.syncStatus,
				snrtbs.syncStatus
			],
			values
		}, {
			dbEntity
		})
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.SharingNodeRepoTransBlockStage
		})
	}

}

DI.set(SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO, SharingNodeRepoTransBlockStageDao)
