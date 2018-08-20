import { IUtils } from '@airport/air-control';
import { ISequenceBlockDao } from '@airport/airport-code';
import { DbColumn } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
import { ISequenceConsumerDao } from '../../node_modules/@airport/airport-code/lib/dao/SequenceConsumerDao';
import { ISequenceDao } from '../../node_modules/@airport/airport-code/lib/dao/SequenceDao';
export interface ISequenceGenerator {
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    init(domain: IDomain): Promise<void>;
}
export declare abstract class AbstractSequenceGenerator implements ISequenceGenerator {
    private sequenceBlockDao;
    private sequenceConsumerDao;
    private sequenceDao;
    private utils;
    private sequences;
    private sequenceBlocks;
    private sequenceConsumer;
    constructor(sequenceBlockDao: ISequenceBlockDao, sequenceConsumerDao: ISequenceConsumerDao, sequenceDao: ISequenceDao, utils: IUtils);
    init(domain: IDomain): Promise<void>;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    private getNumNewSequencesNeeded;
}
