import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, TableConfiguration } from '@airport/air-control';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationVersionGraph, ApplicationVersionEOptionalId, ApplicationVersionESelect, QApplicationVersionQRelation } from './qapplicationversion';
import { ApplicationColumnGraph, ApplicationColumnESelect, QApplicationColumn } from './qapplicationcolumn';
import { ApplicationColumn } from '../../ddl/application/ApplicationColumn';
import { ApplicationOperationGraph, ApplicationOperationESelect, QApplicationOperation } from './qapplicationoperation';
import { ApplicationOperation } from '../../ddl/application/ApplicationOperation';
import { ApplicationPropertyGraph, ApplicationPropertyESelect, QApplicationProperty } from './qapplicationproperty';
import { ApplicationProperty } from '../../ddl/application/ApplicationProperty';
import { ApplicationRelationGraph, ApplicationRelationESelect, QApplicationRelation } from './qapplicationrelation';
import { ApplicationRelation } from '../../ddl/application/ApplicationRelation';
import { ApplicationEntity } from '../../ddl/application/ApplicationEntity';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationEntityESelect extends VersionedApplicationObjectESelect, ApplicationEntityEOptionalId {
    index?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    isRepositoryEntity?: boolean | IQBooleanField;
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
    isRepositoryEntity?: boolean | IQBooleanField;
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
    isRepositoryEntity?: boolean | IQBooleanField;
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
    IS_REPOSITORY_ENTITY?: boolean | IQBooleanField;
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
export interface QApplicationEntity extends QVersionedApplicationObject<ApplicationEntity> {
    id: IQNumberField;
    index: IQNumberField;
    isLocal: IQBooleanField;
    isRepositoryEntity: IQBooleanField;
    name: IQStringField;
    tableConfig: IQStringField;
    applicationVersion: QApplicationVersionQRelation;
    columns: IQOneToManyRelation<ApplicationColumn, QApplicationColumn>;
    operations: IQOneToManyRelation<ApplicationOperation, QApplicationOperation>;
    properties: IQOneToManyRelation<ApplicationProperty, QApplicationProperty>;
    relations: IQOneToManyRelation<ApplicationRelation, QApplicationRelation>;
    relationReferences: IQOneToManyRelation<ApplicationRelation, QApplicationRelation>;
}
export interface QApplicationEntityQId extends QVersionedApplicationObjectQId {
    id: IQNumberField;
}
export interface QApplicationEntityQRelation extends QVersionedApplicationObjectQRelation<ApplicationEntity, QApplicationEntity>, QApplicationEntityQId {
}
//# sourceMappingURL=qapplicationentity.d.ts.map