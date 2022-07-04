import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { ApplicationGraph, ApplicationEId, ApplicationEOptionalId, ApplicationESelect, QApplicationQId, QApplicationQRelation } from './qapplication';
import { ApplicationVersionGraph, ApplicationVersionEId, ApplicationVersionEOptionalId, ApplicationVersionESelect, QApplicationVersionQId, QApplicationVersionQRelation } from './qapplicationversion';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationCurrentVersionESelect extends IEntitySelectProperties, ApplicationCurrentVersionEOptionalId {
    application?: ApplicationESelect;
    applicationVersion?: ApplicationVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationCurrentVersionEId extends IEntityIdProperties {
    application: ApplicationEId;
    applicationVersion: ApplicationVersionEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationCurrentVersionEOptionalId {
    application?: ApplicationEOptionalId;
    applicationVersion?: ApplicationVersionEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationCurrentVersionEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationCurrentVersionGraph extends ApplicationCurrentVersionEOptionalId, IEntityCascadeGraph {
    application?: ApplicationGraph;
    applicationVersion?: ApplicationVersionGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationCurrentVersionEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationCurrentVersionECreateProperties extends Partial<ApplicationCurrentVersionEId>, ApplicationCurrentVersionEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationCurrentVersionECreateColumns extends ApplicationCurrentVersionEId, ApplicationCurrentVersionEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationCurrentVersion extends IQEntity {
    application: QApplicationQRelation;
    applicationVersion: QApplicationVersionQRelation;
}
export interface QApplicationCurrentVersionQId {
    application: QApplicationQId;
    applicationVersion: QApplicationVersionQId;
}
export interface QApplicationCurrentVersionQRelation extends IQRelation<QApplicationCurrentVersion>, QApplicationCurrentVersionQId {
}
//# sourceMappingURL=qapplicationcurrentversion.d.ts.map