import {
	AIR_DB,
	IAirportDatabase,
	IUtils,
	UTILS
}                           from '@airport/air-control'
import {DI}                 from '@airport/di'
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
import {IDomain}            from '@airport/territory'
import {
	ID_GENERATOR,
	SEQUENCE_GENERATOR
}                           from '../diTokens'
import {ISequenceGenerator} from './SequenceGenerator'

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

	init(
		domain: IDomain
	): Promise<void>;

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

	private airDb: IAirportDatabase
	private sequenceGeneratorFuture: () => Promise<ISequenceGenerator>
	private sequenceGenerator: ISequenceGenerator
	private utils: IUtils

	constructor() {
		DI.get((
			airportDatabase,
			sequenceGenerator,
			utils
		) => {
			this.airDb             = airportDatabase
			this.utils             = utils
		}, AIR_DB, UTILS)

		this.sequenceGeneratorFuture = DI.laterP(SEQUENCE_GENERATOR)
	}

	async init(
		domain: IDomain
	): Promise<void> {
		this.sequenceGenerator = await this.sequenceGeneratorFuture()
		await this.sequenceGenerator.init(domain)

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

		const generatedSequenceNumbers = await this.sequenceGenerator.generateSequenceNumbers(
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
