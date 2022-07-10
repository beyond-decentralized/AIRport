import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField } from '@airport/tarmaq-query';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationEntityGraph, ApplicationEntityEOptionalId, ApplicationEntityESelect, QApplicationEntityQRelation } from './qapplicationentity';
import { ApplicationPropertyColumnGraph, ApplicationPropertyColumnESelect, QApplicationPropertyColumn } from './qapplicationpropertycolumn';
import { ApplicationRelationGraph, ApplicationRelationESelect, QApplicationRelation } from './qapplicationrelation';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationPropertyESelect extends VersionedApplicationObjectESelect, ApplicationPropertyEOptionalId {
    index?: number | IQNumberField;
    name?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    entity?: ApplicationEntityESelect;
    propertyColumns?: ApplicationPropertyColumnESelect;
    relation?: ApplicationRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationPropertyEId extends VersionedApplicationObjectEId {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationPropertyEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationPropertyEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
    index?: number | IQNumberField;
    name?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    entity?: ApplicationEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationPropertyGraph extends ApplicationPropertyEOptionalId, VersionedApplicationObjectGraph {
    index?: number | IQNumberField;
    name?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    entity?: ApplicationEntityGraph;
    propertyColumns?: ApplicationPropertyColumnGraph[];
    relation?: ApplicationRelationGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationPropertyEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
    DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
    REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
    SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
    PROPERTY_INDEX?: number | IQNumberField;
    NAME?: string | IQStringField;
    IS_LID?: boolean | IQBooleanField;
    APPLICATION_ENTITY_LID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationPropertyECreateProperties extends Partial<ApplicationPropertyEId>, ApplicationPropertyEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationPropertyECreateColumns extends ApplicationPropertyEId, ApplicationPropertyEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationProperty extends QVersionedApplicationObject {
    _localId: IQNumberField;
    index: IQNumberField;
    name: IQStringField;
    isId: IQBooleanField;
    entity: QApplicationEntityQRelation;
    propertyColumns: IQOneToManyRelation<QApplicationPropertyColumn>;
    relation: IQOneToManyRelation<QApplicationRelation>;
}
export interface QApplicationPropertyQId extends QVersionedApplicationObjectQId {
    _localId: IQNumberField;
}
export interface QApplicationPropertyQRelation extends QVersionedApplicationObjectQRelation<QApplicationProperty>, QApplicationPropertyQId {
}
//# sourceMappingURL=qapplicationproperty.d.ts.map