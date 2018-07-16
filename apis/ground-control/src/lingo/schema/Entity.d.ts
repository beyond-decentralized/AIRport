import { DatabaseObjectConfiguration } from "./DatabaseObjectConfiguration";
import { DbColumn, DbProperty, DbRelation, JsonSchemaColumn, JsonSchemaProperty, JsonSchemaRelation, SchemaReferenceByIndex } from "./Property";
import { DbSchemaVersion } from "./Schema";
export declare type EntityName = string;
export declare type TableIndex = number;
export declare type IdColumnOnlyIndex = number;
/**
 * An entity in a schema.
 * Indexed on per schema basis.
 */
export interface JsonSchemaEntity extends SchemaReferenceByIndex<TableIndex> {
    /**
     * Columns by their table column indexes.
     */
    columns: JsonSchemaColumn[];
    /**
     * References to ID columns.
     */
    idColumnRefs: SchemaReferenceByIndex<IdColumnOnlyIndex>[];
    isLocal: boolean;
    /**
     * Does this entity extend RepositoryEntity or LocalRepositoryEntity
     */
    isRepositoryEntity: boolean;
    /**
     * Name of the entity.
     */
    name: string;
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
export interface DbEntity extends SchemaReferenceByIndex<TableIndex> {
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
    isLocal: boolean;
    /**
     * Does this entity extend RepositoryEntity or LocalRepositoryEntity
     */
    isRepositoryEntity: boolean;
    /**
     * Name of the entity.
     */
    name: string;
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
}
