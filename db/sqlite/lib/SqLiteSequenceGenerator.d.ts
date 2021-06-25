import { ISequence } from '@airport/airport-code';
import { ISequenceGenerator } from '@airport/check-in';
import { DbColumn, DbEntity, DbSequence } from '@airport/ground-control';
export interface SqLiteSequence extends DbSequence {
    currentValue: number;
}
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
export declare class SqLiteSequenceGenerator implements ISequenceGenerator {
    private sequences;
    private sequenceBlocks;
    private generatingSequenceNumbers;
    exists(dbEntity: DbEntity): boolean;
    initialize(sequences?: DbSequence[]): Promise<void>;
    tempInit(sequences?: ISequence[]): Promise<void>;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    /**
     * Keeping return value as number[][] in case we ever revert back
     * to SequenceBlock-like solution
     * @param dbColumns
     * @param numSequencesNeeded
     */
    private doGenerateSequenceNumbers;
    private waitForPreviousGeneration;
    private isDoneGeneratingSeqNums;
    private addSequences;
}
//# sourceMappingURL=SqLiteSequenceGenerator.d.ts.map