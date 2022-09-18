import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IContext
} from '@airport/direction-indicator'
import {
	DbColumn,
	DbEntity,
	ISequenceGenerator
} from '@airport/ground-control'
import {
	OperationHistory_LocalId,
	RecordHistory_LocalId,
	RepositoryTransactionHistory_LocalId,
	Q_airport____at_airport_slash_holding_dash_pattern as Q,
	TransactionHistory_LocalId
} from '@airport/holding-pattern/dist/app/bundle'

export type NumRepositoryTransHistories = number
export type NumOperationTransHistories = number
export type NumRecordHistories = number

export interface TransactionHistory_LocalIds {

	operationHistory_LocalIds: OperationHistory_LocalId[]
	recordHistory_LocalIds: RecordHistory_LocalId[]
	repositoryHistory_LocalIds: RepositoryTransactionHistory_LocalId[]
	transactionHistory_LocalId: TransactionHistory_LocalId

}

export interface IIdGenerator {

	init(): Promise<void>;

	generateTransactionHistory_LocalIds(
		numRepositoryTransHistories: NumRepositoryTransHistories,
		numOperationTransHistories: NumOperationTransHistories,
		numRecordHistories: NumRecordHistories
	): Promise<TransactionHistory_LocalIds>;

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

	private transactionHistory_LocalIdColumns: DbColumn[] = []

	async init(): Promise<void> {
		this.populateTransactionHistory_LocalIdColumns().then()
	}

	populateTransactionHistory_LocalIdColumns(): Promise<void> {
		return new Promise((resolve, _reject) => {
			this.doPopulateTransactionHistory_LocalIdColumns(resolve);
		});
	}

	doPopulateTransactionHistory_LocalIdColumns(resolve): void {
		if (Q.__dbApplication__ && Q.__dbApplication__.currentVersion) {
			const transactionHistoryDbEntity =
				this.getHoldingPatternDbEntity('TransactionHistory')
			const repoTransHistoryDbEntity =
				this.getHoldingPatternDbEntity('RepositoryTransactionHistory')
			const operationHistoryDbEntity =
				this.getHoldingPatternDbEntity('OperationHistory')
			const recordHistoryDbEntity =
				this.getHoldingPatternDbEntity('RecordHistory')

			this.transactionHistory_LocalIdColumns.push(
				transactionHistoryDbEntity.idColumns[0]
			)
			this.transactionHistory_LocalIdColumns.push(
				repoTransHistoryDbEntity.idColumns[0]
			)
			this.transactionHistory_LocalIdColumns.push(
				operationHistoryDbEntity.idColumns[0]
			)
			this.transactionHistory_LocalIdColumns.push(
				recordHistoryDbEntity.idColumns[0]
			)

			resolve()
		} else {
			setTimeout(() => {
				this.doPopulateTransactionHistory_LocalIdColumns(resolve)
			}, 100)
		}
	}

	async generateTransactionHistory_LocalIds(
		numRepositoryTransHistories: NumRepositoryTransHistories,
		numOperationTransHistories: NumOperationTransHistories,
		numRecordHistories: NumRecordHistories
	): Promise<TransactionHistory_LocalIds> {

		let generatedSequenceNumbers: any = await this.sequenceGenerator
			.generateSequenceNumbers(
				this.transactionHistory_LocalIdColumns,
				[
					1,
					numRepositoryTransHistories,
					numOperationTransHistories,
					numRecordHistories
				]);

		return {
			operationHistory_LocalIds: generatedSequenceNumbers[2],
			recordHistory_LocalIds: generatedSequenceNumbers[3],
			repositoryHistory_LocalIds: generatedSequenceNumbers[1],
			transactionHistory_LocalId: generatedSequenceNumbers[0][0]
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
