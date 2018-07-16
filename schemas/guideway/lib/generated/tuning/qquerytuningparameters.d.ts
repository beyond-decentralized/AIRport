import { IEntityIdProperties, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, QEntity, QRelation } from '@airport/air-control';
export interface ITuningParameters {
    parameterGroup?: string;
    parameterName?: string;
    parameterValue?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface TuningParametersESelect extends IEntitySelectProperties, TuningParametersEOptionalId, TuningParametersEUpdate {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TuningParametersEId extends IEntityIdProperties {
    parameterGroup: string | IQStringField;
    parameterName: string | IQStringField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TuningParametersEOptionalId {
    parameterGroup?: string | IQStringField;
    parameterName?: string | IQStringField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TuningParametersEUpdate extends IEntityUpdateProperties {
    parameterValue?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TuningParametersECreate extends TuningParametersEId, TuningParametersEUpdate {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTuningParameters extends QEntity {
    parameterGroup: IQStringField;
    parameterName: IQStringField;
    parameterValue: IQStringField;
}
export interface QTuningParametersQId {
    parameterGroup: IQStringField;
    parameterName: IQStringField;
}
export interface QTuningParametersQRelation extends QRelation<QTuningParameters>, QTuningParametersQId {
}
