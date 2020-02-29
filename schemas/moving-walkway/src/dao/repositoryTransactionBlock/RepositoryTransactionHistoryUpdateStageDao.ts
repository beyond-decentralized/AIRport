import {
	field,
	IQNumberField
}           from '@airport/air-control'
import {container, DI} from '@airport/di'
import {
	REPO_TRANS_HISTORY_DAO,
	RepositoryTransactionHistoryBlockId,
	RepositoryTransactionHistoryId
}           from '@airport/holding-pattern'
import {
	BaseRepositoryTransactionHistoryUpdateStageDao,
	IBaseRepositoryTransactionHistoryUpdateStageDao,
	QRepositoryTransactionHistoryUpdateStage
}           from '../../generated/generated'
import {
	REPO_TRANS_HISTORY_UPDATE_STAGE_DAO
}           from '../../tokens'
import {Q}  from '../../generated/generated'

export type RepositoryTransactionHistoryUpdateStageValues = [
	RepositoryTransactionHistoryId,
	RepositoryTransactionHistoryBlockId
	];

export interface IRepositoryTransactionHistoryUpdateStageDao
	extends IBaseRepositoryTransactionHistoryUpdateStageDao {

	insertValues(
		values: RepositoryTransactionHistoryUpdateStageValues[]
	): Promise<number>;

	updateRepositoryTransactionHistory(): Promise<number>;

	delete( //
	): Promise<number>;

}

export class RepositoryTransactionHistoryUpdateStageDao
	extends BaseRepositoryTransactionHistoryUpdateStageDao
	implements IRepositoryTransactionHistoryUpdateStageDao {

	async insertValues(
		values: RepositoryTransactionHistoryUpdateStageValues[]
	): Promise<number> {
		const rthus: QRepositoryTransactionHistoryUpdateStage = this.db.from

		return await this.db.insertValues({
			insertInto: rthus,
			columns: [
				rthus.repositoryTransactionHistoryId,
				rthus.blockId
			],
			values
		})
	}

	async updateRepositoryTransactionHistory(): Promise<number> {
		const rthus = this.db.from

		const repoTransHistoryDao = await container(this).get(REPO_TRANS_HISTORY_DAO)

		return await repoTransHistoryDao.setBlockIdWhereId((
			idField: IQNumberField
			) =>
				field({
					from: [
						rthus
					],
					select: rthus.blockId,
					where: rthus.repositoryTransactionHistoryId.equals(idField)
				})
		)
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.RepositoryTransactionHistoryUpdateStage
		})
	}

}

DI.set(REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, RepositoryTransactionHistoryUpdateStageDao)
