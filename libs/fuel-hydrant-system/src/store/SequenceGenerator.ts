import {
	AirportDatabaseToken,
	Entity,
	IAirportDatabase,
	IUtils,
	UtilsToken
}                               from '@airport/air-control'
import {
	ISequence,
	ISequenceBlock,
	ISequenceBlockDao,
	ISequenceConsumer,
	SequenceBlockDaoToken,
	SequenceConsumerDaoToken,
	SequenceDaoToken
}                               from '@airport/airport-code'
import {DbColumn}               from '@airport/ground-control'
import {IDomain}                from '@airport/territory'
import {
	Inject,
	Service
}                               from 'typedi'
import {ISequenceConsumerDao}   from '../../node_modules/@airport/airport-code/lib/dao/SequenceConsumerDao'
import {ISequenceDao}           from '../../node_modules/@airport/airport-code/lib/dao/SequenceDao'
import {SequenceGeneratorToken} from '../InjectionTokens'

export interface ISequenceGenerator {

	generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]>

	init(
		domain: IDomain
	): Promise<void>

}

@Service(SequenceGeneratorToken)
export class SequenceGenerator
	implements ISequenceGenerator {

	private sequences: ISequence[][][]           = []
	private sequenceBlocks: ISequenceBlock[][][] = []
	private sequenceConsumer: ISequenceConsumer

	constructor(
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
		}


	}

	async generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]> {
		const numSequencesNeededFromNewBlocks: Map<DbColumn, number> = new Map()
		const sequentialNumbersForColumn: Map<DbColumn, number[]>    = new Map()
		const sequenceBlocksToCreate: Map<DbColumn, ISequenceBlock>   = new Map()
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
				newBlock,
				index
			) => {
				const dbColumn = columnsForCreatedBlocks[index]
				const columnNumbers = sequentialNumbersForColumn.get(dbColumn)
				const numSequencesNeeded = numSequencesNeededFromNewBlocks.get(dbColumn)

				newBlock.currentNumber = newBlock.lastReservedId
				for (let i = 0; i < numSequencesNeeded; i++) {
					columnNumbers.push(++newBlock.currentNumber)
				}
				const dbEntity            = dbColumn.propertyColumns[0].property.entity
				this.utils.ensureChildArray(
					this.utils.ensureChildArray(
						this.sequenceBlocks, dbEntity.schemaVersion.schema.index),
					dbEntity.index)[dbColumn.index] = newBlock
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