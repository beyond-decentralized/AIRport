import { ISequence } from '@airport/airport-code';
import { DbColumn } from '@airport/ground-control';
export interface ISequenceGenerator {
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    init(sequences?: ISequence[]): Promise<void>;
}
export declare class SequenceGenerator implements ISequenceGenerator {
    private sequences;
    private sequenceBlocks;
    private sequenceConsumer;
    private sequenceBlockDao;
    private sequenceConsumerDao;
    private sequenceDao;
    private utils;
    constructor();
    init(sequences?: ISequence[]): Promise<void>;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    private addSequences;
    private getNumNewSequencesNeeded;
}
