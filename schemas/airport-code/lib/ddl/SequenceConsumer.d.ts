import { Domain } from '@airport/territory';
export declare type SequenceConsumerId = number;
export declare type SequenceConsumerCreateTimestamp = number;
export declare type SequenceConsumerRandomNumber = number;
export declare class SequenceConsumer {
    id: SequenceConsumerId;
    createTimestamp: SequenceConsumerCreateTimestamp;
    randomNumber: SequenceConsumerRandomNumber;
    domain: Domain;
}
