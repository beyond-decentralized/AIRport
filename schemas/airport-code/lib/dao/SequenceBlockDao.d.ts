import { BaseSequenceBlockDao, IBaseSequenceBlockDao, ISequenceBlock } from '../generated/generated';
export interface IAbstractSequenceBlockDao {
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[][]>;
}
export interface ISequenceBlockDao extends IAbstractSequenceBlockDao, IBaseSequenceBlockDao {
}
export declare class SequenceBlockDao extends BaseSequenceBlockDao implements ISequenceBlockDao {
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[][]>;
}
