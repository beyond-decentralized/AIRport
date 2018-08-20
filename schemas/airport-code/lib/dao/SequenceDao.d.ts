import { IUtils } from '@airport/air-control';
import { BaseSequenceDao, IBaseSequenceDao, ISequence, SequenceEId } from '..';
export interface IAbstractSequenceDao {
    findAll(entityIds?: SequenceEId[]): Promise<ISequence[]>;
}
export interface ISequenceDao extends IAbstractSequenceDao, IBaseSequenceDao {
}
export declare class SequenceDao extends BaseSequenceDao implements ISequenceDao {
    constructor(utils: IUtils);
}
