import { ISequence, ISequenceDao } from '@airport/airport-code';
import { DbColumn, DbEntity, ISequenceGenerator } from '@airport/ground-control';
import { IContext } from '@airport/direction-indicator';
import { ITerminalStore } from '@airport/terminal-map';
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
export declare class SequenceGenerator implements ISequenceGenerator {
    sequenceDao: ISequenceDao;
    terminalStore: ITerminalStore;
    protected get sequences(): ISequence[][][];
    protected get sequenceBlocks(): number[][][];
    protected get generatingSequenceNumbers(): boolean;
    protected set generatingSequenceNumbers(generatingSequenceNumbers: boolean);
    exists(dbEntity: DbEntity): boolean;
    initialize(context: IContext, sequences?: ISequence[]): Promise<void>;
    tempInitialize(context: IContext, sequences?: ISequence[]): Promise<void>;
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
export declare function injectSequenceGenerator(): void;
//# sourceMappingURL=SequenceGenerator.d.ts.map