import {
	AirportDatabaseToken,
	IAirportDatabase,
	IQOrderableField,
	IUtils,
	max,
	RawNonEntityQuery,
	RawSheetQuery,
	unionAll,
	UtilsToken,
}                             from '@airport/air-control'
import {
	ISequence,
	ISequenceBlock,
	ISequenceBlockDao,
	ISequenceConsumer,
	SequenceBlockDaoToken,
	SequenceConsumerDaoToken,
	SequenceDaoToken
}                             from '@airport/airport-code'
import {
	DbColumn,
	DbEntity,
	Primitive
}                             from '@airport/ground-control'
import {
	OperationHistoryId,
	Q,
	RecordHistoryId,
	RepositoryTransactionHistoryId,
	TransactionHistoryId
}                             from '@airport/holding-pattern'
import {IDomain}              from '@airport/territory'
import {
	Inject,
	Service
}                             from 'typedi'
import {ISequenceConsumerDao} from '../../node_modules/@airport/airport-code/lib/dao/SequenceConsumerDao'
import {ISequenceDao}         from '../../node_modules/@airport/airport-code/lib/dao/SequenceDao'
import {
	IdGeneratorToken,
	SequenceGeneratorToken
}                             from '../InjectionTokens'
import {ISequenceGenerator}   from './VirtualSequenceGenerator'

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

@Service(IdGeneratorToken)
export class IdGenerator
	implements IIdGenerator {

	private transactionHistoryIdColumns: DbColumn[] = []

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(SequenceGeneratorToken)
		private sequenceGenerator: ISequenceGenerator,
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	async init(
		domain: IDomain
	): Promise<void> {
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
