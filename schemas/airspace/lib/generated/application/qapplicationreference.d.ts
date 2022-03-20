import { IQNumberField } from '@airport/air-control';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationVersionGraph, ApplicationVersionEId, ApplicationVersionEOptionalId, ApplicationVersionESelect, QApplicationVersionQId, QApplicationVersionQRelation } from './qapplicationversion';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationReferenceESelect extends VersionedApplicationObjectESelect, ApplicationReferenceEOptionalId {
    index?: number | IQNumberField;
    ownApplicationVersion?: ApplicationVersionESelect;
    referencedApplicationVersion?: ApplicationVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationReferenceEId extends VersionedApplicationObjectEId {
    ownApplicationVersion: ApplicationVersionEId;
    referencedApplicationVersion: ApplicationVersionEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationReferenceEOptionalId {
    ownApplicationVersion?: ApplicationVersionEOptionalId;
    referencedApplicationVersion?: ApplicationVersionEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationReferenceEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
    index?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationReferenceGraph extends ApplicationReferenceEOptionalId, VersionedApplicationObjectGraph {
    index?: number | IQNumberField;
    ownApplicationVersion?: ApplicationVersionGraph;
    referencedApplicationVersion?: ApplicationVersionGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationReferenceEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
    DEPRECATED_SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_APPLICATION_VERSION_ID?: number | IQNumberField;
    SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
    APPLICATION_REFERENCE_INDEX?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationReferenceECreateProperties extends Partial<ApplicationReferenceEId>, ApplicationReferenceEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationReferenceECreateColumns extends ApplicationReferenceEId, ApplicationReferenceEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationReference extends QVersionedApplicationObject {
    ownApplicationVersion: QApplicationVersionQRelation;
    referencedApplicationVersion: QApplicationVersionQRelation;
    index: IQNumberField;
}
export interface QApplicationReferenceQId extends QVersionedApplicationObjectQId {
    ownApplicationVersion: QApplicationVersionQId;
    referencedApplicationVersion: QApplicationVersionQId;
}
export interface QApplicationReferenceQRelation extends QVersionedApplicationObjectQRelation<QApplicationReference>, QApplicationReferenceQId {
}
//# sourceMappingURL=qapplicationreference.d.ts.map