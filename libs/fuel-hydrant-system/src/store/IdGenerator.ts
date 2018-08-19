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
import {IdGeneratorToken}     from '../InjectionTokens'

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
	): TransactionHistoryIds;

	generateHoldingPatternEntityId(
		holdingPatternEntityName: string
	): number;

	generateEntityId(
		dbEntity: DbEntity,
		entity: any,
	): number;

	loadLatestIds( //
	): Promise<void>;

}

/**
 * Created by Papa on 9/2/2016.
 */

@Service(IdGeneratorToken)
export class IdGenerator
	implements IIdGenerator {

	currentNumber
	numSequencesNeeded
	sequenceBlock
	/**
	 * Ids are tracked on per-Entity basis.  Id's are assigned optimistically can be
	 * retroactively updated if sync conflicts arise.  At load time latest ids
	 * are loaded into memory and then are maintained in memory for the uptime of the
	 * db server.
	 * @returns {Promise<void>}
	 */
	async
	private
	private
	private lastIds: number[][][]                = []
	private lastReservedIds: number[][][]        = []
	private sequences: ISequence[][][]           = []
	private sequenceBlocks: ISequenceBlock[][][] = []
	private sequenceConsumer: ISequenceConsumer
	private operationHistoryDbEntity: DbEntity
	private recordHistoryDbEntity: DbEntity
	private repoTransHistoryDbEntity: DbEntity
	private transHistoryDbEntity: DbEntity
	private operationHistoryIds: number[]
	private recordHistoryIds: number[]
	private repoTransHistoryIds: number[]
	private transHistoryIds: number[]
	private operationHistoryReservedIds: number[]
	private recordHistoryReservedIds: number[]
	private repoTransHistoryReservedIds: number[]
	private transHistoryReservedIds: number[]
	private operationHistorySeqBlock: ISequenceBlock
	private recordHistorySeqBlock: ISequenceBlock
	private repoTransHistorySeqBlock: ISequenceBlock
	private transHistorySeqBlock: ISequenceBlock

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(SequenceBlockDaoToken)
		private sequenceBlockDao: ISequenceBlockDao,
		@Inject(SequenceConsumerDaoToken)
		private sequenceConsumerDao: ISequenceConsumerDao,
		@Inject(SequenceDaoToken)
		private sequenceDao: ISequenceDao,
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	async init(
		domain: IDomain
	): Promise<void> {
		this.sequenceConsumer = {
			createTimestamp: new Date().getTime(),
			domain,
			randomNumber: Math.random()
		}

		await this.sequenceConsumerDao.create(this.sequenceConsumer)
		const sequences = await this.sequenceDao.findAll()

		for (const sequence of sequences) {
			this.utils.ensureChildArray(
				this.utils.ensureChildArray(this.sequences, sequence.schemaIndex),
				sequence.tableIndex)[sequence.columnIndex] = sequence
			this.utils.ensureChildArray(
				this.utils.ensureChildArray(this.lastIds, sequence.schemaIndex),
				sequence.tableIndex)
			this.utils.ensureChildArray(
				this.utils.ensureChildArray(this.lastReservedIds, sequence.schemaIndex),
				sequence.tableIndex)
		}

		this.transHistoryDbEntity     =
			this.getHoldingPatternDbEntity('TransactionHistory')
		this.repoTransHistoryDbEntity =
			this.getHoldingPatternDbEntity('RepositoryTransactionHistory')
		this.operationHistoryDbEntity =
			this.getHoldingPatternDbEntity('OperationHistory')
		this.recordHistoryDbEntity    =
			this.getHoldingPatternDbEntity('RecordHistory')

		const holdingPatternLastIds
						= this.lastIds[this.transHistoryDbEntity.schemaVersion.schema.index]
		const holdingPatternLastReservedIds
						= this.lastReservedIds[this.transHistoryDbEntity.schemaVersion.schema.index]


		this.operationHistoryIds = holdingPatternLastIds[this.operationHistoryDbEntity.index]
		this.recordHistoryIds    = holdingPatternLastIds[this.recordHistoryDbEntity.index]
		this.repoTransHistoryIds = holdingPatternLastIds[this.repoTransHistoryDbEntity.index]
		this.transHistoryIds     = holdingPatternLastIds[this.transHistoryDbEntity.index]

		this.operationHistoryReservedIds
			= holdingPatternLastReservedIds[this.operationHistoryDbEntity.index]
		this.recordHistoryReservedIds
			= holdingPatternLastReservedIds[this.recordHistoryDbEntity.index]
		this.repoTransHistoryReservedIds
			= holdingPatternLastReservedIds[this.repoTransHistoryDbEntity.index]
		this.transHistoryReservedIds
			= holdingPatternLastReservedIds[this.transHistoryDbEntity.index]

		this.operationHistorySeqBlock = this.getHistorySeqBlock(this.transHistoryDbEntity)
		this.recordHistorySeqBlock    = this.getHistorySeqBlock(this.transHistoryDbEntity)
		this.repoTransHistorySeqBlock = this.getHistorySeqBlock(this.transHistoryDbEntity)
		this.transHistorySeqBlock     = this.getHistorySeqBlock(this.transHistoryDbEntity);

		[this.operationHistorySeqBlock, this.recordHistorySeqBlock,
			this.repoTransHistorySeqBlock, this.transHistorySeqBlock]
			= await this.sequenceBlockDao.createNewBlocks([
			this.operationHistorySeqBlock,
			this.recordHistorySeqBlock,
			this.repoTransHistorySeqBlock,
			this.transHistorySeqBlock
		])
		this.setHistoryIds(
			this.operationHistoryDbEntity, this.operationHistorySeqBlock,
			this.operationHistoryIds, this.operationHistoryReservedIds)
		this.setHistoryIds(
			this.recordHistoryDbEntity, this.recordHistorySeqBlock,
			this.recordHistoryIds, this.recordHistoryReservedIds)
		this.setHistoryIds(
			this.repoTransHistoryDbEntity, this.repoTransHistorySeqBlock,
			this.repoTransHistoryIds, this.repoTransHistoryReservedIds)
		this.setHistoryIds(
			this.transHistoryDbEntity, this.transHistorySeqBlock,
			this.transHistoryIds, this.transHistoryReservedIds)
	}

	getHoldingPatternDbEntity(
		holdingPatternEntityName: string
	): DbEntity {
		return Q.db.currentVersion.entityMapByName[holdingPatternEntityName]
	}

	generateIds(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): number[][] {
		const sequenceBlockToCreateMap: Map<DbColumn, ISequenceBlock> = new Map()
		dbColumns.forEach((
			dbColumn,
			index
		) => {
			let { numNewSequencesNeeded, sequenceBlock }
						= this.getNumNewSequencesNeeded(dbColumn, numSequencesNeeded[index])
			if (numNewSequencesNeeded) {
				sequenceBlock.size = numNewSequencesNeeded
				sequenceBlockToCreateMap.set(dbColumn, sequenceBlock)
			}
		})
	}

	getNumNewSequencesNeeded(
		dbColumn: DbColumn,
		numSequencesNeeded: number
	): {
		numNewSequencesNeeded: number;
		sequenceBlock: ISequenceBlock;
	} {
		const dbEntity            = dbColumn.propertyColumns[0].property.entity
		const sequenceBlock       = this.utils.ensureChildArray(
			this.utils.ensureChildArray(
				this.sequenceBlocks, dbEntity.schemaVersion.schema.index),
			dbEntity.index)[dbColumn.index]
		const sequence            = this.sequences[dbEntity.schemaVersion.schema.index]
			[dbEntity.index][dbColumn.index]
		let numNewSequencesNeeded = 0
		if (!sequenceBlock) {
			numNewSequencesNeeded = sequence.incrementBy + numSequencesNeeded
			return {
				numNewSequencesNeeded,
				sequenceBlock: {
					sequence,
					sequenceConsumer: this.sequenceConsumer,
					size: 0
				}
			}
		}
		if (sequenceBlock.currentNumber + numSequencesNeeded > sequenceBlock.lastReservedId) {
			numNewSequencesNeeded
				= sequenceBlock.currentNumber + numSequencesNeeded
				- sequenceBlock.lastReservedId + sequence.incrementBy
		}

		return {
			numNewSequencesNeeded,
			sequenceBlock
		}
	}

	generateTransactionHistoryIds(
		numRepositoryTransHistories
			:
			NumRepositoryTransHistories,
		numOperationTransHistories
			:
			NumOperationTransHistories,
		numRecordHistories
			:
			NumRecordHistories
	):
		TransactionHistoryIds {
		const lastReservedId = this.operationHistoryReservedIds[this.operationHistoryDbEntity.idColumns[0].index]
		const currentId      = this.operationHistoryIds[this.operationHistoryDbEntity.idColumns[0].index]
		if (currentId + numOperationTransHistories > lastReservedId) {

		}
		const nextTransHistoryId = this.lastIds

	}

	generateTransHistoryId( //
	)
		:
		number {
		return this.generateHoldingPatternEntityId(
			'TransactionHistory')
	}

	generateRepoTransHistoryId( //
	)
		:
		number {
		return this.generateHoldingPatternEntityId(
			'RepositoryTransactionHistory')
	}

	generateOperationHistoryId( //
	)
		:
		number {
		return this.generateHoldingPatternEntityId(
			'OperationHistory')
	}

	generateRecordHistoryId( //
	)
		:
		number {
		return this.generateHoldingPatternEntityId(
			'RecordHistory')
	}

	generateHoldingPatternEntityId(
		holdingPatternEntityName
			:
			string
	):
		number {
		const dbEntity = Q.db.currentVersion.entityMapByName[holdingPatternEntityName]

		return this.generateEntityId(dbEntity)
	}

	generateEntityId(
		dbEntity
			:
			DbEntity,
		entity
			:
			any = null,
	):
		number {
		if (!this.lastIds) {
			throw `Id cache is not loaded.`
			// await this.loadLatestIds();
		}
		let newId = ++this.lastIds[dbEntity.schemaVersion.schema.index][dbEntity.index]

		if (!entity) {
			return newId
		}

		const recordWithId = {
			...entity,
		}

		let columnName           = dbEntity.idColumns[0].name
		recordWithId[columnName] = newId

		return recordWithId
	}

	loadLatestIds( //
	)
		:
		Promise<void> {
		const maxIdRecords = await
		this.airportDb.db.find.sheet(this.getMaxIdQueries())

		this.lastIds = []
		for (const maxIdRecord of maxIdRecords) {
			const schemaLastIds = this.utils.ensureChildArray(this.lastIds, maxIdRecord[0])
			let id              = maxIdRecord[2]
			if (!id) {
				id = 0
			}
			schemaLastIds[maxIdRecord[1]] = id
		}
	}

	generateByHoldingPatternEntityName(
		entityName
			:
			string
	):
		Promise<number> {
		const dbEntity = Q.db.currentVersion.entityMapByName[entityName]

		return <any>this.generateEntityId(dbEntity)
	}

	getMaxIdQueries()
		:
		RawNonEntityQuery {
		const idQueries: RawSheetQuery[] = []
		for (const schema of this.airportDb.schemas) {
			const qSchema = this.airportDb.qSchemas[schema.index]
			for (const entity of schema.currentVersion.entities) {
				if (entity.idColumns.length > 1) {
					continue
				}
				const idColumn = entity.idColumns[0]
				if (!idColumn.isGenerated) {
					continue
				}
				const qEntity                                       = qSchema[entity.name]
				const select: (IQOrderableField<any> | Primitive)[] = []
				select.push(schema.index)
				select.push(entity.index)
				select.push(max(qEntity[idColumn.name]))
				let query: RawSheetQuery = {
					select,
					from: [qEntity],
				}
				idQueries.push(query)
			}
		}

		return unionAll(...idQueries)
	}

	private getHistorySeqBlock(
		dbEntity: DbEntity
	): ISequenceBlock {
		const operationHistorySequence = this.sequences
			[this.transHistoryDbEntity.schemaVersion.schema.index]
			[this.transHistoryDbEntity.index]
			[this.transHistoryDbEntity.idColumns[0].index]

		return {
			sequence: {
				id: operationHistorySequence.id
			},
			sequenceConsumer: {
				id: this.sequenceConsumer.id
			},
			size: operationHistorySequence.incrementBy
		}
	}

	private setHistoryIds(
		dbEntity: DbEntity,
		sequenceBlock: ISequenceBlock,
		ids: number[],
		reservedIds: number[]
	) {
		ids[dbEntity.idColumns[0].index]
			= sequenceBlock.lastReservedId - sequenceBlock.size + 1
		reservedIds[dbEntity.idColumns[0].index]
			= sequenceBlock.lastReservedId
	}


}
