import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { ISequence, SequenceEOptionalId, SequenceESelect, QSequenceQRelation } from './qsequence';
export interface ISequenceBlock {
    id?: number;
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
    sequence?: SequenceESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
    id?: number | IQNumberField;
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
    SCHEMA_INDEX?: number | IQNumberField;
    TABLE_INDEX?: number | IQNumberField;
    COLUMN_INDEX?: number | IQNumberField;
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
export interface QSequenceBlock extends IQEntity {
    id: IQNumberField;
    size: IQNumberField;
    lastReservedId: IQNumberField;
    reservationMillis: IQNumberField;
    sequence: QSequenceQRelation;
}
export interface QSequenceBlockQId {
    id: IQNumberField;
}
export interface QSequenceBlockQRelation extends IQRelation<QSequenceBlock>, QSequenceBlockQId {
}
