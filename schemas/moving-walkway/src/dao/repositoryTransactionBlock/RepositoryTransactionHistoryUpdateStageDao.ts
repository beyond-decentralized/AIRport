import {field} from '@airport/air-control'
import {DI}    from '@airport/di'
import {
	QRepositoryTransactionHistory,
	RepositoryTransactionHistoryBlockId,
	RepositoryTransactionHistoryId
}              from '@airport/holding-pattern'
import {
	BaseRepositoryTransactionHistoryUpdateStageDao,
	IBaseRepositoryTransactionHistoryUpdateStageDao,
	QRepositoryTransactionHistoryUpdateStage,
	REPO_TRANS_HISTORY_UPDATE_STAGE_DAO
}              from '../..'
import {Q}     from '../../generated/generated'

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

		const dbEntity = Q.db.currentVersion.entityMapByName.RepositoryTransactionHistoryUpdateStage

		let rthus: QRepositoryTransactionHistoryUpdateStage

		return await this.airDb.db.insertValues(dbEntity, {
			insertInto: rthus = Q.RepositoryTransactionHistoryUpdateStage,
			columns: [
				rthus.repositoryTransactionHistoryId,
				rthus.blockId
			],
			values
		})
	}

	async updateRepositoryTransactionHistory(): Promise<number> {
		const schemaName = '@airport/holding-pattern'
		const dbEntity   = this.airDb.schemaMapByName[schemaName]
			.currentVersion.entityMapByName['RepositoryTransactionHistory']
		const rth: QRepositoryTransactionHistory
		                 = this.airDb.qSchemaMapByName[schemaName].RepositoryTransactionHistory
		let rthus: QRepositoryTransactionHistoryUpdateStage

		return await this.airDb.db.updateWhere(dbEntity, {
			update: rth,
			set: {
				blockId: field({
					from: [
						rthus = Q.RepositoryTransactionHistoryUpdateStage
					],
					select: rthus.blockId,
					where: rthus.repositoryTransactionHistoryId.equals(rth.id)
				})
			}
		})
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.RepositoryTransactionHistoryUpdateStage
		})
	}

}

DI.set(REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, RepositoryTransactionHistoryUpdateStageDao)
