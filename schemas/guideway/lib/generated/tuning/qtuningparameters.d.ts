import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, QEntity, QRelation } from '@airport/air-control';
export interface ITuningParameters {
    serverType?: string;
    parameterGroup?: string;
    parameterName?: string;
    parameterValue?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface TuningParametersESelect extends IEntitySelectProperties, TuningParametersEOptionalId {
    parameterValue?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TuningParametersEId extends IEntityIdProperties {
    serverType: string | IQStringField;
    parameterGroup: string | IQStringField;
    parameterName: string | IQStringField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TuningParametersEOptionalId {
    serverType?: string | IQStringField;
    parameterGroup?: string | IQStringField;
    parameterName?: string | IQStringField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TuningParametersEUpdateProperties extends IEntityUpdateProperties {
    parameterValue?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TuningParametersEUpdateColumns extends IEntityUpdateColumns {
    PARAMETER_VALUE?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TuningParametersECreateProperties extends Partial<TuningParametersEId>, TuningParametersEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TuningParametersECreateColumns extends TuningParametersEId, TuningParametersEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTuningParameters extends QEntity {
    serverType: IQStringField;
    parameterGroup: IQStringField;
    parameterName: IQStringField;
    parameterValue: IQStringField;
}
export interface QTuningParametersQId {
    serverType: IQStringField;
    parameterGroup: IQStringField;
    parameterName: IQStringField;
}
export interface QTuningParametersQRelation extends QRelation<QTuningParameters>, QTuningParametersQId {
}
