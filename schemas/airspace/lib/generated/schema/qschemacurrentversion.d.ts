import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
import { SchemaGraph, SchemaEId, SchemaEOptionalId, SchemaESelect, QSchemaQId, QSchemaQRelation } from './qschema';
import { SchemaVersionGraph, SchemaVersionEId, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQId, QSchemaVersionQRelation } from './qschemaversion';
import { SchemaCurrentVersion } from '../../ddl/schema/SchemaCurrentVersion';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaCurrentVersionESelect extends IEntitySelectProperties, SchemaCurrentVersionEOptionalId {
    schema?: SchemaESelect;
    schemaVersion?: SchemaVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaCurrentVersionEId extends IEntityIdProperties {
    schema: SchemaEId;
    schemaVersion: SchemaVersionEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaCurrentVersionEOptionalId {
    schema?: SchemaEOptionalId;
    schemaVersion?: SchemaVersionEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaCurrentVersionEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaCurrentVersionGraph extends SchemaCurrentVersionEOptionalId, IEntityCascadeGraph {
    schema?: SchemaGraph;
    schemaVersion?: SchemaVersionGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaCurrentVersionEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaCurrentVersionECreateProperties extends Partial<SchemaCurrentVersionEId>, SchemaCurrentVersionEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaCurrentVersionECreateColumns extends SchemaCurrentVersionEId, SchemaCurrentVersionEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaCurrentVersion extends IQEntity<SchemaCurrentVersion> {
    schema: QSchemaQRelation;
    schemaVersion: QSchemaVersionQRelation;
}
export interface QSchemaCurrentVersionQId {
    schema: QSchemaQId;
    schemaVersion: QSchemaVersionQId;
}
export interface QSchemaCurrentVersionQRelation extends IQRelation<SchemaCurrentVersion, QSchemaCurrentVersion>, QSchemaCurrentVersionQId {
}
//# sourceMappingURL=qschemacurrentversion.d.ts.map