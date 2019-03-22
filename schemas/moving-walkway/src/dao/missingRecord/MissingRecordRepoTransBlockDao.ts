import {DI}                                  from '@airport/di'
import {MissingRecordId}                     from '../../ddl/ddl'
import {MISSING_RECORD_REPO_TRANS_BLOCK_DAO} from '../../diTokens'
import {
	BaseMissingRecordRepoTransBlockDao,
	IBaseMissingRecordRepoTransBlockDao,
	Q,
	QMissingRecordRepoTransBlock
}                                            from '../../generated/generated'

export interface IMissingRecordRepoTransBlockDao
	extends IBaseMissingRecordRepoTransBlockDao {

	deleteWhereMissingRecordIdsIn(
		missingRecordIds: MissingRecordId[]
	): Promise<void>;

}

export class MissingRecordRepoTransBlockDao
	extends BaseMissingRecordRepoTransBlockDao
	implements IMissingRecordRepoTransBlockDao {

	async deleteWhereMissingRecordIdsIn(
		missingRecordIds: MissingRecordId[]
	): Promise<void> {
		let mrrtb: QMissingRecordRepoTransBlock
		await this.db.deleteWhere({
			deleteFrom: mrrtb = Q.MissingRecordSharingMessage,
			where: mrrtb.missingRecord.id.in(missingRecordIds)
		})
	}

}

DI.set(MISSING_RECORD_REPO_TRANS_BLOCK_DAO, MissingRecordRepoTransBlockDao)
