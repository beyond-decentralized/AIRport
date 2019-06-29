import { BaseSequenceDao, IBaseSequenceDao } from '../generated/generated';
export interface IAbstractSequenceDao {
}
export interface ISequenceDao extends IBaseSequenceDao {
}
export declare class SequenceDao extends BaseSequenceDao implements ISequenceDao {
    static diSet(): boolean;
}
