import { DatabaseObjectConfiguration, JsonDatabaseObjectConfiguration } from './DatabaseObjectConfiguration';
import { DbOperation, JsonOperations } from './Operation';
import { DbColumn, DbProperty, DbRelation, JsonApplicationColumn, JsonApplicationProperty, JsonApplicationRelation, ApplicationReferenceByIndex } from './Property';
import { DatabaseObject, DbApplicationVersion, JsonDatabaseObject } from './Application';
export declare type EntityId = number;
export declare type EntityName = string;
export declare type EntityIsLocal = boolean;
export declare type EntityIsRepositoryEntity = boolean;
export declare type TableIndex = number;
export declare type IdColumnOnlyIndex = number;
/**
 * An entity in a application.
 * Indexed on per application basis.
 */
export interface JsonApplicationEntity extends ApplicationReferenceByIndex<TableIndex>, JsonDatabaseObject {
    /**
     * Columns by their table column indexes.
     */
    columns: JsonApplicationColumn[];
    /**
     * References to ID columns.
     */
    idColumnRefs: ApplicationReferenceByIndex<IdColumnOnlyIndex>[];
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
     * Mutation operations on the entity (and child entities)
     */
    operations?: JsonOperations;
    /**
     * Properties of the entity (parent properties included)
     */
    properties: JsonApplicationProperty[];
    /**
     * Relations by their table relation indexes.
     */
    relations: JsonApplicationRelation[];
    /**
     * Table configuration object.
     */
    tableConfig: JsonDatabaseObjectConfiguration<any>;
}
/**
 * Application Entity with additional indexes (maps).
 */
export interface DbEntity extends ApplicationReferenceByIndex<TableIndex>, DatabaseObject {
    id: EntityId;
    /**
     * Map of all columns in the entity by name.
     */
    columnMap: {
        [name: string]: DbColumn;
    };
    /**
     * Array of all columns in the entity by index.
     */
    columns: DbColumn[];
    /**
     * Map of all columns in the entity by name.
     */
    idColumnMap: {
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
     * Operations that can be peformed on this entity.
     */
    operations?: DbOperation[];
    /**
     * Map of all properties in the entity by name.
     */
    propertyMap: {
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
     * Indexed application reference
     */
    applicationVersion: DbApplicationVersion;
    relationReferences: DbRelation[];
}
//# sourceMappingURL=Entity.d.ts.map