import { IQEntityInternal, IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
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
export interface QVersionedSchemaObject extends QEntity {
    deprecatedSinceVersion: QSchemaVersionQRelation;
    removedInVersion: QSchemaVersionQRelation;
    sinceVersion: QSchemaVersionQRelation;
}
export interface QVersionedSchemaObjectQId {
}
export interface QVersionedSchemaObjectQRelation<SubType extends IQEntityInternal> extends QRelation<SubType>, QVersionedSchemaObjectQId {
}
