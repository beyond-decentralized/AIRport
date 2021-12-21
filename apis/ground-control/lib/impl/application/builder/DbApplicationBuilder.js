import { ApplicationStatus } from '../../../lingo/application/ApplicationStatus';
import { getFullApplicationNameFromDomainAndName } from '../../query/DbApplicationUtils';
import { ensureChildMap } from '../../utils/DatastructureUtils';
export class DbApplicationBuilder {
    buildDbApplicationWithoutReferences(jsonApplication, allApplications, dictionary) {
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
        const dbApplicationVersion = {
            id: null,
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
        const dbApplicationCurrentVersion = {
            application: null,
            applicationVersion: dbApplicationVersion
        };
        const dbDomain = {
            applications: [],
            id: undefined,
            name: jsonApplication.domain,
        };
        const dbApplication = {
            applicationPackages: [],
            currentVersion: [dbApplicationCurrentVersion],
            domain: dbDomain,
            fullName: getFullApplicationNameFromDomainAndName(dbDomain.name, jsonApplication.name),
            id: null,
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
            const dbEntity = this.buildDbEntity(jsonApplication, jsonEntity, dictionary, currentJsonApplicationVersion.referencedApplications, dbApplicationVersion);
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
    linkDbApplicationsByReferences(applicationMap, jsonApplicationMap, dictionary, failOnMissingMappings = true) {
        // Map referenced applications
        for (const domain in jsonApplicationMap) {
            const domainMap = jsonApplicationMap[domain];
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
                        throw new Error(`Application '${applicationName}' is not yet available for relation linking.`);
                    }
                    continue;
                }
                const jsonApplication = domainMap[applicationName];
                // FIXME: find a way to get the right application version once versioning is added
                const jsonApplicationVersion = jsonApplication.versions[0];
                for (const index in jsonApplicationVersion.referencedApplications) {
                    const applicationReference = jsonApplicationVersion.referencedApplications[index];
                    const referencedApplicationName = applicationReference.name;
                    const referencedDbDomain = applicationMap[applicationReference.domain];
                    if (!referencedDbDomain) {
                        if (failOnMissingMappings) {
                            throw new Error(`Domain '${applicationReference.domain}' is not yet available for relation linking.`);
                        }
                        continue;
                    }
                    const referencedApplication = referencedDbDomain[referencedApplicationName];
                    if (!referencedApplication) {
                        if (failOnMissingMappings) {
                            throw new Error(`Application '${referencedApplicationName}' is not yet available for relation linking.`);
                        }
                        continue;
                    }
                    // FIXME: find a way to get the right application version once versioning is added
                    const ownApplicationVersion = ownApplication.currentVersion[0]
                        .applicationVersion;
                    const referencedApplicationVersion = referencedApplication.currentVersion[0]
                        .applicationVersion;
                    const dbApplicationReference = {
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
                        throw new Error(`Application '${applicationName}' is not yet available for relation linking.`);
                    }
                    continue;
                }
                for (const entityIndex in mapForApplication) {
                    const mapForEntity = mapForApplication[entityIndex];
                    const manyEntity = manyApplication.entities[entityIndex];
                    if (!applicationMap) {
                        throw new Error(`Table '${applicationName}.${entityIndex}' is not defined.`);
                    }
                    for (const relationIndex in mapForEntity) {
                        const mapForRelation = mapForEntity[relationIndex];
                        const manyRelation = manyEntity.relations[relationIndex];
                        if (!manyRelation) {
                            throw new Error(`Relation '${applicationName}.${manyEntity.name} - ${relationIndex}' is not defined.`);
                        }
                        for (const columnIndex in mapForRelation) {
                            const relationColumnReference = mapForRelation[columnIndex];
                            const oneApplication = applicationMap[relationColumnReference.applicationName];
                            if (!oneApplication) {
                                if (failOnMissingMappings) {
                                    throw new Error(`Application '${relationColumnReference.applicationName}' is not yet available for relation linking.`);
                                }
                                break;
                            }
                            const oneEntity = manyApplication.entities[relationColumnReference.entityIndex];
                            if (!oneEntity) {
                                throw new Error(`Table '${relationColumnReference.applicationName}.${relationColumnReference.entityIndex}' is not defined.`);
                            }
                            const oneRelation = manyEntity.relations[relationColumnReference.relationIndex];
                            if (!oneRelation) {
                                throw new Error(`Relation '${relationColumnReference.applicationName}.${oneEntity.name} - ${relationColumnReference.relationIndex}' is not defined.`);
                            }
                            const oneColumn = oneEntity.columns[relationColumnReference.columnIndex];
                            if (!oneColumn) {
                                throw new Error(`Column '${relationColumnReference.applicationName}.${oneEntity.name} - ${relationColumnReference.columnIndex}' is not defined.`);
                            }
                            const manyColumn = oneEntity.columns[columnIndex];
                            if (!manyColumn) {
                                throw new Error(`Column '${applicationName}.${oneEntity.name} - ${columnIndex}' is not defined.`);
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
    buildDbEntity(jsonApplication, jsonEntity, dictionary, referencedApplications, applicationVersion) {
        const columnMap = {};
        const columns = [];
        const idColumns = [];
        const idColumnMap = {};
        const propertyMap = {};
        const properties = [];
        const relations = [];
        const dbEntity = {
            columnMap,
            columns,
            idColumns,
            idColumnMap,
            id: null,
            index: jsonEntity.index,
            isLocal: jsonEntity.isLocal,
            isRepositoryEntity: jsonEntity.isRepositoryEntity,
            name: jsonEntity.name,
            propertyMap,
            properties,
            relationReferences: [],
            relations,
            applicationVersion,
            sinceVersion: applicationVersion,
            tableConfig: jsonEntity.tableConfig
        };
        jsonEntity.properties.forEach((jsonProperty, index) => {
            const property = {
                propertyColumns: [],
                entity: dbEntity,
                id: null,
                index: jsonProperty.index,
                isId: jsonProperty.isId,
                name: jsonProperty.name,
                relation: null,
                sinceVersion: applicationVersion
            };
            propertyMap[jsonProperty.name] = property;
            properties[index] = property;
        });
        jsonEntity.properties.sort((a, b) => a.index < b.index ? -1 : 1);
        properties.sort((a, b) => a.index < b.index ? -1 : 1);
        jsonEntity.relations.forEach((jsonRelation, index) => {
            const dbProperty = properties[jsonRelation.propertyRef.index];
            const dbRelation = this.buildDbRelation(jsonRelation, dbProperty, applicationVersion);
            relations[index] = dbRelation;
        });
        relations.sort((a, b) => a.index < b.index ? -1 : 1);
        jsonEntity.columns.forEach((jsonColumn, index) => {
            const dbColumn = this.buildDbColumn(jsonApplication, jsonEntity, jsonColumn, properties, dictionary, referencedApplications, applicationVersion, dbEntity);
            columnMap[jsonColumn.name] = dbColumn;
            columns[index] = dbColumn;
        });
        jsonEntity.idColumnRefs.forEach((idColumnRef, index) => {
            idColumns[index] = columns[idColumnRef.index];
        });
        columns.sort((a, b) => a.index < b.index ? -1 : 1);
        return dbEntity;
    }
    buildDbRelation(jsonRelation, dbProperty, applicationVersion) {
        const dbRelation = {
            entity: undefined,
            foreignKey: jsonRelation.foreignKey,
            isId: dbProperty.isId,
            // isRepositoryJoin: jsonRelation.isRepositoryJoin,
            manyToOneElems: jsonRelation.manyToOneElems,
            oneToManyElems: jsonRelation.oneToManyElems,
            relationType: jsonRelation.relationType,
            id: null,
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
    buildDbColumn(jsonApplication, jsonEntity, jsonColumn, properties, dictionary, referencedApplications, applicationVersion, entity) {
        const dbColumn = {
            entity,
            id: null,
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
        const propertyColumns = jsonColumn.propertyRefs.map(propertyColumnRef => {
            const propertyIndex = propertyColumnRef.index;
            const property = properties[propertyIndex];
            return {
                column: dbColumn,
                property,
                sinceVersion: applicationVersion,
            };
        });
        dbColumn.propertyColumns = propertyColumns;
        jsonColumn.manyRelationColumnRefs.map(relationColumnRef => {
            const manyApplicationReferenceIndex = jsonApplication.index;
            let manyApplication;
            if (manyApplicationReferenceIndex === null) {
                manyApplication = jsonApplication;
            }
            else {
                manyApplication = referencedApplications[manyApplicationReferenceIndex];
            }
            const manyTableIndex = jsonEntity.index;
            const manyRelationIndex = relationColumnRef.manyRelationIndex;
            const manyColumnIndex = dbColumn.index;
            const oneApplicationReferenceIndex = relationColumnRef.oneApplicationIndex;
            let oneApplication;
            if (oneApplicationReferenceIndex === null) {
                oneApplication = jsonApplication;
            }
            else {
                oneApplication = referencedApplications[oneApplicationReferenceIndex];
            }
            if (!oneApplication) {
                // FIXME: figure out if not having references to nested applications is OK
                return;
            }
            const oneTableIndex = relationColumnRef.oneTableIndex;
            const oneRelationIndex = relationColumnRef.oneRelationIndex;
            const oneColumnIndex = relationColumnRef.oneColumnIndex;
            const manyRelationColumnMap = ensureChildMap(ensureChildMap(ensureChildMap(ensureChildMap(dictionary.dbColumnRelationMapByManySide, manyApplication.domain), manyApplication.name), manyTableIndex), manyRelationIndex);
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
                jsonEntity.idColumnRefs.some((idColumnRef, index) => {
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
//# sourceMappingURL=DbApplicationBuilder.js.map