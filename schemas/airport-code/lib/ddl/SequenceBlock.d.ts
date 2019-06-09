import { Sequence } from './Sequence';
export declare type SequenceBlockId = number;
export declare type SequenceBlockSize = number;
export declare type SequenceBlockLastReservedId = number;
export declare type SequenceBlockReservationMillis = number;
export declare type SequenceBlockCurrentNumber = number;
export declare class SequenceBlock {
    id: SequenceBlockId;
    sequence: Sequence;
    size: SequenceBlockSize;
    lastReservedId: SequenceBlockLastReservedId;
    reservationMillis: SequenceBlockReservationMillis;
    currentNumber: SequenceBlockCurrentNumber;
}
