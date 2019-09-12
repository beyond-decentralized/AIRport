import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
export interface ISequence {
    schemaIndex: number;
    tableIndex: number;
    columnIndex: number;
    incrementBy?: number;
    currentValue?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceESelect extends IEntitySelectProperties, SequenceEOptionalId {
    incrementBy?: number | IQNumberField;
    currentValue?: number | IQNumberField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceEId extends IEntityIdProperties {
    schemaIndex: number | IQNumberField;
    tableIndex: number | IQNumberField;
    columnIndex: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceEOptionalId {
    schemaIndex?: number | IQNumberField;
    tableIndex?: number | IQNumberField;
    columnIndex?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceEUpdateProperties extends IEntityUpdateProperties {
    incrementBy?: number | IQNumberField;
    currentValue?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SequenceECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceEUpdateColumns extends IEntityUpdateColumns {
    SEQUENCE_INCREMENT_BY?: number | IQNumberField;
    CURRENT_VALUE?: number | IQNumberField;
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
    schemaIndex: IQNumberField;
    tableIndex: IQNumberField;
    columnIndex: IQNumberField;
    incrementBy: IQNumberField;
    currentValue: IQNumberField;
}
export interface QSequenceQId {
    schemaIndex: IQNumberField;
    tableIndex: IQNumberField;
    columnIndex: IQNumberField;
}
export interface QSequenceQRelation extends IQRelation<QSequence>, QSequenceQId {
}
