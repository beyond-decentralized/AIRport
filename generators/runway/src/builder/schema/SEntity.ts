import {DatabaseObjectConfiguration} from "@airport/ground-control";
import {
	SColumn,
	SProperty,
	SRelation
}                                    from "./SProperty";

/**
 * An entity in a schema.
 */

export interface SEntity {

	/*
	 * Is this entity local-only (does not extend RepositoryEntity)
	 */
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
	 * Number of columns in the entity.
	 */
	numColumns: number;

	/**
	 * Number of id columns in the entity.
	 */
	numIdColumns: number;

	/**
	 * Number of relations in the entity.
	 */
	numRelations: number;

	/**
	 * Properties of the entity (upstream properties included).
	 */
	properties: SProperty[];

	/**
	 * Table configuration object.
	 */
	table: DatabaseObjectConfiguration<any>;

	/**
	 * Schema specific index of the table represented by the entity.
	 */
	tableIndex: number;

}


/**
 * Schema Entity with additional indexes (maps).
 */
export interface SIndexedEntity {

	/**
	 * Map of all columns in the entity by name.
	 */
	columnMap: { [name: string]: SColumn };

	/**
	 * Columns by their column indexes.
	 */
	columns: SColumn[];

	/**
	 * Schema entity definition.
	 */
	entity: SEntity;

	/**
	 * Id columns by their Id indexes.
	 */
	idColumns: SColumn[];

	/**
	 * Map of all properties in the entity by name.
	 */
	propertyMap: { [name: string]: SProperty };

	/**
	 * Map of all relations in the entity by property name.
	 */
	relationMap: { [name: string]: SRelation };

	/**
	 * Relations, by their indexes.
	 */
	relations: SRelation[];

}
