import { IDao, IUtils } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence } from './qsequence';
import { ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock } from './qsequenceblock';
import { ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer } from './qsequenceconsumer';
export interface IBaseSequenceDao extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> {
}
export declare class BaseSequenceDao extends Dao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> implements IBaseSequenceDao {
    constructor(utils: IUtils);
}
export interface IBaseSequenceBlockDao extends IDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}
export declare class BaseSequenceBlockDao extends Dao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> implements IBaseSequenceBlockDao {
    constructor(utils: IUtils);
}
export interface IBaseSequenceConsumerDao extends IDao<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> {
}
export declare class BaseSequenceConsumerDao extends Dao<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> implements IBaseSequenceConsumerDao {
    constructor(utils: IUtils);
}
