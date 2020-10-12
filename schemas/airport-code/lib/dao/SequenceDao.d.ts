import { BaseSequenceDao, IBaseSequenceDao } from '../generated/generated';
export interface IAbstractSequenceDao {
}
export interface ISequenceDao extends IBaseSequenceDao {
    incrementCurrentValues(): Promise<void>;
}
export declare class SequenceDao extends BaseSequenceDao implements ISequenceDao {
    static diSet(): boolean;
    incrementCurrentValues(): Promise<void>;
    incrementSequence(): Promise<void>;
}
//# sourceMappingURL=SequenceDao.d.ts.map