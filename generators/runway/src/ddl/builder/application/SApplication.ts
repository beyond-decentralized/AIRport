import { DbApplication } from '@airport/ground-control';
import {
	SEntity,
	SIndexedEntity
}                   from './SEntity';

/**
 * A application.
 */
export interface SApplication {

	domain: 'private' | string;

	entities: SEntity[];

	/**
	 * Name of the application.
	 */
	name: string;

	packageName: string;

	referencedApplications: SApplicationReference[];

}

export interface SApplicationReference {

	index: number;

	dbApplication: DbApplication;
}

/**
 * A application with additional indexes (maps).
 */
export interface SIndexedApplication {

	/**
	 * Entities by their repository table indexes.
	 */
	entities: SIndexedEntity[];

	/**
	 * Map of all entities by name.
	 */
	entityMapByName: { [entityName: string]: SIndexedEntity };

	/**
	 * Application definition.
	 */
	application: SApplication;

	referencedApplicationsByName: { [projectName: string]: SApplicationReference };

}

export function buildIndexedSApplication(
	application: SApplication,
	referencedApplicationsByName: { [projectName: string]: SApplicationReference }
): SIndexedApplication {
	const idx: SIndexedApplication = {
		entities: [],
		entityMapByName: {},
		referencedApplicationsByName,
		application
	};

	for (const entity of application.entities) {
		const columnMap   = {};
		const propertyMap = {};
		const relationMap = {};
		const columns     = [];
		const idColumns   = [];
		const relations   = [];
		for (const property of entity.properties) {
			propertyMap[property.name] = property;
			if (property.columns) {
				for (const column of property.columns) {
					columnMap[column.name] = column;
					columns[column.index]  = column;
					if (column.idIndex || column.idIndex === 0) {
						idColumns[column.idIndex] = column;
					}
				}
			}
			if (property.relation) {
				relationMap[property.name]         = property.relation;
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

		idx.entities[entity.entityIndex]  = indexedEntity;
		idx.entityMapByName[entity.name] = indexedEntity;
	}

	return idx;
}
