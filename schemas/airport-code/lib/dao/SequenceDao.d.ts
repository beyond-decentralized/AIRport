import { BaseSequenceDao, IBaseSequenceDao, ISequence, SequenceEId } from '../generated/generated';
export interface IAbstractSequenceDao {
    findAll(entityIds?: SequenceEId[]): Promise<ISequence[]>;
}
export interface ISequenceDao extends IAbstractSequenceDao, IBaseSequenceDao {
}
export declare class SequenceDao extends BaseSequenceDao implements ISequenceDao {
}
