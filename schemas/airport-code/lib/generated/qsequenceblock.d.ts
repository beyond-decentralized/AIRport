import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { ISequence, SequenceEId, SequenceEOptionalId, SequenceESelect, QSequenceQId, QSequenceQRelation } from './qsequence';
export interface ISequenceBlock {
    reservationMillis?: number;
    sequence?: ISequence;
    size?: number;
    lastReservedId?: number;
    currentNumber?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceBlockESelect extends IEntitySelectProperties, SequenceBlockEOptionalId {
    size?: number | IQNumberField;
    lastReservedId?: number | IQNumberField;
    sequence?: SequenceESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId extends IEntityIdProperties {
    reservationMillis: number | IQNumberField;
    sequence: SequenceEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
    reservationMillis?: number | IQNumberField;
    sequence?: SequenceEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceBlockEUpdateProperties extends IEntityUpdateProperties {
    size?: number | IQNumberField;
    lastReservedId?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceBlockEUpdateColumns extends IEntityUpdateColumns {
    SIZE?: number | IQNumberField;
    LAST_RESERVED_ID?: number | IQNumberField;
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
    reservationMillis: IQNumberField;
    sequence: QSequenceQRelation;
    size: IQNumberField;
    lastReservedId: IQNumberField;
}
export interface QSequenceBlockQId {
    reservationMillis: IQNumberField;
    sequence: QSequenceQId;
}
export interface QSequenceBlockQRelation extends IQRelation<QSequenceBlock>, QSequenceBlockQId {
}
