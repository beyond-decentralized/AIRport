import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { TuningParameters } from '../../ddl/tuning/TuningParameters';
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TuningParametersGraph extends TuningParametersEOptionalId, IEntityCascadeGraph {
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
export interface QTuningParameters extends IQEntity<TuningParameters> {
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
export interface QTuningParametersQRelation extends IQRelation<TuningParameters, QTuningParameters>, QTuningParametersQId {
}
//# sourceMappingURL=qtuningparameters.d.ts.map