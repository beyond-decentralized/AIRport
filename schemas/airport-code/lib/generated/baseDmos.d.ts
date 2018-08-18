import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence } from './qsequence';
import { ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock } from './qsequenceblock';
import { ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer } from './qsequenceconsumer';
export interface IBaseSequenceDmo extends IDmo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> {
}
export declare class BaseSequenceDmo extends Dmo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> implements IBaseSequenceDmo {
    constructor();
}
export interface IBaseSequenceBlockDmo extends IDmo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}
export declare class BaseSequenceBlockDmo extends Dmo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> implements IBaseSequenceBlockDmo {
    constructor();
}
export interface IBaseSequenceConsumerDmo extends IDmo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> {
}
export declare class BaseSequenceConsumerDmo extends Dmo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> implements IBaseSequenceConsumerDmo {
    constructor();
}
