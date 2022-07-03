import {DatabaseObjectConfiguration, JsonDatabaseObjectConfiguration} from './DatabaseObjectConfiguration'
import {
	DbOperation,
	JsonOperations
} from './Operation'
import {
	DbColumn,
	DbProperty,
	DbRelation,
	JsonApplicationColumn,
	JsonApplicationProperty,
	JsonApplicationRelation,
	ApplicationReferenceByIndex
}                                    from './Property'
import {
	DatabaseObject,
	DbApplicationVersion,
	JsonDatabaseObject
}                                    from './Application'

export type ApplicationEntity_LocalId = number;
export type ApplicationEntity_Name = string;
export type ApplicationEntity_IsLocal = boolean;
export type ApplicationEntity_IsAirEntity = boolean;
export type ApplicationEntity_TableIndex = number;
export type ApplicationColumn_IdIndex = number;

/**
 * An entity in a application.
 * Indexed on per application basis.
 */
export interface JsonApplicationEntity
	extends ApplicationReferenceByIndex<ApplicationEntity_TableIndex>,
	        JsonDatabaseObject {

	/**
	 * Columns by their table column indexes.
	 */
	columns: JsonApplicationColumn[];

	/**
	 * References to ID columns.
	 */
	idColumnRefs: ApplicationReferenceByIndex<ApplicationColumn_IdIndex>[];

	/*
	 * Is this entity local-only (does not extend AirEntity)
	 */
	isLocal: ApplicationEntity_IsLocal;

	/**
	 * Does this entity extend AirEntity or LocalAirEntity
	 */
	isAirEntity: ApplicationEntity_IsAirEntity;

	/**
	 * Name of the entity.
	 */
	name: ApplicationEntity_Name;

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
export interface DbEntity
	extends ApplicationReferenceByIndex<ApplicationEntity_TableIndex>,
	        DatabaseObject {

	id: ApplicationEntity_LocalId

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
	 * Is this entity local-only (does not extend AirEntity)
	 */
	isLocal: ApplicationEntity_IsLocal;

	/**
	 * Does this entity extend AirEntity or LocalAirEntity
	 */
	isAirEntity: ApplicationEntity_IsAirEntity;

	/**
	 * Name of the entity.
	 */
	name: ApplicationEntity_Name;

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
	 * Indexed application reference
	 */
	applicationVersion: DbApplicationVersion;

	relationReferences: DbRelation[]

}
