import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, IQEntity, IQRelation } from '@airport/air-control';
import { IRecordHistory, RecordHistoryEId, RecordHistoryEOptionalId, RecordHistoryESelect, QRecordHistoryQId, QRecordHistoryQRelation } from './qrecordhistory';
export interface IRecordHistoryNewValue {
    columnIndex?: number;
    recordHistory?: IRecordHistory;
    newValue?: any;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryNewValueESelect extends IEntitySelectProperties, RecordHistoryNewValueEOptionalId {
    newValue?: any | IQUntypedField;
    recordHistory?: RecordHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordHistoryNewValueEId extends IEntityIdProperties {
    columnIndex: number | IQNumberField;
    recordHistory: RecordHistoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryNewValueEOptionalId {
    columnIndex?: number | IQNumberField;
    recordHistory?: RecordHistoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryNewValueEUpdateProperties extends IEntityUpdateProperties {
    newValue?: any | IQUntypedField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordHistoryNewValueEUpdateColumns extends IEntityUpdateColumns {
    NEW_VALUE?: any | IQUntypedField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordHistoryNewValueECreateProperties extends Partial<RecordHistoryNewValueEId>, RecordHistoryNewValueEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordHistoryNewValueECreateColumns extends RecordHistoryNewValueEId, RecordHistoryNewValueEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRecordHistoryNewValue extends IQEntity {
    columnIndex: IQNumberField;
    recordHistory: QRecordHistoryQRelation;
    newValue: IQUntypedField;
}
export interface QRecordHistoryNewValueQId {
    columnIndex: IQNumberField;
    recordHistory: QRecordHistoryQId;
}
export interface QRecordHistoryNewValueQRelation extends IQRelation<QRecordHistoryNewValue>, QRecordHistoryNewValueQId {
}
