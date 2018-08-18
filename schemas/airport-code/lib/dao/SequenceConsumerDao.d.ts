import { IUtils } from '@airport/air-control';
import { BaseSequenceConsumerDao, IBaseSequenceConsumerDao } from '..';
export interface ISequenceConsumerDao extends IBaseSequenceConsumerDao {
}
export declare class SequenceConsumerDao extends BaseSequenceConsumerDao implements ISequenceConsumerDao {
    constructor(utils: IUtils);
}
