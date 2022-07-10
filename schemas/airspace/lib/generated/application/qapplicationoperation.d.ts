import { IQNumberField, IQStringField } from '@airport/tarmaq-query';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { Operation_Rule } from '@airport/ground-control';
import { ApplicationEntityGraph, ApplicationEntityEOptionalId, ApplicationEntityESelect, QApplicationEntityQRelation } from './qapplicationentity';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationOperationESelect extends VersionedApplicationObjectESelect, ApplicationOperationEOptionalId {
    type?: number | IQNumberField;
    name?: string | IQStringField;
    rule?: Operation_Rule | IQStringField;
    entity?: ApplicationEntityESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationOperationEId extends VersionedApplicationObjectEId {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationOperationEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationOperationEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
    type?: number | IQNumberField;
    name?: string | IQStringField;
    rule?: Operation_Rule | IQStringField;
    entity?: ApplicationEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationOperationGraph extends ApplicationOperationEOptionalId, VersionedApplicationObjectGraph {
    type?: number | IQNumberField;
    name?: string | IQStringField;
    rule?: Operation_Rule | IQStringField;
    entity?: ApplicationEntityGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationOperationEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
    DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
    REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
    SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
    TYPE?: number | IQNumberField;
    NAME?: string | IQStringField;
    RULE?: string | IQStringField;
    APPLICATION_ENTITY_LID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationOperationECreateProperties extends Partial<ApplicationOperationEId>, ApplicationOperationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationOperationECreateColumns extends ApplicationOperationEId, ApplicationOperationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationOperation extends QVersionedApplicationObject {
    _localId: IQNumberField;
    type: IQNumberField;
    name: IQStringField;
    rule: IQStringField;
    entity: QApplicationEntityQRelation;
}
export interface QApplicationOperationQId extends QVersionedApplicationObjectQId {
    _localId: IQNumberField;
}
export interface QApplicationOperationQRelation extends QVersionedApplicationObjectQRelation<QApplicationOperation>, QApplicationOperationQId {
}
//# sourceMappingURL=qapplicationoperation.d.ts.map