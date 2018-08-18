import { Sequence } from './Sequence';
import { SequenceConsumer } from './SequenceConsumer';
export declare type SequenceBlockId = number;
export declare type SequenceBlockSize = number;
export declare type SequenceBlockLastReservedId = number;
export declare type SequenceBlockReservationMillis = number;
export declare class SequenceBlock {
    id: SequenceBlockId;
    sequence: Sequence;
    sequenceConsumer: SequenceConsumer;
    size: SequenceBlockSize;
    lastReservedId: SequenceBlockLastReservedId;
    reservationMillis: SequenceBlockReservationMillis;
}
