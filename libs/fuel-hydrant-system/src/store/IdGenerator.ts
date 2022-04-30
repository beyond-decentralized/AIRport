import { Inject, Injected } from '@airport/air-control'
import { ISequenceGenerator } from '@airport/check-in'
import {
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
@Injected()
export class IdGenerator
	implements IIdGenerator {

	@Inject()
	sequenceGenerator: ISequenceGenerator

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

		let generatedSequenceNumbers: any = await this.sequenceGenerator
			.generateSequenceNumbers(
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
