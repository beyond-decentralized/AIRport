import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField } from '@airport/air-traffic-control';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationEntityGraph, ApplicationEntityEOptionalId, ApplicationEntityESelect, QApplicationEntityQRelation } from './qapplicationentity';
import { ApplicationPropertyColumnGraph, ApplicationPropertyColumnESelect, QApplicationPropertyColumn } from './qapplicationpropertycolumn';
import { ApplicationRelationColumnGraph, ApplicationRelationColumnESelect, QApplicationRelationColumn } from './qapplicationrelationcolumn';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationColumnESelect extends VersionedApplicationObjectESelect, ApplicationColumnEOptionalId {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    notNull?: boolean | IQBooleanField;
    precision?: number | IQNumberField;
    scale?: number | IQNumberField;
    type?: string | IQStringField;
    entity?: ApplicationEntityESelect;
    propertyColumns?: ApplicationPropertyColumnESelect;
    manyRelationColumns?: ApplicationRelationColumnESelect;
    oneRelationColumns?: ApplicationRelationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationColumnEId extends VersionedApplicationObjectEId {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationColumnEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationColumnEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    notNull?: boolean | IQBooleanField;
    precision?: number | IQNumberField;
    scale?: number | IQNumberField;
    type?: string | IQStringField;
    entity?: ApplicationEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationColumnGraph extends ApplicationColumnEOptionalId, VersionedApplicationObjectGraph {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    notNull?: boolean | IQBooleanField;
    precision?: number | IQNumberField;
    scale?: number | IQNumberField;
    type?: string | IQStringField;
    entity?: ApplicationEntityGraph;
    propertyColumns?: ApplicationPropertyColumnGraph[];
    manyRelationColumns?: ApplicationRelationColumnGraph[];
    oneRelationColumns?: ApplicationRelationColumnGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationColumnEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
    DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
    REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
    SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
    COLUMN_INDEX?: number | IQNumberField;
    ID_INDEX?: number | IQNumberField;
    IS_GENERATED?: boolean | IQBooleanField;
    ALLOCATION_SIZE?: number | IQNumberField;
    NAME?: string | IQStringField;
    NOT_NULL?: boolean | IQBooleanField;
    PRECISION?: number | IQNumberField;
    SCALE?: number | IQNumberField;
    TYPE?: string | IQStringField;
    APPLICATION_ENTITY_LID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationColumnECreateProperties extends Partial<ApplicationColumnEId>, ApplicationColumnEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationColumnECreateColumns extends ApplicationColumnEId, ApplicationColumnEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationColumn extends QVersionedApplicationObject {
    _localId: IQNumberField;
    index: IQNumberField;
    idIndex: IQNumberField;
    isGenerated: IQBooleanField;
    allocationSize: IQNumberField;
    name: IQStringField;
    notNull: IQBooleanField;
    precision: IQNumberField;
    scale: IQNumberField;
    type: IQStringField;
    entity: QApplicationEntityQRelation;
    propertyColumns: IQOneToManyRelation<QApplicationPropertyColumn>;
    manyRelationColumns: IQOneToManyRelation<QApplicationRelationColumn>;
    oneRelationColumns: IQOneToManyRelation<QApplicationRelationColumn>;
}
export interface QApplicationColumnQId extends QVersionedApplicationObjectQId {
    _localId: IQNumberField;
}
export interface QApplicationColumnQRelation extends QVersionedApplicationObjectQRelation<QApplicationColumn>, QApplicationColumnQId {
}
//# sourceMappingURL=qapplicationcolumn.d.ts.map