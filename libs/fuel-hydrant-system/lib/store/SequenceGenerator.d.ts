import { DbColumn } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
export interface ISequenceGenerator {
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    init(domain: IDomain): Promise<void>;
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
    init(domain: IDomain): Promise<void>;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    private getNumNewSequencesNeeded;
}
