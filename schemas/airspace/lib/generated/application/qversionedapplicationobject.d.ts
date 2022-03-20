import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
import { ApplicationVersionGraph, ApplicationVersionEOptionalId, ApplicationVersionESelect, QApplicationVersionQRelation } from './qapplicationversion';
/**
 * SELECT - All fields and relations (optional).
 */
export interface VersionedApplicationObjectESelect extends IEntitySelectProperties, VersionedApplicationObjectEOptionalId {
    deprecatedSinceVersion?: ApplicationVersionESelect;
    removedInVersion?: ApplicationVersionESelect;
    sinceVersion?: ApplicationVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface VersionedApplicationObjectEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface VersionedApplicationObjectEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface VersionedApplicationObjectEUpdateProperties extends IEntityUpdateProperties {
    deprecatedSinceVersion?: ApplicationVersionEOptionalId;
    removedInVersion?: ApplicationVersionEOptionalId;
    sinceVersion?: ApplicationVersionEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface VersionedApplicationObjectGraph extends VersionedApplicationObjectEOptionalId, IEntityCascadeGraph {
    deprecatedSinceVersion?: ApplicationVersionGraph;
    removedInVersion?: ApplicationVersionGraph;
    sinceVersion?: ApplicationVersionGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface VersionedApplicationObjectEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface VersionedApplicationObjectECreateProperties extends Partial<VersionedApplicationObjectEId>, VersionedApplicationObjectEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface VersionedApplicationObjectECreateColumns extends VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QVersionedApplicationObject extends IQEntity {
    deprecatedSinceVersion: QApplicationVersionQRelation;
    removedInVersion: QApplicationVersionQRelation;
    sinceVersion: QApplicationVersionQRelation;
}
export interface QVersionedApplicationObjectQId {
}
export interface QVersionedApplicationObjectQRelation<SubQType extends IQEntity> extends IQRelation<SubQType>, QVersionedApplicationObjectQId {
}
//# sourceMappingURL=qversionedapplicationobject.d.ts.map