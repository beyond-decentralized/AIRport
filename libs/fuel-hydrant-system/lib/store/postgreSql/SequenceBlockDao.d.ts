import { IAbstractSequenceBlockDao, ISequenceBlock } from '@airport/airport-code';
import { IStoreDriver } from '@airport/ground-control';
import { ITerminalStore } from '@airport/terminal-map';
export declare class SequenceBlockDao implements IAbstractSequenceBlockDao {
    private storeDriver;
    private terminalStore;
    constructor(storeDriver: IStoreDriver, terminalStore: ITerminalStore);
    createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[][]>;
}
