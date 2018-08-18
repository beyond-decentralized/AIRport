import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISequenceConsumer, SequenceConsumerEId, SequenceConsumerEOptionalId, SequenceConsumerESelect, QSequenceConsumerQId, QSequenceConsumerQRelation } from './qsequenceconsumer';
import { ISequence, SequenceEOptionalId, SequenceESelect, QSequenceQRelation } from './qsequence';
export interface ISequenceBlock {
    id?: number;
    consumer?: ISequenceConsumer;
    size?: number;
    lastReservedId?: number;
    reservationMillis?: number;
    sequence?: ISequence;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceBlockESelect extends IEntitySelectProperties, SequenceBlockEOptionalId, SequenceBlockEUpdateProperties {
    consumer?: SequenceConsumerESelect;
    sequence?: SequenceESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId extends IEntityIdProperties {
    id: number | IQNumberField;
    consumer: SequenceConsumerEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
    id?: number | IQNumberField;
    consumer?: SequenceConsumerEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceBlockEUpdateProperties extends IEntityUpdateProperties {
    size?: number | IQNumberField;
    lastReservedId?: number | IQNumberField;
    reservationMillis?: number | IQNumberField;
    sequence?: SequenceEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceBlockEUpdateColumns extends IEntityUpdateColumns {
    SIZE?: number | IQNumberField;
    LAST_RESERVED_ID?: number | IQNumberField;
    RESERVATION_MILLIS?: number | IQNumberField;
    SEQUENCE_ID?: number | IQNumberField;
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
    id: IQNumberField;
    consumer: QSequenceConsumerQRelation;
    size: IQNumberField;
    lastReservedId: IQNumberField;
    reservationMillis: IQNumberField;
    sequence: QSequenceQRelation;
}
export interface QSequenceBlockQId {
    id: IQNumberField;
    consumer: QSequenceConsumerQId;
}
export interface QSequenceBlockQRelation extends QRelation<QSequenceBlock>, QSequenceBlockQId {
}
