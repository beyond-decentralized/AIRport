import { Sequence } from './Sequence';
import { SequenceConsumer } from './SequenceConsumer';
export declare type SequenceBlockFirstReservedId = number;
export declare type SequenceBlockLastReservedId = number;
export declare type SequenceBlockReservationMillis = number;
export declare class SequenceBlock {
    sequence: Sequence;
    consumer: SequenceConsumer;
    firstReservedId: SequenceBlockFirstReservedId;
    lastReservedId: SequenceBlockLastReservedId;
    reservationMillis: SequenceBlockReservationMillis;
}
