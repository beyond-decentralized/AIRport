import { DI }              from '@airport/di';
import {
	DomainName,
	ensureChildArray,
	getSchemaName,
	IdColumnOnlyIndex,
	JsonSchema,
	SchemaName,
	SchemaStatus
}                          from '@airport/ground-control';
import {
	DdlObjects,
	IDdlObjectRetriever
}                          from '@airport/takeoff';
import { ITerminalStore }  from '@airport/terminal-map';
import { IDomain }         from '@airport/territory';
import {
	ISchema,
	ISchemaColumn,
	ISchemaCurrentVersion,
	ISchemaEntity,
	ISchemaProperty,
	ISchemaPropertyColumn,
	ISchemaReference,
	ISchemaRelation,
	ISchemaRelationColumn,
	ISchemaVersion
}                          from '@airport/traffic-pattern';
import { ISchemaLocator }  from '../locator/SchemaLocator';
import { SCHEMA_COMPOSER } from '../tokens';

export interface ISchemaComposer {

	compose(
		jsonSchemas: JsonSchema[],
		ddlObjectRetriever: IDdlObjectRetriever,
		schemaLocator: ISchemaLocator,
		terminalStore: ITerminalStore
	): DdlObjects;

}

export class SchemaComposer
	implements ISchemaComposer {

	compose(
		jsonSchemas: JsonSchema[],
		ddlObjectRetriever: IDdlObjectRetriever,
		schemaLocator: ISchemaLocator,
		terminalStore: ITerminalStore
	): DdlObjects {
		const domainSet: Set<DomainName>                       = new Set();
		const jsonSchemaMapByName: Map<SchemaName, JsonSchema> = new Map();

		for (const jsonSchema of jsonSchemas) {
			domainSet.add(jsonSchema.domain);
			jsonSchemaMapByName.set(getSchemaName(jsonSchema), jsonSchema);
		}

		const allSchemaVersionsByIds = [...terminalStore.getAllSchemaVersionsByIds()];

		const {
			      domainMapByName,
			      allDomains,
			      newDomains
		      } = this.composeDomains(domainSet,
			ddlObjectRetriever, terminalStore);
		const {
			      allSchemas,
			      newSchemaMapByName,
			      newSchemas
		      } = this.composeSchemas(domainMapByName, jsonSchemaMapByName,
			ddlObjectRetriever, terminalStore);
		const {
			      newLatestSchemaVersions,
			      newSchemaVersionMapBySchemaName,
			      newSchemaVersions
		      } = this.composeSchemaVersions(
			jsonSchemaMapByName, newSchemaMapByName, ddlObjectRetriever);
		const {
			      newSchemaReferenceMap,
			      newSchemaReferences
		      } = this.composeSchemaReferences(jsonSchemaMapByName,
			newSchemaVersionMapBySchemaName, schemaLocator, terminalStore);
		const {
			      newEntitiesMapBySchemaName,
			      newEntities
		      } = this.composeSchemaEntities(jsonSchemaMapByName,
			newSchemaVersionMapBySchemaName, ddlObjectRetriever);
		const {
			      newProperties,
			      newPropertiesMap
		      } = this.composeSchemaProperties(
			jsonSchemaMapByName, newEntitiesMapBySchemaName, ddlObjectRetriever);
		const {
			      newRelations,
			      newRelationsMap
		      } = this.composeSchemaRelations(
			jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap,
			newSchemaReferenceMap, ddlObjectRetriever, terminalStore);
		const {
			      newColumns,
			      newColumnsMap,
			      newPropertyColumns
		      } = this.composeSchemaColumns(
			jsonSchemaMapByName, newEntitiesMapBySchemaName,
			newPropertiesMap, ddlObjectRetriever);

		const newRelationColumns = this.composeSchemaRelationColumns(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName,
			newSchemaReferenceMap, newRelationsMap,
			newColumnsMap, ddlObjectRetriever, terminalStore);

		return {
			allDomains,
			allSchemas,
			allSchemaVersionsByIds,
			columns: newColumns,
			domains: newDomains,
			entities: newEntities,
			latestSchemaVersions: newLatestSchemaVersions,
			properties: newProperties,
			propertyColumns: newPropertyColumns,
			relationColumns: newRelationColumns,
			relations: newRelations,
			schemaReferences: newSchemaReferences,
			schemas: newSchemas,
			schemaVersions: newSchemaVersions
		};
	}

	getExistingLatestSchemaVersion(
		referencedSchemaName: SchemaName,
		terminalStore: ITerminalStore
	): ISchemaVersion {
		const referencedSchemaVersion = terminalStore
			.getLatestSchemaVersionMapBySchemaName().get(referencedSchemaName);
		if (!referencedSchemaVersion) {
			throw new Error(`Cannot find schema "${referencedSchemaName}".`);
		}

		return referencedSchemaVersion;
	}

	private composeDomains(
		domainNameSet: Set<DomainName>,
		ddlObjectRetriever: IDdlObjectRetriever,
		terminalStore: ITerminalStore,
	): {
		domainMapByName: Map<DomainName, IDomain>,
		allDomains: IDomain[],
		newDomains: IDomain[]
	} {
		const allDomains: IDomain[] = [];
		const existingDomains       = terminalStore.getDomains();

		const domainMapByName: Map<DomainName, IDomain> = new Map();
		for (const domain of existingDomains) {
			if (domainNameSet.has(domain.name)) {
				domainMapByName.set(domain.name, domain);
			}
		}

		const newDomains: IDomain[] = [];
		for (const domainName of domainNameSet) {
			const existingDomain = domainMapByName.get(domainName);
			if (existingDomain) {
				allDomains.push(existingDomain);
				// continue
			} else {
				const domain: IDomain = {
					id: ++ddlObjectRetriever.lastIds.domains,
					name: domainName,
					schemas: []
				};
				domainMapByName.set(domain.name, domain);
				allDomains.push(domain);
				newDomains.push(domain);
			}
		}

		return {
			allDomains,
			domainMapByName,
			newDomains
		};
	}

	private composeSchemas(
		domainMapByName: Map<DomainName, IDomain>,
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		ddlObjectRetriever: IDdlObjectRetriever,
		terminalStore: ITerminalStore,
	): {
		allSchemas: ISchema[],
		newSchemaMapByName: Map<SchemaName, ISchema>,
		newSchemas: ISchema[]
	} {
		const schemaMapByName: Map<SchemaName, ISchema>    = new Map();
		const newSchemaMapByName: Map<SchemaName, ISchema> = new Map();
		const allSchemas                                   = terminalStore.getSchemas();
		for (const schema of allSchemas) {
			schemaMapByName.set(schema.name, schema);
		}

		const newSchemas: ISchema[] = [];
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			if (schemaMapByName.has(schemaName)) {
				continue;
			}
			const domain          = domainMapByName.get(jsonSchema.domain);
			const schema: ISchema = {
				domain,
				index: ++ddlObjectRetriever.lastIds.schemas,
				name: schemaName,
				packageName: jsonSchema.name,
				scope: 'public',
				status: SchemaStatus.CURRENT,
			};
			allSchemas.push(schema);
			newSchemas.push(schema);
			newSchemaMapByName.set(schema.name, schema);
		}

		return {
			allSchemas,
			newSchemaMapByName,
			newSchemas
		};
	}

	private composeSchemaVersions(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaMapByName: Map<SchemaName, ISchema>,
		ddlObjectRetriever: IDdlObjectRetriever
	): {
		newLatestSchemaVersions: ISchemaVersion[],
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		newSchemaVersions: ISchemaVersion[]
	} {
		// Schema versions are guaranteed to be new
		const newSchemaVersions: ISchemaVersion[]                              = [];
		const newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map();
		const newLatestSchemaVersions: ISchemaVersion[]                        = [];

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const schema = newSchemaMapByName.get(schemaName);
			let newSchemaVersion: ISchemaVersion;
			for (const schemaVersion of jsonSchema.versions) {
				const versionParts    = schemaVersion.versionString.split('.');
				newSchemaVersion      = {
					id: ++ddlObjectRetriever.lastIds.schemaVersions,
					integerVersion: schemaVersion.integerVersion,
					versionString: schemaVersion.versionString,
					majorVersion: parseInt(versionParts[0]),
					minorVersion: parseInt(versionParts[1]),
					patchVersion: parseInt(versionParts[2]),
					schema,
					// entities: [],
					// references: [],
					// referencedBy: [],
					// entityMapByName: {},
					// referencesMapByName: {},
					// referencedByMapByName: {},
				};
				// schema.versions                        = [newSchemaVersion]
				newSchemaVersions.push(newSchemaVersion);
			}
			let newSchemaCurrentVersion: ISchemaCurrentVersion = {
				schema,
				schemaVersion: newSchemaVersion
			}
			// needed for normalOperation only
			schema.currentVersion = [newSchemaCurrentVersion];

			newLatestSchemaVersions.push(newSchemaVersion);
			newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion);
		}

		return {
			newLatestSchemaVersions,
			newSchemaVersionMapBySchemaName,
			newSchemaVersions
		};
	}

	private composeSchemaReferences(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		schemaLocator: ISchemaLocator,
		terminalStore: ITerminalStore
	): {
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		newSchemaReferences: ISchemaReference[]
	} {
		const newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]> = new Map();

		const newSchemaReferences: ISchemaReference[] = [];
		for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
			const schema     = ownSchemaVersion.schema;
			const jsonSchema = jsonSchemaMapByName.get(schema.name);
			const lastJsonSchemaVersion
			                 = jsonSchema.versions[jsonSchema.versions.length - 1];
			const schemaReferences: ISchemaReference[]
			                 = ensureChildArray(newSchemaReferenceMap, schemaName);

			for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
				const referencedSchemaName  = getSchemaName(jsonReferencedSchema);
				let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(referencedSchemaName);
				if (!referencedSchemaVersion) {
					referencedSchemaVersion = schemaLocator.locateLatestSchemaVersionBySchemaName(
						referencedSchemaName, terminalStore);
					if (!referencedSchemaVersion) {
						throw new Error(`Could not locate schema:
						${referencedSchemaName}
						in either existing schemas or schemas being currently processed`);
					}
				}
				const schemaReference: ISchemaReference = {
					index: jsonReferencedSchema.index,
					ownSchemaVersion,
					referencedSchemaVersion
				};
				newSchemaReferences.push(schemaReference);
				schemaReferences.push(schemaReference);
			}
		}

		return {
			newSchemaReferenceMap,
			newSchemaReferences
		};
	}

	private composeSchemaEntities(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		ddlObjectRetriever: IDdlObjectRetriever
	): {
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newEntities: ISchemaEntity[]
	} {
		const newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]> = new Map();

		const newEntities: ISchemaEntity[] = [];
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			let index                                = 0;
			// TODO: verify that jsonSchema.versions is always ordered ascending
			const currentSchemaVersion               = jsonSchema.versions[jsonSchema.versions.length - 1];
			const jsonEntities                       = currentSchemaVersion.entities;
			const newSchemaEntities: ISchemaEntity[] = [];
			const schemaVersion                      = newSchemaVersionMapBySchemaName.get(schemaName);
			for (const jsonEntity of jsonEntities) {
				const entity: ISchemaEntity = {
					id: ++ddlObjectRetriever.lastIds.entities,
					index: index++,
					schemaVersion,
					isLocal: jsonEntity.isLocal,
					isRepositoryEntity: jsonEntity.isRepositoryEntity,
					name: jsonEntity.name,
					tableConfig: jsonEntity.tableConfig,
					// columns: [],
					// columnMap: {},
					// idColumns: [],
					// idColumnMap: {},
					// relations: [],
					// properties: [],
					// propertyMap: {}
				};
				// schemaVersion.entities.push(entity)
				newSchemaEntities.push(entity);
				newEntities.push(entity);
			}
			newEntitiesMapBySchemaName.set(schemaName, newSchemaEntities);
			schemaVersion.entities = newSchemaEntities;
		}

		return {
			newEntitiesMapBySchemaName,
			newEntities
		};
	}

	private composeSchemaProperties(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		ddlObjectRetriever: IDdlObjectRetriever
	): {
		newProperties: ISchemaProperty[],
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>
	} {
		const newProperties: ISchemaProperty[]                       = [];
		const newPropertiesMap: Map<SchemaName, ISchemaProperty[][]> = new Map();

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
			const jsonEntities         = currentSchemaVersion.entities;
			const entities             = newEntitiesMapBySchemaName.get(schemaName);
			const propertiesByEntityIndex
			                           = ensureChildArray(newPropertiesMap, schemaName);
			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const entity = entities[tableIndex];
				const propertiesForEntity
				             = [];
				propertiesByEntityIndex[tableIndex]
				             = propertiesForEntity;
				let index    = 0;

				for (const jsonProperty of jsonEntity.properties) {
					const property: ISchemaProperty = {
						id: ++ddlObjectRetriever.lastIds.properties,
						index,
						entity,
						name: jsonProperty.name,
						isId: jsonProperty.isId,
						// propertyColumns: []
					};
					// entity.properties.push(property)
					// entity.propertyMap[property.name] = property
					propertiesForEntity[index] = property;
					index++;
					newProperties.push(property);
				}
			});
		}

		return {
			newProperties,
			newPropertiesMap
		};
	}

	private composeSchemaRelations(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>,
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		ddlObjectRetriever: IDdlObjectRetriever,
		terminalStore: ITerminalStore
	): {
		newRelations: ISchemaRelation[],
		newRelationsMap: Map<SchemaName, ISchemaRelation[][]>
	} {
		const newRelations: ISchemaRelation[]                       = [];
		const newRelationsMap: Map<SchemaName, ISchemaRelation[][]> = new Map();

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
			const jsonEntities         = currentSchemaVersion.entities;
			const entitiesForSchema    = newEntitiesMapBySchemaName.get(schemaName);
			const propertiesByEntityIndex
			                           = newPropertiesMap.get(schemaName);
			const relationsByEntityIndex
			                           = ensureChildArray(newRelationsMap, schemaName);
			const referencesForSchema  = newSchemaReferenceMap.get(schemaName);

			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const propertiesForEntity
					           = propertiesByEntityIndex[tableIndex];
				const relationsForEntity
					           = [];
				relationsByEntityIndex[tableIndex]
					           = relationsForEntity;
				const entity = entitiesForSchema[tableIndex];
				let index    = 0;

				const relations: ISchemaRelation[] = [];
				for (const jsonRelation of jsonEntity.relations) {
					const property = propertiesForEntity[jsonRelation.propertyRef.index];

					let referencedSchemaName = schemaName;
					if (jsonRelation.relationTableSchemaIndex
						|| jsonRelation.relationTableSchemaIndex === 0) {
						const schemaReference = referencesForSchema[jsonRelation.relationTableSchemaIndex];
						referencedSchemaName  = schemaReference.referencedSchemaVersion.schema.name;
					}

					let entitiesArray = newEntitiesMapBySchemaName.get(referencedSchemaName);

					if (!entitiesArray) {
						entitiesArray = this.getExistingLatestSchemaVersion(
							referencedSchemaName, terminalStore).entities;
					}

					const relationEntity = entitiesArray[jsonRelation.relationTableIndex];

					const relation: ISchemaRelation = {
						entity,
						id: ++ddlObjectRetriever.lastIds.relations,
						index,
						foreignKey: jsonRelation.foreignKey,
						isId: property.isId,
						manyToOneElems: <any>jsonRelation.manyToOneElems,
						property,
						oneToManyElems: jsonRelation.oneToManyElems,
						relationEntity,
						relationType: jsonRelation.relationType,
						// oneRelationColumns: [],
						// manyRelationColumns: []
					};
					// property.relation               = [relation]
					// relationEntity.relations.push(relation)
					relationsForEntity[index] = relation;
					index++;
					relations.push(relation);
					newRelations.push(relation);
				}
			});
		}

		return {
			newRelations,
			newRelationsMap
		};
	}

	private composeSchemaColumns(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>,
		ddlObjectRetriever: IDdlObjectRetriever
	): {
		newColumns: ISchemaColumn[],
		newColumnsMap: Map<SchemaName, ISchemaColumn[][]>,
		newPropertyColumns: ISchemaPropertyColumn[]
	} {
		const newColumnsMap: Map<SchemaName, ISchemaColumn[][]> = new Map();

		const newColumns: ISchemaColumn[]                 = [];
		const newPropertyColumns: ISchemaPropertyColumn[] = [];

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const columnsByTable: ISchemaColumn[][] = [];
			newColumnsMap.set(schemaName, columnsByTable);
			const entitiesForSchema    = newEntitiesMapBySchemaName.get(schemaName);
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
			const jsonEntities         = currentSchemaVersion.entities;
			const propertiesForSchema  = newPropertiesMap.get(schemaName);

			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const entity                               = entitiesForSchema[tableIndex];
				const columnsForTable: ISchemaColumn[]     = [];
				columnsByTable[tableIndex]                 = columnsForTable;
				const idColumnIndexes: IdColumnOnlyIndex[] = [];
				jsonEntity.idColumnRefs.forEach((
					idColumnRef,
					idColumnIndex
				) => {
					idColumnIndexes[idColumnRef.index] = idColumnIndex;
				});
				const propertiesForEntity = propertiesForSchema[tableIndex];

				jsonEntity.columns.forEach((
					jsonColumn,
					index
				) => {
					const idColumndIndex        = idColumnIndexes[index];
					const column: ISchemaColumn = {
						allocationSize: jsonColumn.allocationSize,
						entity,
						id: ++ddlObjectRetriever.lastIds.columns,
						idIndex: idColumndIndex,
						index,
						isGenerated: jsonColumn.isGenerated,
						manyRelationColumns: [],
						name: jsonColumn.name,
						notNull: jsonColumn.notNull,
						oneRelationColumns: [],
						precision: jsonColumn.precision,
						propertyColumns: [],
						scale: jsonColumn.scale,
						type: jsonColumn.type,
						// propertyColumns: [],
						// oneRelationColumns: [],
						// manyRelationColumns: []
					};
					columnsForTable[index]      = column;
					newColumns.push(column);
					// entity.columns.push(column)
					// entity.columnMap[column.name] = column

					// if (idColumndIndex || idColumndIndex === 0) {
					// 	entity.idColumns[idColumndIndex] = column
					// 	entity.idColumnMap[column.name]  = column
					// }

					jsonColumn.propertyRefs.forEach((
						propertyReference
					) => {
						const property                              = propertiesForEntity[propertyReference.index];
						const propertyColumn: ISchemaPropertyColumn = {
							column,
							property
						};
						newPropertyColumns.push(propertyColumn);
						// column.propertyColumns.push(propertyColumn)
						// property.propertyColumns.push(propertyColumn)
					});
				});
			});
		}

		return {
			newColumns,
			newColumnsMap,
			newPropertyColumns
		};
	}

	private composeSchemaRelationColumns(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		newRelationsMap: Map<SchemaName, ISchemaRelation[][]>,
		newColumnsMap: Map<SchemaName, ISchemaColumn[][]>,
		ddlObjectRetriever: IDdlObjectRetriever,
		terminalStore: ITerminalStore
	): ISchemaRelationColumn[] {
		const newRelationColumns: ISchemaRelationColumn[] = [];

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion      = jsonSchema.versions[jsonSchema.versions.length - 1];
			const jsonEntities              = currentSchemaVersion.entities;
			const columnsForSchema          = newColumnsMap.get(schemaName);
			const relationsForSchema        = newRelationsMap.get(schemaName);
			const schemaReferencesForSchema = newSchemaReferenceMap.get(schemaName);

			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const columnsForEntity   = columnsForSchema[tableIndex];
				const relationsForEntity = relationsForSchema[tableIndex];

				jsonEntity.columns.forEach((
					jsonColumn,
					index
				) => {
					const manyColumn                               = columnsForEntity[index];
					const relationColumns: ISchemaRelationColumn[] = [];

					jsonColumn.manyRelationColumnRefs.forEach((
						jsonRelationColumn
					) => {
						const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex];
						// if (!manyRelation.manyRelationColumns) {
						// 	manyRelation.manyRelationColumns = []
						// }
						let oneRelationSchemaVersion: ISchemaVersion;

						if (jsonRelationColumn.oneSchemaIndex
							|| jsonRelationColumn.oneSchemaIndex === 0) {
							const schemaReference    = schemaReferencesForSchema[jsonRelationColumn.oneSchemaIndex];
							oneRelationSchemaVersion = schemaReference.referencedSchemaVersion;
						} else {
							oneRelationSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
						}
						const referencedSchemaName        = oneRelationSchemaVersion.schema.name;
						const oneTableColumnsMapForSchema =
							      newColumnsMap.get(referencedSchemaName);

						let oneTableColumns;
						let oneTableRelations;
						if (oneTableColumnsMapForSchema) {
							oneTableColumns   = oneTableColumnsMapForSchema[jsonRelationColumn.oneTableIndex];
							oneTableRelations = newRelationsMap.get(oneRelationSchemaVersion.schema.name)
								[jsonRelationColumn.oneTableIndex];
						} else {
							const entitiesArray = this.getExistingLatestSchemaVersion(
								referencedSchemaName, terminalStore).entities;
							const entity        = entitiesArray[jsonRelationColumn.oneTableIndex];
							oneTableColumns     = entity.columns;
							oneTableRelations   = entity.relations;
						}

						const oneColumn = oneTableColumns[jsonRelationColumn.oneColumnIndex];
						// if (!jsonRelationColumn.oneSchemaIndex
						// 	&& !oneColumn.oneRelationColumns) {
						// 	oneColumn.oneRelationColumns = []
						// }
						const oneRelation = oneTableRelations[jsonRelationColumn.oneRelationIndex];
						// if (!jsonRelationColumn.oneSchemaIndex
						// 	&& !oneRelation.oneRelationColumns) {
						// 	oneRelation.oneRelationColumns = []
						// }

						const relationColumn: ISchemaRelationColumn = {
							id: ++ddlObjectRetriever.lastIds.relationColumns,
							manyColumn,
							manyRelation,
							oneColumn,
							oneRelation,
							// FIXME: figure out how to many OneToMany-only relations
							parentRelation: manyRelation
						};
						// manyRelation.manyRelationColumns.push(relationColumn)
						// if (!jsonRelationColumn.oneSchemaIndex) {
						// 	oneColumn.oneRelationColumns.push(relationColumn)
						// 	oneRelation.oneRelationColumns.push(relationColumn)
						// }
						relationColumns.push(relationColumn);
						newRelationColumns.push(relationColumn);
					});
					manyColumn.manyRelationColumns = []; // relationColumns
				});
			});
		}

		return newRelationColumns;
	}

}

DI.set(SCHEMA_COMPOSER, SchemaComposer);
