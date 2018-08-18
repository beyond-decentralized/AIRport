import { IUtils } from '@airport/air-control';
import { BaseSequenceDao, IBaseSequenceDao } from '..';
export interface ISequenceDao extends IBaseSequenceDao {
}
export declare class SequenceDao extends BaseSequenceDao implements ISequenceDao {
    constructor(utils: IUtils);
}
