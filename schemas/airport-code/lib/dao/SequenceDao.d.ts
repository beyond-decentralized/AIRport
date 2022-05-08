import { IContext } from '@airport/direction-indicator';
import { BaseSequenceDao, IBaseSequenceDao } from '../generated/generated';
export interface IAbstractSequenceDao {
}
export interface ISequenceDao extends IBaseSequenceDao {
    incrementCurrentValues(context: IContext): Promise<void>;
}
export declare class SequenceDao extends BaseSequenceDao implements ISequenceDao {
    static diSet(): boolean;
    incrementCurrentValues(context: IContext): Promise<void>;
    incrementSequence(context: IContext): Promise<void>;
}
//# sourceMappingURL=SequenceDao.d.ts.map