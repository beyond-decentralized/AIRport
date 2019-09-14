import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
import { ISchemaVersion, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation } from './qschemaversion';
export interface IVersionedSchemaObject {
    deprecatedSinceVersion?: ISchemaVersion;
    removedInVersion?: ISchemaVersion;
    sinceVersion?: ISchemaVersion;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface VersionedSchemaObjectESelect extends IEntitySelectProperties, VersionedSchemaObjectEOptionalId {
    deprecatedSinceVersion?: SchemaVersionESelect;
    removedInVersion?: SchemaVersionESelect;
    sinceVersion?: SchemaVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface VersionedSchemaObjectEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface VersionedSchemaObjectEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface VersionedSchemaObjectEUpdateProperties extends IEntityUpdateProperties {
    deprecatedSinceVersion?: SchemaVersionEOptionalId;
    removedInVersion?: SchemaVersionEOptionalId;
    sinceVersion?: SchemaVersionEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface VersionedSchemaObjectECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface VersionedSchemaObjectEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface VersionedSchemaObjectECreateProperties extends Partial<VersionedSchemaObjectEId>, VersionedSchemaObjectEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface VersionedSchemaObjectECreateColumns extends VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QVersionedSchemaObject extends IQEntity {
    deprecatedSinceVersion: QSchemaVersionQRelation;
    removedInVersion: QSchemaVersionQRelation;
    sinceVersion: QSchemaVersionQRelation;
}
export interface QVersionedSchemaObjectQId {
}
export interface QVersionedSchemaObjectQRelation<SubType extends IQEntity> extends IQRelation<SubType>, QVersionedSchemaObjectQId {
}
