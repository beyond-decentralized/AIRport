import { IUtils } from '@airport/air-control';
import { BaseSequenceDao, IBaseSequenceDao } from '..';
export interface IAbstractSequenceDao {
}
export interface ISequenceDao extends IAbstractSequenceDao, IBaseSequenceDao {
}
export declare class SequenceDao extends BaseSequenceDao implements ISequenceDao {
    constructor(utils: IUtils);
}
