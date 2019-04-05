import { IDao, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, QSchema as ACQSchema } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence } from './qsequence';
import { ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock } from './qsequenceblock';
import { ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer } from './qsequenceconsumer';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string, qSchema: ACQSchema);
}
export interface IBaseSequenceDao extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> {
}
export declare class BaseSequenceDao extends SQDIDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> implements IBaseSequenceDao {
    constructor();
}
export interface IBaseSequenceBlockDao extends IDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}
export declare class BaseSequenceBlockDao extends SQDIDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> implements IBaseSequenceBlockDao {
    constructor();
}
export interface IBaseSequenceConsumerDao extends IDao<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> {
}
export declare class BaseSequenceConsumerDao extends SQDIDao<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> implements IBaseSequenceConsumerDao {
    constructor();
}
