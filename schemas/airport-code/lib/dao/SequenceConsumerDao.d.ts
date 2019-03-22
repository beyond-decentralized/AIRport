import { BaseSequenceConsumerDao, IBaseSequenceConsumerDao, SequenceConsumerECreateProperties } from '../generated/generated';
export interface IAbstractSequenceConsumerDao {
    create<EntityInfo extends SequenceConsumerECreateProperties[] | SequenceConsumerECreateProperties>(entityInfo: EntityInfo): Promise<number>;
}
export interface ISequenceConsumerDao extends IAbstractSequenceConsumerDao, IBaseSequenceConsumerDao {
}
export declare class SequenceConsumerDao extends BaseSequenceConsumerDao implements ISequenceConsumerDao {
}
