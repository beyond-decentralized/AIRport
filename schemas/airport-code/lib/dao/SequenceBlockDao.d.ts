import { IAirportDatabase, IUtils } from '@airport/air-control';
import { BaseSequenceBlockDao, IBaseSequenceBlockDao, ISequenceBlock } from '../generated/generated';
export interface IAbstractSequenceBlockDao {
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[][]>;
}
export interface ISequenceBlockDao extends IAbstractSequenceBlockDao, IBaseSequenceBlockDao {
}
export declare class SequenceBlockDao extends BaseSequenceBlockDao implements ISequenceBlockDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[][]>;
}
