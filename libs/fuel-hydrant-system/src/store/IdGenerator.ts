import {SEQUENCE_GENERATOR} from '@airport/check-in'
import {container, DI}                 from '@airport/di'
import {
	DbColumn,
	DbEntity
}                           from '@airport/ground-control'
import {
	OperationHistoryId,
	Q,
	RecordHistoryId,
	RepositoryTransactionHistoryId,
	TransactionHistoryId
}                           from '@airport/holding-pattern'
import {ID_GENERATOR}       from '../tokens'

export type NumRepositoryTransHistories = number
export type NumOperationTransHistories = number
export type NumRecordHistories = number


export interface TransactionHistoryIds {

	operationHistoryIds: OperationHistoryId[]
	recordHistoryIds: RecordHistoryId[]
	repositoryHistoryIds: RepositoryTransactionHistoryId[]
	transactionHistoryId: TransactionHistoryId

}

export interface IIdGenerator {

	init(): Promise<void>;

	generateTransactionHistoryIds(
		numRepositoryTransHistories: NumRepositoryTransHistories,
		numOperationTransHistories: NumOperationTransHistories,
		numRecordHistories: NumRecordHistories
	): Promise<TransactionHistoryIds>;

}

/**
 * Created by Papa on 9/2/2016.
 */

export class IdGenerator
	implements IIdGenerator {

	private transactionHistoryIdColumns: DbColumn[] = []

	async init(): Promise<void> {
		(await container(this).get(SEQUENCE_GENERATOR)).init()

		const transHistoryDbEntity     =
			      this.getHoldingPatternDbEntity('TransactionHistory')
		const repoTransHistoryDbEntity =
			      this.getHoldingPatternDbEntity('RepositoryTransactionHistory')
		const operationHistoryDbEntity =
			      this.getHoldingPatternDbEntity('OperationHistory')
		const recordHistoryDbEntity    =
			      this.getHoldingPatternDbEntity('RecordHistory')

		this.transactionHistoryIdColumns.push(
			transHistoryDbEntity.idColumns[0]
		)
		this.transactionHistoryIdColumns.push(
			repoTransHistoryDbEntity.idColumns[0]
		)
		this.transactionHistoryIdColumns.push(
			operationHistoryDbEntity.idColumns[0]
		)
		this.transactionHistoryIdColumns.push(
			recordHistoryDbEntity.idColumns[0]
		)
	}

	async generateTransactionHistoryIds(
		numRepositoryTransHistories: NumRepositoryTransHistories,
		numOperationTransHistories: NumOperationTransHistories,
		numRecordHistories: NumRecordHistories
	): Promise<TransactionHistoryIds> {

		const generatedSequenceNumbers = await (await container(this).get(SEQUENCE_GENERATOR))
			.generateSequenceNumbers(
				this.transactionHistoryIdColumns,
				[
					1,
					numRepositoryTransHistories,
					numOperationTransHistories,
					numRecordHistories
				])

		return {
			operationHistoryIds: generatedSequenceNumbers[2],
			recordHistoryIds: generatedSequenceNumbers[3],
			repositoryHistoryIds: generatedSequenceNumbers[1],
			transactionHistoryId: generatedSequenceNumbers[0][0]
		}

	}

	async generateEntityIds(): Promise<void> {

	}

	private getHoldingPatternDbEntity(
		holdingPatternEntityName: string
	): DbEntity {
		return Q.db.currentVersion.entityMapByName[holdingPatternEntityName]
	}


}

DI.set(ID_GENERATOR, IdGenerator)
