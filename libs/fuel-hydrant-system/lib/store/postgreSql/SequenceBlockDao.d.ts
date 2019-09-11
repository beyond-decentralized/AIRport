import { IAbstractSequenceBlockDao, ISequenceBlock } from '@airport/airport-code';
export declare class SequenceBlockDao implements IAbstractSequenceBlockDao {
    private storeDriver;
    private terminalStore;
    constructor();
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[][]>;
}
