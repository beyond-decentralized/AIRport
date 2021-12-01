import { IQNumberField } from '@airport/air-control';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationColumnGraph, ApplicationColumnEOptionalId, ApplicationColumnESelect, QApplicationColumnQRelation } from './qapplicationcolumn';
import { ApplicationRelationGraph, ApplicationRelationEOptionalId, ApplicationRelationESelect, QApplicationRelationQRelation } from './qapplicationrelation';
import { ApplicationRelationColumn } from '../../ddl/application/ApplicationRelationColumn';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationRelationColumnESelect extends VersionedApplicationObjectESelect, ApplicationRelationColumnEOptionalId {
    manyColumn?: ApplicationColumnESelect;
    oneColumn?: ApplicationColumnESelect;
    manyRelation?: ApplicationRelationESelect;
    oneRelation?: ApplicationRelationESelect;
    parentRelation?: ApplicationRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationRelationColumnEId extends VersionedApplicationObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationRelationColumnEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationRelationColumnEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
    manyColumn?: ApplicationColumnEOptionalId;
    oneColumn?: ApplicationColumnEOptionalId;
    manyRelation?: ApplicationRelationEOptionalId;
    oneRelation?: ApplicationRelationEOptionalId;
    parentRelation?: ApplicationRelationEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationRelationColumnGraph extends ApplicationRelationColumnEOptionalId, VersionedApplicationObjectGraph {
    manyColumn?: ApplicationColumnGraph;
    oneColumn?: ApplicationColumnGraph;
    manyRelation?: ApplicationRelationGraph;
    oneRelation?: ApplicationRelationGraph;
    parentRelation?: ApplicationRelationGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationRelationColumnEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    MANY_SCHEMA_COLUMN_ID?: number | IQNumberField;
    ONE_SCHEMA_COLUMN_ID?: number | IQNumberField;
    MANY_SCHEMA_RELATION_ID?: number | IQNumberField;
    ONE_SCHEMA_RELATION_ID?: number | IQNumberField;
    PARENT_RELATION_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationRelationColumnECreateProperties extends Partial<ApplicationRelationColumnEId>, ApplicationRelationColumnEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationRelationColumnECreateColumns extends ApplicationRelationColumnEId, ApplicationRelationColumnEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationRelationColumn extends QVersionedApplicationObject<ApplicationRelationColumn> {
    id: IQNumberField;
    manyColumn: QApplicationColumnQRelation;
    oneColumn: QApplicationColumnQRelation;
    manyRelation: QApplicationRelationQRelation;
    oneRelation: QApplicationRelationQRelation;
    parentRelation: QApplicationRelationQRelation;
}
export interface QApplicationRelationColumnQId extends QVersionedApplicationObjectQId {
    id: IQNumberField;
}
export interface QApplicationRelationColumnQRelation extends QVersionedApplicationObjectQRelation<ApplicationRelationColumn, QApplicationRelationColumn>, QApplicationRelationColumnQId {
}
//# sourceMappingURL=qapplicationrelationcolumn.d.ts.map