import {AIR_DB}                                  from '@airport/air-control'
import {
	SharingNodeRepoTransBlockSyncStatus,
	TmRepositoryTransactionBlockId
}                                                from '@airport/arrivals-n-departures'
import {DI}                                      from '@airport/di'
import {SharingNodeId}                           from '../../ddl/ddl'
import {SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO} from '../../diTokens'
import {
	BaseSharingNodeRepoTransBlockStageDao,
	IBaseSharingNodeRepoTransBlockStageDao,
	Q,
	QSharingNodeRepoTransBlockStage
}                                                from '../../generated/generated'

export type SharingNodeRepoTransBlockStageValues = [
	SharingNodeId,
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
		const dbEntity = Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlockStage

		const airDb = await DI.get(AIR_DB)

		let snrtbs: QSharingNodeRepoTransBlockStage
		return await airDb.insertValues(dbEntity, {
			insertInto: snrtbs = Q.SharingNodeRepoTransBlockStage,
			columns: [
				snrtbs.sharingNodeId,
				snrtbs.repositoryTransactionBlockId,
				// snrtbs.syncStatus,
				snrtbs.syncStatus
			],
			values
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
