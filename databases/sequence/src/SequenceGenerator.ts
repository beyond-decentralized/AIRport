import {
	ISequenceDao
} from '@airport/airport-code';
import {
	DbColumn,
	DbEntity,
	DbSequence,
	ISequenceGenerator,
} from '@airport/ground-control';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { ITerminalStore } from '@airport/terminal-map';
import { IAirportDatabase } from '@airport/air-traffic-control';
import { IDatastructureUtils } from '@airport/ground-control';

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
	airportDatabase: IAirportDatabase

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	sequenceDao: ISequenceDao

	@Inject()
	terminalStore: ITerminalStore

	protected get sequences(): DbSequence[][][] {
		return this.terminalStore.getSequenceGenerator().sequences
	}
	protected get sequenceBlocks(): number[][][] {
		return this.terminalStore.getSequenceGenerator().sequenceBlocks
	}

	protected get generatingSequenceNumbers(): boolean {
		return this.terminalStore.getSequenceGenerator().generatingSequenceNumbers
	}

	protected set generatingSequenceNumbers(
		generatingSequenceNumbers: boolean
	) {
		this.terminalStore.getSequenceGenerator().generatingSequenceNumbers
			= generatingSequenceNumbers
	}

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
		context: IContext,
		sequences?: DbSequence[]
	): Promise<void> {
		if (!sequences) {
			sequences = await this.sequenceDao.findAll();
		}
		this.addSequences(sequences);

		await this.sequenceDao.incrementCurrentValues(context);

		globalThis.SEQ_GEN = this;
	}

	async tempInitialize(
		context: IContext,
		sequences?: DbSequence[]
	): Promise<void> {
		this.addSequences(sequences);

		globalThis.SEQ_GEN = this;
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

	async generateSequenceNumbersForColumn(
		domainName: string,
		applicationName: string,
		entityName: string,
		columnName: string,
		numSequencesNeeded: number
	): Promise<number[]> {
		if (!numSequencesNeeded) {
			return []
		}

		const dbEntity = this.airportDatabase.getDbEntity(
			domainName,
			applicationName,
			entityName
		)
		const dbColumn = dbEntity.columnMap[columnName]

		const sequencesWrapper = await this.generateSequenceNumbers(
			[dbColumn], [numSequencesNeeded])

		return sequencesWrapper[0]
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
			const columnNumbers = this.datastructureUtils.ensureChildArray(sequentialNumbers, i);

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
		sequences: DbSequence[]
	): void {
		for (const sequence of sequences) {
			this.datastructureUtils.ensureChildArray(
				this.datastructureUtils.ensureChildArray(this.sequences, sequence.applicationIndex),
				sequence.tableIndex)[sequence.columnIndex] = sequence;
			sequence.currentValue += sequence.incrementBy;
			this.datastructureUtils.ensureChildArray(
				this.datastructureUtils.ensureChildArray(this.sequenceBlocks, sequence.applicationIndex),
				sequence.tableIndex)[sequence.columnIndex] = sequence.incrementBy;
		}
	}

}

export function injectSequenceGenerator() {
	console.log('injecting SequenceGenerator')
}
