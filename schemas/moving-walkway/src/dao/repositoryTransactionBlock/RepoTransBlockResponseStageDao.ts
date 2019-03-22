import {
	RepoTransBlockSyncOutcomeType,
	TmRepositoryTransactionBlockId
}                                            from '@airport/arrivals-n-departures'
import {DI}                                  from '@airport/di'
import {REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO} from '../../diTokens'
import {
	BaseRepoTransBlockResponseStageDao,
	Q,
	QRepoTransBlockResponseStage
}                                            from '../../generated/generated'

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

		return await
			this.airDb.db.insertValues(dbEntity, {
				insertInto: smrs = Q.RepoTransBlockResponseStage,
				columns: [
					smrs.id,
					// smrs.agtSyncRecordId,
					smrs.syncOutcomeType
				],
				values
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