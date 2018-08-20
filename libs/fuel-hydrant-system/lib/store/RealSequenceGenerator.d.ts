import { IUtils } from '@airport/air-control';
import { DbColumn, IStoreDriver } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
import { ISequenceGenerator } from './SequenceGenerator';
export declare class RealSequenceGenerator implements ISequenceGenerator {
    private storeDriver;
    private utils;
    constructor(storeDriver: IStoreDriver, utils: IUtils);
    init(domain: IDomain): Promise<void>;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
}
