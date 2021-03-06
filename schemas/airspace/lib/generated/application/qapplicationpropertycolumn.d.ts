import { IQNumberField } from '@airport/tarmaq-query';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationColumnGraph, ApplicationColumnEId, ApplicationColumnEOptionalId, ApplicationColumnESelect, QApplicationColumnQId, QApplicationColumnQRelation } from './qapplicationcolumn';
import { ApplicationPropertyGraph, ApplicationPropertyEId, ApplicationPropertyEOptionalId, ApplicationPropertyESelect, QApplicationPropertyQId, QApplicationPropertyQRelation } from './qapplicationproperty';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationPropertyColumnESelect extends VersionedApplicationObjectESelect, ApplicationPropertyColumnEOptionalId {
    column?: ApplicationColumnESelect;
    property?: ApplicationPropertyESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationPropertyColumnEId extends VersionedApplicationObjectEId {
    column: ApplicationColumnEId;
    property: ApplicationPropertyEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationPropertyColumnEOptionalId {
    column?: ApplicationColumnEOptionalId;
    property?: ApplicationPropertyEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationPropertyColumnEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationPropertyColumnGraph extends ApplicationPropertyColumnEOptionalId, VersionedApplicationObjectGraph {
    column?: ApplicationColumnGraph;
    property?: ApplicationPropertyGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationPropertyColumnEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
    DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
    REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
    SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationPropertyColumnECreateProperties extends Partial<ApplicationPropertyColumnEId>, ApplicationPropertyColumnEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationPropertyColumnECreateColumns extends ApplicationPropertyColumnEId, ApplicationPropertyColumnEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationPropertyColumn extends QVersionedApplicationObject {
    column: QApplicationColumnQRelation;
    property: QApplicationPropertyQRelation;
}
export interface QApplicationPropertyColumnQId extends QVersionedApplicationObjectQId {
    column: QApplicationColumnQId;
    property: QApplicationPropertyQId;
}
export interface QApplicationPropertyColumnQRelation extends QVersionedApplicationObjectQRelation<QApplicationPropertyColumn>, QApplicationPropertyColumnQId {
}
//# sourceMappingURL=qapplicationpropertycolumn.d.ts.map