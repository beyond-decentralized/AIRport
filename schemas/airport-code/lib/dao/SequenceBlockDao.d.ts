import { IAirportDatabase, IUtils } from '@airport/air-control';
import { BaseSequenceBlockDao, IBaseSequenceBlockDao, ISequenceBlock } from '../generated/generated';
export interface ISequenceBlockDao extends IBaseSequenceBlockDao {
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[]>;
}
export declare class SequenceBlockDao extends BaseSequenceBlockDao implements ISequenceBlockDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[]>;
}
