import { IAbstractSequenceDao, ISequence, SequenceEId } from '@airport/airport-code';
import { ITerminalStore } from '@airport/terminal-map';
export declare class SequenceDao implements IAbstractSequenceDao {
    private terminalStore;
    constructor(terminalStore: ITerminalStore);
    findAll(entityIds?: SequenceEId[]): Promise<ISequence[]>;
}
