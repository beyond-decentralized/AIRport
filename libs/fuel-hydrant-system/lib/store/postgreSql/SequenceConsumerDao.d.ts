import { IAbstractSequenceConsumerDao, SequenceConsumerECreateProperties } from '@airport/airport-code';
export declare class SequenceConsumerDao implements IAbstractSequenceConsumerDao {
    create<EntityInfo extends SequenceConsumerECreateProperties[] | SequenceConsumerECreateProperties>(entityInfo: EntityInfo): Promise<number>;
}
