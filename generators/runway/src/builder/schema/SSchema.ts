import { DbSchema } from "@airport/ground-control";
import { SEntity, SIndexedEntity } from "./SEntity";

/**
 * A schema.
 */
export interface SSchema {

	domain: 'private' | string;

	entities: SEntity[];

	/**
	 * Name of the schema.
	 */
	name: string;

	referencedSchemas: SSchemaReference[];

}

export interface SSchemaReference {

	index: number;

	dbSchema: DbSchema;
}

/**
 * A schema with additional indexes (maps).
 */
export interface SIndexedSchema {

	/**
	 * Entities by their repository table indexes.
	 */
	entities: SIndexedEntity[];

	/**
	 * Map of all entities by name.
	 */
	entityMapByName: { [entityName: string]: SIndexedEntity };

	/**
	 * Schema definition.
	 */
	schema: SSchema;

	referencedSchemasByName: { [projectName: string]: SSchemaReference };


}

export function buildIndexedSSchema(
	schema: SSchema,
	referencedSchemasByName: { [projectName: string]: SSchemaReference }
): SIndexedSchema {
	const idx: SIndexedSchema = {
		entities: [],
		entityMapByName: {},
		referencedSchemasByName,
		schema
	};

	for (const entity of schema.entities) {
		const columnMap = {};
		const propertyMap = {};
		const relationMap = {};
		const columns = [];
		const idColumns = [];
		const relations = [];
		for (const property of entity.properties) {
			propertyMap[property.name] = property;
			if (property.columns) {
				for (const column of property.columns) {
					columnMap[column.name] = column;
					columns[column.index] = column;
					if (column.idIndex || column.idIndex === 0) {
						idColumns[column.idIndex] = column;
					}
				}
			}
			if (property.relation) {
				relationMap[property.name] = property.relation;
				relations[property.relation.index] = property.relation;
			}
		}
		const indexedEntity = {
			columnMap,
			columns,
			entity,
			idColumns,
			propertyMap,
			relationMap,
			relations,
		};

		idx.entities[entity.tableIndex] = indexedEntity;
		idx.entityMapByName[entity.name] = indexedEntity;
	}

	return idx;
}