import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
export interface ISequence {
    id?: number;
    schemaIndex?: number;
    tableIndex?: number;
    columnIndex?: number;
    incrementBy?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceESelect extends IEntitySelectProperties, SequenceEOptionalId {
    schemaIndex?: number | IQNumberField;
    tableIndex?: number | IQNumberField;
    columnIndex?: number | IQNumberField;
    incrementBy?: number | IQNumberField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceEUpdateProperties extends IEntityUpdateProperties {
    schemaIndex?: number | IQNumberField;
    tableIndex?: number | IQNumberField;
    columnIndex?: number | IQNumberField;
    incrementBy?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceEUpdateColumns extends IEntityUpdateColumns {
    SCHEMA_INDEX?: number | IQNumberField;
    TABLE_INDEX?: number | IQNumberField;
    COLUMN_INDEX?: number | IQNumberField;
    SEQUENCE_INCREMENT_BY?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SequenceECreateProperties extends Partial<SequenceEId>, SequenceEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SequenceECreateColumns extends SequenceEId, SequenceEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSequence extends IQEntity {
    id: IQNumberField;
    schemaIndex: IQNumberField;
    tableIndex: IQNumberField;
    columnIndex: IQNumberField;
    incrementBy: IQNumberField;
}
export interface QSequenceQId {
    id: IQNumberField;
}
export interface QSequenceQRelation extends IQRelation<QSequence>, QSequenceQId {
}
