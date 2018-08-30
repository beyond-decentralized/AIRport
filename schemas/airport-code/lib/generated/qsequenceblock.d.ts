import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISequenceConsumer, SequenceConsumerEId, SequenceConsumerEOptionalId, SequenceConsumerESelect, QSequenceConsumerQId, QSequenceConsumerQRelation } from './qsequenceconsumer';
import { ISequence, SequenceEOptionalId, SequenceESelect, QSequenceQRelation } from './qsequence';
export interface ISequenceBlock {
    id?: number;
    sequenceConsumer?: ISequenceConsumer;
    size?: number;
    lastReservedId?: number;
    reservationMillis?: number;
    sequence?: ISequence;
    currentNumber?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceBlockESelect extends IEntitySelectProperties, SequenceBlockEOptionalId {
    size?: number | IQNumberField;
    lastReservedId?: number | IQNumberField;
    reservationMillis?: number | IQNumberField;
    sequenceConsumer?: SequenceConsumerESelect;
    sequence?: SequenceESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId extends IEntityIdProperties {
    id: number | IQNumberField;
    sequenceConsumer: SequenceConsumerEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
    id?: number | IQNumberField;
    sequenceConsumer?: SequenceConsumerEOptionalId;
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
    sequenceConsumer: QSequenceConsumerQRelation;
    size: IQNumberField;
    lastReservedId: IQNumberField;
    reservationMillis: IQNumberField;
    sequence: QSequenceQRelation;
}
export interface QSequenceBlockQId {
    id: IQNumberField;
    sequenceConsumer: QSequenceConsumerQId;
}
export interface QSequenceBlockQRelation extends QRelation<QSequenceBlock>, QSequenceBlockQId {
}
