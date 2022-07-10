import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/tarmaq-query';
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
    applicationIndex: number | IQNumberField;
    tableIndex: number | IQNumberField;
    columnIndex: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceEOptionalId {
    applicationIndex?: number | IQNumberField;
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
export interface SequenceGraph extends SequenceEOptionalId, IEntityCascadeGraph {
    incrementBy?: number | IQNumberField;
    currentValue?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QSequence extends IQEntity {
    applicationIndex: IQNumberField;
    tableIndex: IQNumberField;
    columnIndex: IQNumberField;
    incrementBy: IQNumberField;
    currentValue: IQNumberField;
}
export interface QSequenceQId {
    applicationIndex: IQNumberField;
    tableIndex: IQNumberField;
    columnIndex: IQNumberField;
}
export interface QSequenceQRelation extends IQRelation<QSequence>, QSequenceQId {
}
//# sourceMappingURL=qsequence.d.ts.map