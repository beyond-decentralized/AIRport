import { IUtils } from '@airport/air-control';
import { IAbstractSequenceBlockDao, IAbstractSequenceConsumerDao, IAbstractSequenceDao } from '@airport/airport-code';
import { DbColumn } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
export interface ISequenceGenerator {
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    init(domain: IDomain): Promise<void>;
}
export declare class SequenceGenerator implements ISequenceGenerator {
    private sequenceBlockDao;
    private sequenceConsumerDao;
    private sequenceDao;
    private utils;
    private sequences;
    private sequenceBlocks;
    private sequenceConsumer;
    constructor(sequenceBlockDao: IAbstractSequenceBlockDao, sequenceConsumerDao: IAbstractSequenceConsumerDao, sequenceDao: IAbstractSequenceDao, utils: IUtils);
    init(domain: IDomain): Promise<void>;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    private getNumNewSequencesNeeded;
}
