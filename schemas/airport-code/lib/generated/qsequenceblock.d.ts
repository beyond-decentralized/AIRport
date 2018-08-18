import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISequence, SequenceEId, SequenceEOptionalId, SequenceESelect, QSequenceQId, QSequenceQRelation } from './qsequence';
import { ISequenceConsumer, SequenceConsumerEId, SequenceConsumerEOptionalId, SequenceConsumerESelect, QSequenceConsumerQId, QSequenceConsumerQRelation } from './qsequenceconsumer';
export interface ISequenceBlock {
    sequence?: ISequence;
    consumer?: ISequenceConsumer;
    size?: number;
    lastReservedId?: number;
    reservationMillis?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceBlockESelect extends IEntitySelectProperties, SequenceBlockEOptionalId, SequenceBlockEUpdateProperties {
    sequence?: SequenceESelect;
    consumer?: SequenceConsumerESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId extends IEntityIdProperties {
    sequence: SequenceEId;
    consumer: SequenceConsumerEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
    sequence?: SequenceEOptionalId;
    consumer?: SequenceConsumerEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceBlockEUpdateProperties extends IEntityUpdateProperties {
    size?: number | IQNumberField;
    lastReservedId?: number | IQNumberField;
    reservationMillis?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceBlockEUpdateColumns extends IEntityUpdateColumns {
    SIZE?: number | IQNumberField;
    LAST_RESERVED_ID?: number | IQNumberField;
    RESERVATION_MILLIS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SequenceBlockECreateProperties extends Partial<SequenceBlockEId>, SequenceBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SequenceBlockECreateColumns extends SequenceBlockEId, SequenceBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSequenceBlock extends QEntity {
    sequence: QSequenceQRelation;
    consumer: QSequenceConsumerQRelation;
    size: IQNumberField;
    lastReservedId: IQNumberField;
    reservationMillis: IQNumberField;
}
export interface QSequenceBlockQId {
    sequence: QSequenceQId;
    consumer: QSequenceConsumerQId;
}
export interface QSequenceBlockQRelation extends QRelation<QSequenceBlock>, QSequenceBlockQId {
}
