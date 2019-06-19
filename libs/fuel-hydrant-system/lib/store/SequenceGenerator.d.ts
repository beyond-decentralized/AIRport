import { ISequence } from '@airport/airport-code';
import { ISequenceGenerator } from '@airport/check-in';
import { DbColumn, DbEntity } from '@airport/ground-control';
export declare class SequenceGenerator implements ISequenceGenerator {
    private sequences;
    private sequenceBlocks;
    exists(dbEntity: DbEntity): boolean;
    init(sequences?: ISequence[]): Promise<void>;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    private addSequences;
    private getNumNewSequencesNeeded;
}
