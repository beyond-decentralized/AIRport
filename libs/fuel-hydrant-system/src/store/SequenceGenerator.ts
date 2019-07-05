import {
	ISequence,
	SEQUENCE_DAO
}            from '@airport/airport-code'
import {
	ISequenceGenerator,
	SEQUENCE_GENERATOR,
	setSeqGen
}            from '@airport/check-in'
import {DI,} from '@airport/di'
import {
	DbColumn,
	DbEntity,
	ensureChildArray
}            from '@airport/ground-control'

/**
 * Assumptions: 7/4/2019
 *
 * 1. Only a single process will be inserting records at any given point in time
 * a)  This means that the service worker running the the background will only
 * receive and temporarily store data (in IndexedDb, but won't be inserting
 * proper relational records)
 * b)  This also means that web-workers won't be doing parallel inserts
 *
 * In general, this is consistent with SqLites policy of only one modifying
 * operation at a time (while possibly multiple read ops)
 *
 *
 * With these assumptions in place, it is safe to synchronize sequence retrieval
 * in-memory.   Hence, SequenceBlocks are retired in favor of a simpler
 * Sequence-only solution
 *
 */
export class SequenceGenerator
	implements ISequenceGenerator {

	private sequences: ISequence[][][]           = []
	private sequenceBlocks: number[][][] = []

	private generatingSequenceNumbers = false

	exists(
		dbEntity: DbEntity
	): boolean {
		const generatedColumns = dbEntity.columns.filter(
			dbColumn => dbColumn.isGenerated)

		if (!generatedColumns.length) {
			return true
		}

		const schemaSequences = this.sequences[dbEntity.schemaVersion.schema.index]

		if (!schemaSequences) {
			return false
		}

		const tableSequences = schemaSequences[dbEntity.index]

		if (!tableSequences) {
			return false
		}

		return generatedColumns.every(
			dbColumn =>
				!!tableSequences[dbColumn.index])
	}

	async init(
		sequences?: ISequence[]
	): Promise<void> {
		const sequenceDao = await DI.get(SEQUENCE_DAO)
		if (!sequences) {
			sequences = await sequenceDao.findAll()
		}
		this.addSequences(sequences)

		await sequenceDao.incrementCurrentValues()

		setSeqGen(this)
	}

	async generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]> {
		if(!dbColumns.length) {
			return []
		}
		await this.waitForPreviousGeneration();
		this.generatingSequenceNumbers = true

		try {
			await this.doGenerateSequenceNumbers(dbColumns, numSequencesNeeded)
		} finally {
			this.generatingSequenceNumbers = false
		}
	}

	/**
	 * Keeping return value as number[][] in case we ever revert back
	 * to SequenceBlock-like solution
	 * @param dbColumns
	 * @param numSequencesNeeded
	 */
	private async doGenerateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]> {
		const numSequencesNeededFromNewBlocks: Map<DbColumn, number> = new Map()
		const sequentialNumbersForColumn: Map<DbColumn, number[]>    = new Map()
		const sequentialNumbers: number[][]                          = []


		for(let i = 0; i < dbColumns.length; i++) {
			const dbColumn = dbColumns[i]

			let numColumnSequencesNeeded = numSequencesNeeded[i]
			const columnNumbers            = ensureChildArray(sequentialNumbers, i)

			const dbEntity            = dbColumn.propertyColumns[0].property.entity
			const schema = dbEntity.schemaVersion.schema

			let sequenceBlock            = this.sequenceBlocks[schema.index]
				[dbEntity.index][dbColumn.index]

			const sequence            = this.sequences[schema.index]
				[dbEntity.index][dbColumn.index]

			while(numColumnSequencesNeeded && sequenceBlock) {
				columnNumbers.push(sequence.currentValue - sequenceBlock + 1)
				numColumnSequencesNeeded--
				sequenceBlock--
			}

			if(numColumnSequencesNeeded) {
				const numNewSequencesNeeded = sequence.incrementBy + numColumnSequencesNeeded

			}

			sequentialNumbersForColumn.set(dbColumn, columnNumbers)

			let numNewSequencesNeeded
				    = this.getNumNewSequencesNeeded(dbColumn, numColumnSequencesNeeded)

			if(numNewSequencesNeeded) {

			}
			allSequenceBlocks.set(dbColumn, sequenceBlock)

			let sequencesNeededFromCurrentBlock = sequenceBlock.lastReservedId - sequenceBlock.currentNumber
			if (sequencesNeededFromCurrentBlock > numColumnSequencesNeeded) {
				sequencesNeededFromCurrentBlock = numColumnSequencesNeeded
			}

			for (let i = 0; i < sequencesNeededFromCurrentBlock; i++) {
				columnNumbers.push(++sequenceBlock.currentNumber)
			}

			if (numNewSequencesNeeded) {
				sequenceBlock.size = numNewSequencesNeeded
				sequenceBlocksToCreate.set(dbColumn, sequenceBlock)
				numSequencesNeededFromNewBlocks.set(
					dbColumn, numColumnSequencesNeeded - sequencesNeededFromCurrentBlock)
			}
		}

		if (sequenceBlocksToCreate.size) {
			const columnsForCreatedBlocks: DbColumn[] = []
			const newBlocksToCreate: ISequenceBlock[] = []
			for (const [dbColumn, newBlock] of sequenceBlocksToCreate) {
				columnsForCreatedBlocks.push(dbColumn)
				newBlocksToCreate.push(newBlock)
			}
			const newBlocks
				      = await (await DI.get(SEQUENCE_BLOCK_DAO)).createNewBlocks(newBlocksToCreate)
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
				ensureChildArray(
					ensureChildArray(
						this.sequenceBlocks, dbEntity.schemaVersion.schema.index),
					dbEntity.index)[dbColumn.index] = lastBlock
			})
		}

		return sequentialNumbers
	}

	private async waitForPreviousGeneration(): Promise<void> {
		return new Promise(resolve => {
			this.isDoneGeneratingSeqNums(resolve)
		})
	}

	private async isDoneGeneratingSeqNums(
		resolve: () => void
	) {
		if(this.generateSequenceNumbers) {
			setTimeout(() => {
				this.isDoneGeneratingSeqNums(resolve)
			}, 20)
		} else {
			resolve()
		}
	}

	private addSequences(
		sequences: ISequence[]
	): void {
		for (const sequence of sequences) {
			ensureChildArray(
				ensureChildArray(this.sequences, sequence.schemaIndex),
				sequence.tableIndex)[sequence.columnIndex] = sequence
			ensureChildArray(
				ensureChildArray(this.sequenceBlocks, sequence.schemaIndex),
				sequence.tableIndex)[sequence.columnIndex] = sequence.incrementBy
		}

	}

	private getNumNewSequencesNeeded(
		dbColumn: DbColumn,
		numSequencesNeeded: number
	): number {
		const dbEntity            = dbColumn.propertyColumns[0].property.entity
		const schema = dbEntity.schemaVersion.schema
		const sequenceBlock            = this.sequenceBlocks[schema.index]
			[dbEntity.index][dbColumn.index]
		const sequence            = this.sequences[schema.index]
			[dbEntity.index][dbColumn.index]

		let numNewSequencesNeeded = 0

		const remainingSequenceNumbers = sequenceBlock - numSequencesNeeded
		if (remainingSequenceNumbers < 0) {
			numNewSequencesNeeded = sequence.incrementBy - remainingSequenceNumbers
		} else {
			this.sequenceBlocks[schema.index]
				[dbEntity.index][dbColumn.index] = remainingSequenceNumbers
		}

		return numNewSequencesNeeded
	}

}

DI.set(SEQUENCE_GENERATOR, SequenceGenerator)
