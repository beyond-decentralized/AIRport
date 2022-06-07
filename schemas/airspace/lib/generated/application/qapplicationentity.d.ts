import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, TableConfiguration } from '@airport/air-traffic-control';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationVersionGraph, ApplicationVersionEOptionalId, ApplicationVersionESelect, QApplicationVersionQRelation } from './qapplicationversion';
import { ApplicationColumnGraph, ApplicationColumnESelect, QApplicationColumn } from './qapplicationcolumn';
import { ApplicationOperationGraph, ApplicationOperationESelect, QApplicationOperation } from './qapplicationoperation';
import { ApplicationPropertyGraph, ApplicationPropertyESelect, QApplicationProperty } from './qapplicationproperty';
import { ApplicationRelationGraph, ApplicationRelationESelect, QApplicationRelation } from './qapplicationrelation';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationEntityESelect extends VersionedApplicationObjectESelect, ApplicationEntityEOptionalId {
    index?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    isAirEntity?: boolean | IQBooleanField;
    name?: string | IQStringField;
    tableConfig?: TableConfiguration | IQStringField;
    applicationVersion?: ApplicationVersionESelect;
    columns?: ApplicationColumnESelect;
    operations?: ApplicationOperationESelect;
    properties?: ApplicationPropertyESelect;
    relations?: ApplicationRelationESelect;
    relationReferences?: ApplicationRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationEntityEId extends VersionedApplicationObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEntityEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationEntityEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
    index?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    isAirEntity?: boolean | IQBooleanField;
    name?: string | IQStringField;
    tableConfig?: TableConfiguration | IQStringField;
    applicationVersion?: ApplicationVersionEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationEntityGraph extends ApplicationEntityEOptionalId, VersionedApplicationObjectGraph {
    index?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    isAirEntity?: boolean | IQBooleanField;
    name?: string | IQStringField;
    tableConfig?: TableConfiguration | IQStringField;
    applicationVersion?: ApplicationVersionGraph;
    columns?: ApplicationColumnGraph[];
    operations?: ApplicationOperationGraph[];
    properties?: ApplicationPropertyGraph[];
    relations?: ApplicationRelationGraph[];
    relationReferences?: ApplicationRelationGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEntityEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
    DEPRECATED_SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_APPLICATION_VERSION_ID?: number | IQNumberField;
    SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
    TABLE_INDEX?: number | IQNumberField;
    IS_LOCAL?: boolean | IQBooleanField;
    IS_AIR_ENTITY?: boolean | IQBooleanField;
    NAME?: string | IQStringField;
    TABLE_CONFIGURATION?: string | IQStringField;
    APPLICATION_VERSION_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationEntityECreateProperties extends Partial<ApplicationEntityEId>, ApplicationEntityEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationEntityECreateColumns extends ApplicationEntityEId, ApplicationEntityEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationEntity extends QVersionedApplicationObject {
    id: IQNumberField;
    index: IQNumberField;
    isLocal: IQBooleanField;
    isAirEntity: IQBooleanField;
    name: IQStringField;
    tableConfig: IQStringField;
    applicationVersion: QApplicationVersionQRelation;
    columns: IQOneToManyRelation<QApplicationColumn>;
    operations: IQOneToManyRelation<QApplicationOperation>;
    properties: IQOneToManyRelation<QApplicationProperty>;
    relations: IQOneToManyRelation<QApplicationRelation>;
    relationReferences: IQOneToManyRelation<QApplicationRelation>;
}
export interface QApplicationEntityQId extends QVersionedApplicationObjectQId {
    id: IQNumberField;
}
export interface QApplicationEntityQRelation extends QVersionedApplicationObjectQRelation<QApplicationEntity>, QApplicationEntityQId {
}
//# sourceMappingURL=qapplicationentity.d.ts.map