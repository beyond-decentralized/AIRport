import { IAbstractSequenceBlockDao, ISequenceBlock } from '@airport/airport-code';
export declare class SequenceBlockDao implements IAbstractSequenceBlockDao {
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[][]>;
}
