import {
	ISequence,
	ISequenceDao
} from '@airport/airport-code';
import {
	ISequenceGenerator,
	setSeqGen
} from '@airport/check-in';
import {
	DbColumn,
	DbEntity,
	ensureChildArray
} from '@airport/ground-control';
import { Inject } from '@airport/air-control';
import { Injected } from '@airport/air-control';

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
@Injected()
export class SequenceGenerator
	implements ISequenceGenerator {

	@Inject()
	sequenceDao: ISequenceDao

	protected sequences: ISequence[][][] = [];
	protected sequenceBlocks: number[][][] = [];

	protected generatingSequenceNumbers = false;

	exists(
		dbEntity: DbEntity
	): boolean {
		const generatedColumns = dbEntity.columns.filter(
			dbColumn => dbColumn.isGenerated);

		if (!generatedColumns.length) {
			return true;
		}

		const applicationSequences = this.sequences[dbEntity.applicationVersion.application.index];

		if (!applicationSequences) {
			return false;
		}

		const tableSequences = applicationSequences[dbEntity.index];

		if (!tableSequences) {
			return false;
		}

		return generatedColumns.every(
			dbColumn =>
				!!tableSequences[dbColumn.index]);
	}

	async initialize(
		sequences?: ISequence[]
	): Promise<void> {
		if (!sequences) {
			sequences = await this.sequenceDao.findAll();
		}
		this.addSequences(sequences);

		await this.sequenceDao.incrementCurrentValues();

		setSeqGen(this);
	}

	async tempInitialize(
		sequences?: ISequence[]
	): Promise<void> {
		this.addSequences(sequences);

		setSeqGen(this);
	}

	async generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]> {
		if (!dbColumns.length) {
			return [];
		}
		await this.waitForPreviousGeneration();
		this.generatingSequenceNumbers = true;

		try {
			return await this.doGenerateSequenceNumbers(dbColumns, numSequencesNeeded);
		} finally {
			this.generatingSequenceNumbers = false;
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
		const sequentialNumbers: number[][] = [];

		for (let i = 0; i < dbColumns.length; i++) {
			const dbColumn = dbColumns[i];

			let numColumnSequencesNeeded = numSequencesNeeded[i];
			const columnNumbers = ensureChildArray(sequentialNumbers, i);

			const dbEntity = dbColumn.propertyColumns[0].property.entity;
			const application = dbEntity.applicationVersion.application;

			let sequenceBlock = this.sequenceBlocks[application.index]
			[dbEntity.index][dbColumn.index];

			const sequence = this.sequences[application.index]
			[dbEntity.index][dbColumn.index];

			while (numColumnSequencesNeeded && sequenceBlock) {
				columnNumbers.push(sequence.currentValue - sequenceBlock + 1);
				numColumnSequencesNeeded--;
				sequenceBlock--;
			}
			this.sequenceBlocks[application.index]
			[dbEntity.index][dbColumn.index] = sequenceBlock;

			if (numColumnSequencesNeeded) {
				const numNewSequencesNeeded = sequence.incrementBy + numColumnSequencesNeeded;

				const newSequence = { ...sequence };
				newSequence.currentValue += numNewSequencesNeeded;
				await this.sequenceDao.save(newSequence);
				this.sequences[application.index][dbEntity.index][dbColumn.index] = newSequence;

				sequenceBlock = numNewSequencesNeeded;
				while (numColumnSequencesNeeded) {
					columnNumbers.push(sequence.currentValue - sequenceBlock + 1);
					numColumnSequencesNeeded--;
					sequenceBlock--;
				}

				this.sequenceBlocks[application.index]
				[dbEntity.index][dbColumn.index] = sequenceBlock;
			}
		}

		return sequentialNumbers;
	}

	private waitForPreviousGeneration(): Promise<void> {
		return new Promise(
			resolve => {
				this.isDoneGeneratingSeqNums(resolve);
			});
	}

	private isDoneGeneratingSeqNums(
		resolve: () => void
	) {
		if (this.generatingSequenceNumbers) {
			setTimeout(() => {
				this.isDoneGeneratingSeqNums(resolve);
			}, 20);
		} else {
			resolve();
		}
	}

	private addSequences(
		sequences: ISequence[]
	): void {
		for (const sequence of sequences) {
			ensureChildArray(
				ensureChildArray(this.sequences, sequence.applicationIndex),
				sequence.tableIndex)[sequence.columnIndex] = sequence;
			sequence.currentValue += sequence.incrementBy;
			ensureChildArray(
				ensureChildArray(this.sequenceBlocks, sequence.applicationIndex),
				sequence.tableIndex)[sequence.columnIndex] = sequence.incrementBy;
		}
	}

}

export function injectSequenceGenerator() {
	console.log('injecting SequenceGenerator')
}
