import { IOC } from '@airport/direction-indicator';
import { DbApplicationUtils, IDbApplicationBuilder } from '@airport/ground-control';
import { ILinkingDictionary } from '@airport/ground-control';
import {
	DbEntity,
	JsonApplicationEntity,
} from '@airport/ground-control';
import {
	DbColumn,
	DbProperty,
	DbRelation,
	JsonApplicationColumn,
	JsonApplicationRelation
} from '@airport/ground-control';
import {
	DbDomain,
	DbApplication,
	DbApplicationCurrentVersion,
	DbApplicationReference,
	DbApplicationVersion,
	JsonApplication,
} from '@airport/ground-control';
import { ApplicationStatus } from '@airport/ground-control';
import { ensureChildMap } from '@airport/ground-control';

export class DbApplicationBuilder
	implements IDbApplicationBuilder {

	buildDbApplicationWithoutReferences(
		jsonApplication: JsonApplication,
		allApplications: DbApplication[],
		dictionary: ILinkingDictionary,
	): DbApplication {
		const entities = [];
		const entityMapByName = {};
		const references = [];
		const referencedBy = [];
		const referencedByMapByName = {};
		const referencesMapByName = {};
		// FIXME: when versioning is added process all application versions
		const currentJsonApplicationVersion = jsonApplication.versions[0];
		const versionString = currentJsonApplicationVersion.versionString;
		const versionParts = versionString.split('.');

		const dbApplicationVersion: DbApplicationVersion = {
			_localId: null,
			entities,
			entityMapByName,
			integerVersion: currentJsonApplicationVersion.integerVersion,
			majorVersion: parseInt(versionParts[0]),
			minorVersion: parseInt(versionParts[1]),
			patchVersion: parseInt(versionParts[2]),
			referencedBy,
			referencedByMapByName,
			references,
			referencesMapByName,
			application: undefined,
			versionString,
		};
		const dbApplicationCurrentVersion: DbApplicationCurrentVersion = {
			application: null,
			applicationVersion: dbApplicationVersion
		}
		const dbDomain: DbDomain = {
			applications: [],
			_localId: undefined,
			name: jsonApplication.domain,
		};

		const dbApplication: DbApplication = {
			currentVersion: [dbApplicationCurrentVersion],
			domain: dbDomain,
			fullName: IOC.getSync(DbApplicationUtils).
				getApplication_FullNameFromDomainAndName(dbDomain.name, jsonApplication.name),
			_localId: null,
			index: allApplications.length,
			name: jsonApplication.name,
			scope: null,
			signature: null,
			sinceVersion: dbApplicationVersion,
			status: ApplicationStatus.CURRENT,
			versions: [dbApplicationVersion]
		};
		dbApplicationCurrentVersion.application = dbApplication;
		dbApplicationVersion.application = dbApplication;
		allApplications.push(dbApplication);

		for (const jsonEntity of currentJsonApplicationVersion.entities) {
			const dbEntity = this.buildDbEntity(
				jsonApplication, jsonEntity, dictionary,
				currentJsonApplicationVersion.referencedApplications, dbApplicationVersion);
			entities[dbEntity.index] = dbEntity;
			entityMapByName[dbEntity.name] = dbEntity;
		}

		return dbApplication;
	}

	/**
	 *
	 * @param {{[p: string]: DbApplication}} applicationMap
	 * @param {{[p: string]: JsonApplication}} jsonApplicationMap
	 * @param {ILinkingDictionary} dictionary
	 */
	linkDbApplicationsByReferences(
		applicationMap: { [domain: string]: { [name: string]: DbApplication } },
		jsonApplicationMap: { [domain: string]: { [name: string]: JsonApplication } },
		dictionary: ILinkingDictionary,
		failOnMissingMappings: boolean = true,
	) {
		// Map referenced applications
		for (const domain in jsonApplicationMap) {
			const domainMap: { [applicationName: string]: JsonApplication } = jsonApplicationMap[domain];
			const dbDomainMap = applicationMap[domain];
			if (!dbDomainMap) {
				if (failOnMissingMappings) {
					throw new Error(`Domain '${domain}' is not yet available for relation linking.`);
				}
				continue;
			}
			for (const applicationName in domainMap) {
				const ownApplication = dbDomainMap[applicationName];
				if (!ownApplication) {
					if (failOnMissingMappings) {
						throw new Error(
							`Application '${applicationName}' is not yet available for relation linking.`);
					}
					continue;
				}
				const jsonApplication: JsonApplication = domainMap[applicationName];

				// FIXME: find a way to get the right application version once versioning is added
				const jsonApplicationVersion = jsonApplication.versions[0];
				for (const index in jsonApplicationVersion.referencedApplications) {
					const applicationReference = jsonApplicationVersion.referencedApplications[index];
					const referencedApplication_Name = applicationReference.name;
					const referencedDbDomain = applicationMap[applicationReference.domain];
					if (!referencedDbDomain) {
						if (failOnMissingMappings) {
							throw new Error(
								`Domain '${applicationReference.domain}' is not yet available for relation linking.`);
						}
						continue;
					}
					const referencedApplication = referencedDbDomain[referencedApplication_Name];
					if (!referencedApplication) {
						if (failOnMissingMappings) {
							throw new Error(
								`Application '${referencedApplication_Name}' is not yet available for relation linking.`);
						}
						continue;
					}
					// FIXME: find a way to get the right application version once versioning is added
					const ownApplicationVersion = ownApplication.currentVersion[0]
						.applicationVersion;
					const referencedApplicationVersion = referencedApplication.currentVersion[0]
						.applicationVersion;
					const dbApplicationReference: DbApplicationReference = {
						index: parseInt(index),
						ownApplicationVersion,
						referencedApplicationVersion,
						sinceVersion: null
					};
					ownApplicationVersion.references[index] = dbApplicationReference;
					referencedApplicationVersion.referencedBy.push(dbApplicationReference);
					ownApplicationVersion.referencesMapByName[referencedApplication.fullName] = dbApplicationReference;
					referencedApplicationVersion.referencedByMapByName[ownApplication.fullName] = dbApplicationReference;
				}
			}
		}

		// Map Column Relations
		for (const domain in dictionary.dbColumnRelationMapByManySide) {
			const domainMap = dictionary.dbColumnRelationMapByManySide[domain];
			for (const applicationName in domainMap) {
				const mapForApplication = domainMap[applicationName];
				const manyApplication = applicationMap[applicationName];
				if (!manyApplication) {
					if (failOnMissingMappings) {
						throw new Error(
							`Application '${applicationName}' is not yet available for relation linking.`);
					}
					continue;
				}
				for (const entityIndex in mapForApplication) {
					const mapForEntity = mapForApplication[entityIndex];
					const manyEntity = manyApplication.entities[entityIndex];
					if (!applicationMap) {
						throw new Error(
							`Table '${applicationName}.${entityIndex}' is not defined.`);
					}
					for (const relationIndex in mapForEntity) {
						const mapForRelation = mapForEntity[relationIndex];
						const manyRelation = manyEntity.relations[relationIndex];
						if (!manyRelation) {
							throw new Error(
								`Relation '${applicationName}.${manyEntity.name} - ${relationIndex}' is not defined.`);
						}
						for (const columnIndex in mapForRelation) {
							const relationColumnReference = mapForRelation[columnIndex];
							const oneApplication = applicationMap[relationColumnReference.applicationName];
							if (!oneApplication) {
								if (failOnMissingMappings) {
									throw new Error(
										`Application '${relationColumnReference.applicationName}' is not yet available for relation linking.`);
								}
								break;
							}
							const oneEntity = manyApplication.entities[relationColumnReference.entityIndex];
							if (!oneEntity) {
								throw new Error(
									`Table '${relationColumnReference.applicationName}.${relationColumnReference.entityIndex}' is not defined.`);
							}
							const oneRelation = manyEntity.relations[relationColumnReference.relationIndex];
							if (!oneRelation) {
								throw new Error(
									`Relation '${relationColumnReference.applicationName}.${oneEntity.name} - ${relationColumnReference.relationIndex}' is not defined.`);
							}
							const oneColumn = oneEntity.columns[relationColumnReference.columnIndex];
							if (!oneColumn) {
								throw new Error(
									`Column '${relationColumnReference.applicationName}.${oneEntity.name} - ${relationColumnReference.columnIndex}' is not defined.`);
							}
							const manyColumn = oneEntity.columns[columnIndex];
							if (!manyColumn) {
								throw new Error(
									`Column '${applicationName}.${oneEntity.name} - ${columnIndex}' is not defined.`);
							}
							const relationColumn = {
								manyColumn,
								oneColumn,
								manyRelation,
								oneRelation
							};
							manyColumn.manyRelationColumns.push(relationColumn);
							manyRelation.manyRelationColumns.push(relationColumn);
							oneColumn.oneRelationColumns.push(relationColumn);
							oneRelation.oneRelationColumns.push(relationColumn);
						}
					}
				}
			}
		}
	}

	private buildDbEntity(
		jsonApplication: JsonApplication,
		jsonEntity: JsonApplicationEntity,
		dictionary: ILinkingDictionary,
		referencedApplications: JsonApplication[],
		applicationVersion: DbApplicationVersion
	): DbEntity {
		const columnMap = {};
		const columns: DbColumn[] = [];
		const idColumns: DbColumn[] = [];
		const idColumnMap = {};
		const propertyMap = {};
		const properties: DbProperty[] = [];
		const relations: DbRelation[] = [];
		const dbEntity: DbEntity = {
			columnMap,
			columns,
			idColumns,
			idColumnMap,
			_localId: null,
			index: jsonEntity.index,
			isLocal: jsonEntity.isLocal,
			isAirEntity: jsonEntity.isAirEntity,
			name: jsonEntity.name,
			propertyMap,
			properties,
			relationReferences: [],
			relations,
			applicationVersion,
			sinceVersion: applicationVersion,
			tableConfig: jsonEntity.tableConfig
		};

		jsonEntity.properties.forEach((
			jsonProperty,
			index
		) => {
			const property: DbProperty = {
				propertyColumns: [],
				entity: dbEntity,
				_localId: null,
				index: jsonProperty.index,
				isId: jsonProperty.isId,
				name: jsonProperty.name,
				relation: null,
				sinceVersion: applicationVersion
			};
			propertyMap[jsonProperty.name] = property;
			properties[index] = property;
		});
		jsonEntity.properties.sort((
			a,
			b
		) =>
			a.index < b.index ? -1 : 1
		);
		properties.sort((
			a,
			b
		) =>
			a.index < b.index ? -1 : 1
		);

		jsonEntity.relations.forEach((
			jsonRelation,
			index
		) => {
			const dbProperty = properties[jsonRelation.propertyRef.index];
			const dbRelation = this.buildDbRelation(
				jsonRelation, dbProperty, applicationVersion);
			relations[index] = dbRelation;
		});
		relations.sort((
			a,
			b
		) =>
			a.index < b.index ? -1 : 1
		);

		jsonEntity.columns.forEach((
			jsonColumn,
			index
		) => {
			const dbColumn = this.buildDbColumn(
				jsonApplication, jsonEntity, jsonColumn, properties,
				dictionary, referencedApplications, applicationVersion, dbEntity);
			columnMap[jsonColumn.name] = dbColumn;
			columns[index] = dbColumn;
		});
		jsonEntity.idColumnRefs.forEach((
			idColumnRef,
			index
		) => {
			idColumns[index] = columns[idColumnRef.index];
		});
		columns.sort((
			a,
			b
		) =>
			a.index < b.index ? -1 : 1
		);

		return dbEntity;
	}

	private buildDbRelation(
		jsonRelation: JsonApplicationRelation,
		dbProperty: DbProperty,
		applicationVersion: DbApplicationVersion
	): DbRelation {
		const dbRelation: DbRelation = {
			entity: undefined, // TODO: verity that it's not needed
			foreignKey: jsonRelation.foreignKey,
			isId: dbProperty.isId,
			// isRepositoryJoin: jsonRelation.isRepositoryJoin,
			manyToOneElems: jsonRelation.manyToOneElems,
			oneToManyElems: jsonRelation.oneToManyElems,
			relationType: jsonRelation.relationType,
			_localId: null,
			index: jsonRelation.index,
			property: dbProperty,
			manyRelationColumns: [],
			oneRelationColumns: [],
			relationEntity: null,
			sinceVersion: applicationVersion
			// addToJoinFunction: jsonRelation.addToJoinFunction,
			// joinFunctionWithOperator: jsonRelation.joinFunctionWithOperator,
		};
		// if (dbRelation.addToJoinFunction) {
		// 	dbRelation.whereJoinTable = {
		// 		addToJoinFunction: new Function('return ' + dbRelation.addToJoinFunction)(),
		// 		joinFunctionWithOperator:
		// 			dbRelation.joinFunctionWithOperator === SqlOperator.AND ? and : or,
		// 	}
		// }
		dbProperty.relation = [dbRelation];

		return dbRelation;
	}

	/**
	 * Application loading process at runtime:
	 *
	 * First the build-in application's run:
	 *
	 * 1) Traffic Pattern
	 * 2) Holding Pattern
	 *
	 * Then the application for the application being loaded is run, in order of the dependency
	 * graph:
	 *
	 * 3) App application grand-dependency
	 * 4) App application dependency
	 * 5) Application application
	 *
	 * Load provided applications
	 */

	private buildDbColumn(
		jsonApplication: JsonApplication,
		jsonEntity: JsonApplicationEntity,
		jsonColumn: JsonApplicationColumn,
		properties: DbProperty[],
		dictionary: ILinkingDictionary,
		referencedApplications: JsonApplication[],
		applicationVersion: DbApplicationVersion,
		entity: DbEntity
	): DbColumn {
		const dbColumn: DbColumn = {
			entity,
			_localId: null,
			index: jsonColumn.index,
			isGenerated: !!jsonColumn.isGenerated,
			manyRelationColumns: [],
			name: jsonColumn.name,
			notNull: jsonColumn.notNull,
			oneRelationColumns: [],
			precision: jsonColumn.precision,
			propertyColumnMap: {},
			propertyColumns: null,
			scale: jsonColumn.scale,
			sinceVersion: applicationVersion,
			type: jsonColumn.type
		};
		const propertyColumns = jsonColumn.propertyRefs.map(
			propertyColumnRef => {
				const propertyIndex = propertyColumnRef.index;
				const property = properties[propertyIndex];
				return {
					column: dbColumn,
					property,
					sinceVersion: applicationVersion,
				};
			}
		);
		dbColumn.propertyColumns = propertyColumns;

		jsonColumn.manyRelationColumnRefs.map(
			relationColumnRef => {
				const manyApplicationReference_Index = jsonApplication.index;
				let manyApplication;
				if (manyApplicationReference_Index === null) {
					manyApplication = jsonApplication;
				} else {
					manyApplication = referencedApplications[manyApplicationReference_Index];
				}
				const manyTableIndex = jsonEntity.index;
				const manyRelationIndex = relationColumnRef.manyRelationIndex;
				const manyColumnIndex = dbColumn.index;
				const oneApplicationReference_Index = relationColumnRef.oneApplication_Index;
				let oneApplication;
				if (oneApplicationReference_Index === null) {
					oneApplication = jsonApplication;
				} else {
					oneApplication = referencedApplications[oneApplicationReference_Index];
				}
				if (!oneApplication) {
					// FIXME: figure out if not having references to nested applications is OK
					return;
				}
				const oneTableIndex = relationColumnRef.oneTableIndex;
				const oneRelationIndex = relationColumnRef.oneRelationIndex;
				const oneColumnIndex = relationColumnRef.oneColumnIndex;

				const manyRelationColumnMap = ensureChildMap(
					ensureChildMap(
						ensureChildMap(
							ensureChildMap(dictionary.dbColumnRelationMapByManySide,
								manyApplication.domain),
							manyApplication.name),
						manyTableIndex),
					manyRelationIndex);

				manyRelationColumnMap[manyColumnIndex] = {
					domain: oneApplication.domain,
					applicationName: oneApplication.name,
					entityIndex: oneTableIndex,
					relationIndex: oneRelationIndex,
					columnIndex: oneColumnIndex,
				};
			});

		for (const dbPropertyColumn of propertyColumns) {
			const property = dbPropertyColumn.property;
			// if (property.relation) {
			// 	dbColumn.relation = property.relation[0];
			// }
			if (property.isId) {
				let idIndex;
				jsonEntity.idColumnRefs.some((
					idColumnRef,
					index
				) => {
					if (idColumnRef.index == jsonColumn.index) {
						idIndex = index;
						return true;
					}
				});
				if (!idIndex && idIndex !== 0) {
					throw new Error(`Could not find column "${jsonColumn.name}" 
					in @Id column references of entity "${jsonEntity.name}".`);
				}
				dbColumn.idIndex = idIndex;
			}

			property.propertyColumns.push(dbPropertyColumn);
		}

		return dbColumn;
	}
}
