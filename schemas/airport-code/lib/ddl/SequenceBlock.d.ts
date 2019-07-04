import { Sequence } from './Sequence';
export declare type SequenceBlockSize = number;
export declare type SequenceBlockLastReservedId = number;
export declare type SequenceBlockReservationMillis = number;
export declare type SequenceBlockCurrentNumber = number;
export declare class SequenceBlock {
    reservationMillis: SequenceBlockReservationMillis;
    sequence: Sequence;
    size: SequenceBlockSize;
    lastReservedId: SequenceBlockLastReservedId;
    currentNumber: SequenceBlockCurrentNumber;
}
