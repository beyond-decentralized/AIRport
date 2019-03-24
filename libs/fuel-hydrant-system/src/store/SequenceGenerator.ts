import {IUtils}             from '@airport/air-control'
import {
	IAbstractSequenceBlockDao,
	IAbstractSequenceConsumerDao,
	IAbstractSequenceDao,
	ISequence,
	ISequenceBlock,
	ISequenceConsumer,
	SEQUENCE_BLOCK_DAO,
	SEQUENCE_CONSUMER_DAO,
	SEQUENCE_DAO
}                           from '@airport/airport-code'
import {DI}                 from '@airport/di'
import {DbColumn}           from '@airport/ground-control'
import {IDomain}            from '@airport/territory'
import {SEQUENCE_GENERATOR} from '../diTokens'

export interface ISequenceGenerator {

	generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]>

	init(
		domain: IDomain
	): Promise<void>

}

export class SequenceGenerator
	implements ISequenceGenerator {

	private sequences: ISequence[][][]           = []
	private sequenceBlocks: ISequenceBlock[][][] = []
	private sequenceConsumer: ISequenceConsumer

	private sequenceBlockDao: IAbstractSequenceBlockDao
	private sequenceConsumerDao: IAbstractSequenceConsumerDao
	private sequenceDao: IAbstractSequenceDao
	private utils: IUtils

	constructor() {
		DI.get((
			sequenceBlockDao,
			sequenceConsumerDao,
			sequenceDao
		) => {
			this.sequenceBlockDao = sequenceBlockDao
			this.sequenceConsumerDao = sequenceConsumerDao
			this.sequenceDao      = sequenceDao
		}, SEQUENCE_BLOCK_DAO, SEQUENCE_CONSUMER_DAO, SEQUENCE_DAO)
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
		}

	}

	async generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]> {
		const numSequencesNeededFromNewBlocks: Map<DbColumn, number> = new Map()
		const sequentialNumbersForColumn: Map<DbColumn, number[]>    = new Map()
		const sequenceBlocksToCreate: Map<DbColumn, ISequenceBlock>  = new Map()
		const allSequenceBlocks: Map<DbColumn, ISequenceBlock>       = new Map()
		const sequentialNumbers: number[][]                          = []
		dbColumns.forEach((
			dbColumn,
			index
		) => {
			const numColumnSequencesNeeded = numSequencesNeeded[index]
			const columnNumbers            = this.utils.ensureChildArray(sequentialNumbers, index)
			sequentialNumbersForColumn.set(dbColumn, columnNumbers)
			let {numNewSequencesNeeded, sequenceBlock}
				    = this.getNumNewSequencesNeeded(dbColumn, numColumnSequencesNeeded)
			allSequenceBlocks.set(dbColumn, sequenceBlock)

			let maxAvailableNumbers = sequenceBlock.lastReservedId - sequenceBlock.currentNumber
			if (maxAvailableNumbers > numColumnSequencesNeeded) {
				maxAvailableNumbers = numColumnSequencesNeeded
			}

			for (let i = 0; i < maxAvailableNumbers; i++) {
				columnNumbers.push(++sequenceBlock.currentNumber)
			}

			if (numNewSequencesNeeded) {
				sequenceBlock.size = numNewSequencesNeeded
				sequenceBlocksToCreate.set(dbColumn, sequenceBlock)
				numSequencesNeededFromNewBlocks.set(
					dbColumn, numColumnSequencesNeeded - maxAvailableNumbers)
			}
		})

		if (sequenceBlocksToCreate.size) {
			const columnsForCreatedBlocks: DbColumn[] = []
			const newBlocksToCreate: ISequenceBlock[] = []
			for (const [dbColumn, newBlock] of sequenceBlocksToCreate) {
				columnsForCreatedBlocks.push(dbColumn)
				newBlocksToCreate.push(newBlock)
			}
			const newBlocks
				      = await this.sequenceBlockDao.createNewBlocks(newBlocksToCreate)
			newBlocks.forEach((
				newBlocksForColumn: ISequenceBlock[],
				index: number
			) => {
				const dbColumn         = columnsForCreatedBlocks[index]
				const columnNumbers    = sequentialNumbersForColumn.get(dbColumn)
				let numSequencesNeeded = numSequencesNeededFromNewBlocks.get(dbColumn)

				let lastBlock: ISequenceBlock = null
				newBlocksForColumn.some((
					newBlockForColumn
				) => {
					lastBlock = newBlockForColumn

					while (numSequencesNeeded > 0
					&& newBlockForColumn.currentNumber <= newBlockForColumn.lastReservedId) {
						columnNumbers.push(newBlockForColumn.currentNumber)
						newBlockForColumn.currentNumber++
						numSequencesNeeded--
					}

					if (numSequencesNeeded === 0) {
						return true
					}
				})
				const dbEntity                    = dbColumn.propertyColumns[0].property.entity
				this.utils.ensureChildArray(
					this.utils.ensureChildArray(
						this.sequenceBlocks, dbEntity.schemaVersion.schema.index),
					dbEntity.index)[dbColumn.index] = lastBlock
			})
		}

		return sequentialNumbers
	}

	private getNumNewSequencesNeeded(
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
					currentNumber: 0,
					lastReservedId: 0,
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

}

DI.set(SEQUENCE_GENERATOR, SequenceGenerator)
