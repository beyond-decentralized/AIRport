import { ISequenceGenerator, SEQUENCE_GENERATOR } from '@airport/check-in'
import {
	container,
	DEPENDENCY_INJECTION,
	IContext
} from '@airport/direction-indicator'
import {
	DbColumn,
	DbEntity
} from '@airport/ground-control'
import {
	OperationHistory_Id,
	Q,
	RecordHistoryId,
	RepositoryTransactionHistory_Id,
	TransactionHistoryId
} from '@airport/holding-pattern'
import { ID_GENERATOR } from '../tokens'

export type NumRepositoryTransHistories = number
export type NumOperationTransHistories = number
export type NumRecordHistories = number

export interface TransactionHistoryIds {

	operationHistoryIds: OperationHistory_Id[]
	recordHistoryIds: RecordHistoryId[]
	repositoryHistoryIds: RepositoryTransactionHistory_Id[]
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

export interface IIdGeneratorContext
	extends IContext {
	di: {
		sequenceGenerator: ISequenceGenerator,
	}
	isServer: boolean
}

/**
 * Created by Papa on 9/2/2016.
 */

export class IdGenerator
	implements IIdGenerator {

	private transactionHistoryIdColumns: DbColumn[] = []

	async init(): Promise<void> {
		this.populateTransactionHistoryIdColumns().then()
	}

	populateTransactionHistoryIdColumns(): Promise<void> {
		return new Promise((resolve, _reject) => {
			this.doPopulateTransactionHistoryIdColumns(resolve);
		});
	}

	doPopulateTransactionHistoryIdColumns(resolve): void {
		if (Q.__dbApplication__ && Q.__dbApplication__.currentVersion) {
			const transactionHistoryDbEntity =
				this.getHoldingPatternDbEntity('TransactionHistory')
			const repoTransHistoryDbEntity =
				this.getHoldingPatternDbEntity('RepositoryTransactionHistory')
			const operationHistoryDbEntity =
				this.getHoldingPatternDbEntity('OperationHistory')
			const recordHistoryDbEntity =
				this.getHoldingPatternDbEntity('RecordHistory')

			this.transactionHistoryIdColumns.push(
				transactionHistoryDbEntity.idColumns[0]
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

			resolve()
		} else {
			setTimeout(() => {
				this.doPopulateTransactionHistoryIdColumns(resolve)
			}, 100)
		}
	}

	async generateTransactionHistoryIds(
		numRepositoryTransHistories: NumRepositoryTransHistories,
		numOperationTransHistories: NumOperationTransHistories,
		numRecordHistories: NumRecordHistories
	): Promise<TransactionHistoryIds> {

		const sequenceGenerator = await container(this).get(SEQUENCE_GENERATOR)

		let generatedSequenceNumbers: any = await sequenceGenerator.generateSequenceNumbers(
			this.transactionHistoryIdColumns,
			[
				1,
				numRepositoryTransHistories,
				numOperationTransHistories,
				numRecordHistories
			]);

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
		return Q.__dbApplication__.currentVersion[0].applicationVersion
			.entityMapByName[holdingPatternEntityName]
	}

}

DEPENDENCY_INJECTION.set(ID_GENERATOR, IdGenerator)
