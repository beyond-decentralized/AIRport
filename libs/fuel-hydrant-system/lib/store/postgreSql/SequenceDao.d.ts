import { IAbstractSequenceDao, ISequence, SequenceEId } from '@airport/airport-code';
export declare class SequenceDao implements IAbstractSequenceDao {
    private terminalStore;
    constructor();
    findAll(entityIds?: SequenceEId[]): Promise<ISequence[]>;
}
