import { DatabaseObjectConfiguration } from './DatabaseObjectConfiguration';
import { DbColumn, DbProperty, DbRelation, JsonSchemaColumn, JsonSchemaProperty, JsonSchemaRelation, SchemaReferenceByIndex } from './Property';
import { DbObject, DbSchemaVersion, JsonDatabaseObject } from './Schema';
export declare type EntityId = number;
export declare type EntityName = string;
export declare type EntityIsLocal = boolean;
export declare type EntityIsRepositoryEntity = boolean;
export declare type TableIndex = number;
export declare type IdColumnOnlyIndex = number;
/**
 * An entity in a schema.
 * Indexed on per schema basis.
 */
export interface JsonSchemaEntity extends SchemaReferenceByIndex<TableIndex>, JsonDatabaseObject {
    /**
     * Columns by their table column indexes.
     */
    columns: JsonSchemaColumn[];
    /**
     * References to ID columns.
     */
    idColumnRefs: SchemaReferenceByIndex<IdColumnOnlyIndex>[];
    isLocal: EntityIsLocal;
    /**
     * Does this entity extend RepositoryEntity or LocalRepositoryEntity
     */
    isRepositoryEntity: EntityIsRepositoryEntity;
    /**
     * Name of the entity.
     */
    name: EntityName;
    /**
     * Properties of the entity (parent properties included)
     */
    properties: JsonSchemaProperty[];
    /**
     * Relations by their table relation indexes.
     */
    relations: JsonSchemaRelation[];
    /**
     * Table configuration object.
     */
    tableConfig: DatabaseObjectConfiguration<any>;
}
/**
 * Schema Entity with additional indexes (maps).
 */
export interface DbEntity extends SchemaReferenceByIndex<TableIndex>, DbObject {
    id: EntityId;
    /**
     * Map of all columns in the entity by name.
     */
    columnMap?: {
        [name: string]: DbColumn;
    };
    /**
     * Array of all columns in the entity by index.
     */
    columns: DbColumn[];
    /**
     * Map of all columns in the entity by name.
     */
    idColumnMap?: {
        [name: string]: DbColumn;
    };
    /**
     * Array of all @Id() columns in the entity by index.
     */
    idColumns: DbColumn[];
    isLocal: EntityIsLocal;
    /**
     * Does this entity extend RepositoryEntity or LocalRepositoryEntity
     */
    isRepositoryEntity: EntityIsRepositoryEntity;
    /**
     * Name of the entity.
     */
    name: EntityName;
    /**
     * Map of all properties in the entity by name.
     */
    propertyMap?: {
        [name: string]: DbProperty;
    };
    /**
     * Array of all properties in the entity by index.
     */
    properties: DbProperty[];
    /**
     * Relations by their table relation indexes.
     */
    relations: DbRelation[];
    /**
     * Table configuration.
     */
    tableConfig: DatabaseObjectConfiguration<any>;
    /**
     * Indexed schema reference
     */
    schemaVersion: DbSchemaVersion;
    relationReferences: DbRelation[];
}
