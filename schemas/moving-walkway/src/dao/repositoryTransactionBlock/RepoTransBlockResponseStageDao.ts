import {AIRPORT_DATABASE}                              from '@airport/air-control'
import {
	RepoTransBlockSyncOutcomeType,
	TmRepositoryTransactionBlockId
}                                            from '@airport/arrivals-n-departures'
import {
	container,
	DI
}                                            from '@airport/di'
import {
	BaseRepoTransBlockResponseStageDao,
	Q,
	QRepoTransBlockResponseStage
}                                            from '../../generated/generated'
import {REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO} from '../../tokens'

export type RepoTransBlockResponseStageValues = [
	TmRepositoryTransactionBlockId,
	// AgtSyncRecordId,
	RepoTransBlockSyncOutcomeType
];

export interface IRepoTransBlockResponseStageDao {

	insertValues(
		values: RepoTransBlockResponseStageValues[]
	): Promise<number>;

	delete( //
	): Promise<number>;

}

export class RepoTransBlockResponseStageDao
	extends BaseRepoTransBlockResponseStageDao
	implements IRepoTransBlockResponseStageDao {

	async insertValues(
		values: RepoTransBlockResponseStageValues[]
	): Promise<number> {

		const dbEntity = Q.db.currentVersion.entityMapByName.RepoTransBlockResponseStage

		let smrs: QRepoTransBlockResponseStage

		const airDb = await container(this)
			.get(AIRPORT_DATABASE)

		return await
			airDb.insertValues({
				insertInto: smrs = Q.RepoTransBlockResponseStage,
				columns: [
					smrs.id,
					// smrs.agtSyncRecordId,
					smrs.syncOutcomeType
				],
				values
			}, {
				dbEntity
			})
	}

	async delete( //
	): Promise<number> {
		return await
			this.db.deleteWhere({
				deleteFrom: Q.RepoTransBlockResponseStage
			})
	}

}

DI.set(REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO, RepoTransBlockResponseStageDao)
