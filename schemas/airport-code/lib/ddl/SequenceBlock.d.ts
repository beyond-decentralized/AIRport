import { Sequence } from './Sequence';
import { SequenceConsumer } from './SequenceConsumer';
export declare type SequenceBlockSize = number;
export declare type SequenceBlockLastReservedId = number;
export declare type SequenceBlockReservationMillis = number;
export declare class SequenceBlock {
    sequence: Sequence;
    consumer: SequenceConsumer;
    size: SequenceBlockSize;
    lastReservedId: SequenceBlockLastReservedId;
    reservationMillis: SequenceBlockReservationMillis;
}
