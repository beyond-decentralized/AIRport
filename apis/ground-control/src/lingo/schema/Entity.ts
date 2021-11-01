import {DatabaseObjectConfiguration, JsonDatabaseObjectConfiguration} from './DatabaseObjectConfiguration'
import {
	DbOperation,
	JsonOperations
} from './Operation'
import {
	DbColumn,
	DbProperty,
	DbRelation,
	JsonSchemaColumn,
	JsonSchemaProperty,
	JsonSchemaRelation,
	SchemaReferenceByIndex
}                                    from './Property'
import {
	DatabaseObject,
	DbSchemaVersion,
	JsonDatabaseObject
}                                    from './Schema'

export type EntityId = number;
export type EntityName = string;
export type EntityIsLocal = boolean;
export type EntityIsRepositoryEntity = boolean;
export type TableIndex = number;
export type IdColumnOnlyIndex = number;

/**
 * An entity in a schema.
 * Indexed on per schema basis.
 */
export interface JsonSchemaEntity
	extends SchemaReferenceByIndex<TableIndex>,
	        JsonDatabaseObject {

	/**
	 * Columns by their table column indexes.
	 */
	columns: JsonSchemaColumn[];

	/**
	 * References to ID columns.
	 */
	idColumnRefs: SchemaReferenceByIndex<IdColumnOnlyIndex>[];

	/*
	 * Is this entity local-only (does not extend RepositoryEntity)
	 */
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
	properties: JsonSchemaProperty[];

	/**
	 * Relations by their table relation indexes.
	 */
	relations: JsonSchemaRelation[];

	/**
	 * Table configuration object.
	 */
	tableConfig: JsonDatabaseObjectConfiguration<any>;

}

/**
 * Schema Entity with additional indexes (maps).
 */
export interface DbEntity
	extends SchemaReferenceByIndex<TableIndex>,
	        DatabaseObject {

	id: EntityId

	/**
	 * Map of all columns in the entity by name.
	 */
	columnMap: { [name: string]: DbColumn };

	/**
	 * Array of all columns in the entity by index.
	 */
	columns: DbColumn[];

	/**
	 * Map of all columns in the entity by name.
	 */
	idColumnMap: { [name: string]: DbColumn };

	/**
	 * Array of all @Id() columns in the entity by index.
	 */
	idColumns: DbColumn[];

	/*
	 * Is this entity local-only (does not extend RepositoryEntity)
	 */
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
	operations?: DbOperation[]

	/**
	 * Map of all properties in the entity by name.
	 */
	propertyMap: { [name: string]: DbProperty };

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

	relationReferences: DbRelation[]

}
