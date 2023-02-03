import { DbObjectConfiguration, JsonDatabaseObjectConfiguration } from './DbObjectConfiguration'
import {
	JsonOperations
} from './JsonOperation'
import {
	DbColumn,
	DbProperty,
	DbRelation,
	JsonColumn,
	JsonProperty,
	JsonRelation,
	DbApplicationReferenceByIndex
} from './DbProperty'
import {
	DbVersionedObject,
	DbApplicationVersion,
	JsonObject
} from './DbApplication'

export type DbEntity_LocalId = number;
export type DbEntity_Name = string;
export type DbEntity_IsLocal = boolean;
export type DbEntity_IsAirEntity = boolean;
export type DbEntity_TableIndex = number;
export type DbColumn_IdIndex = number;

/**
 * An entity in a application.
 * Indexed on per application basis.
 */
export interface JsonEntity
	extends DbApplicationReferenceByIndex<DbEntity_TableIndex>,
	JsonObject {

	/**
	 * Columns by their table column indexes.
	 */
	columns: JsonColumn[];

	/**
	 * References to ID columns.
	 */
	idColumnRefs: DbApplicationReferenceByIndex<DbColumn_IdIndex>[];

	/*
	 * Is this entity local-only (does not extend AirEntity)
	 */
	isLocal: DbEntity_IsLocal;

	/**
	 * Does this entity extend AirEntity or LocalAirEntity
	 */
	isAirEntity: DbEntity_IsAirEntity;

	/**
	 * Name of the entity.
	 */
	name: DbEntity_Name;

	/**
	 * Mutation operations on the entity (and child entities)
	 */
	operations?: JsonOperations;

	/**
	 * Properties of the entity (parent properties included)
	 */
	properties: JsonProperty[];

	/**
	 * Relations by their table relation indexes.
	 */
	relations: JsonRelation[];

	/**
	 * Table configuration object.
	 */
	tableConfig: JsonDatabaseObjectConfiguration<any>;

}

/**
 * Application Entity with additional indexes (maps).
 */
export interface DbEntity
	extends DbApplicationReferenceByIndex<DbEntity_TableIndex>,
	DbVersionedObject {

	_localId: DbEntity_LocalId

	/**
	 * Map of all columns in the entity by name.
	 */
	columnMap?: { [name: string]: DbColumn };

	/**
	 * Array of all columns in the entity by index.
	 */
	columns: DbColumn[];

	/**
	 * Map of all columns in the entity by name.
	 */
	idColumnMap?: { [name: string]: DbColumn };

	/**
	 * Array of all @Id() columns in the entity by index.
	 */
	idColumns?: DbColumn[];

	/*
	 * Is this entity local-only (does not extend AirEntity)
	 */
	isLocal: DbEntity_IsLocal;

	/**
	 * Does this entity extend AirEntity or LocalAirEntity
	 */
	isAirEntity: DbEntity_IsAirEntity;

	/**
	 * Name of the entity.
	 */
	name: DbEntity_Name;

	/**
	 * Map of all properties in the entity by name.
	 */
	propertyMap?: { [name: string]: DbProperty };

	/**
	 * Array of all properties in the entity by index.
	 */
	properties: DbProperty[];

	/**
	 * Relations by their table relation indexes.
	 */
	relations?: DbRelation[];

	/**
	 * Table configuration.
	 */
	tableConfig?: DbObjectConfiguration<any>;

	/**
	 * Indexed application reference
	 */
	applicationVersion: DbApplicationVersion;

	relationReferences?: DbRelation[]

}
