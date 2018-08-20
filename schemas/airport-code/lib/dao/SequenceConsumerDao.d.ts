import { IUtils } from '@airport/air-control';
import { BaseSequenceConsumerDao, IBaseSequenceConsumerDao } from '..';
export interface IAbstractSequenceConsumerDao {
}
export interface ISequenceConsumerDao extends IAbstractSequenceConsumerDao, IBaseSequenceConsumerDao {
}
export declare class SequenceConsumerDao extends BaseSequenceConsumerDao implements ISequenceConsumerDao {
    constructor(utils: IUtils);
}
