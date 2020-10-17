import { SchemaStatus } from '../../../lingo/schema/SchemaStatus';
import { ensureChildMap } from '../../utils/DatastructureUtils';
export class DbSchemaBuilder {
    buildDbSchemaWithoutReferences(jsonSchema, allSchemas, dictionary) {
        const entities = [];
        const entityMapByName = {};
        const references = [];
        const referencedBy = [];
        const referencedByMapByName = {};
        const referencesMapByName = {};
        // FIXME: when versioning is added process all schema versions
        const currentJsonSchemaVersion = jsonSchema.versions[0];
        const versionString = currentJsonSchemaVersion.versionString;
        const versionParts = versionString.split('.');
        const dbSchemaVersion = {
            id: null,
            entities,
            entityMapByName,
            integerVersion: currentJsonSchemaVersion.integerVersion,
            majorVersion: parseInt(versionParts[0]),
            minorVersion: parseInt(versionParts[1]),
            patchVersion: parseInt(versionParts[2]),
            referencedBy,
            referencedByMapByName,
            references,
            referencesMapByName,
            schema: undefined,
            versionString,
        };
        const dbDomain = {
            applications: [],
            id: undefined,
            name: jsonSchema.domain,
            schemas: []
        };
        const dbSchema = {
            currentVersion: dbSchemaVersion,
            domain: dbDomain,
            index: allSchemas.length,
            name: jsonSchema.name,
            scope: null,
            sinceVersion: dbSchemaVersion,
            status: SchemaStatus.CURRENT,
            versions: [dbSchemaVersion]
        };
        dbSchemaVersion.schema = dbSchema;
        allSchemas.push(dbSchema);
        for (const jsonEntity of currentJsonSchemaVersion.entities) {
            const dbEntity = this.buildDbEntity(jsonSchema, jsonEntity, dictionary, currentJsonSchemaVersion.referencedSchemas, dbSchemaVersion);
            entities[dbEntity.index] = dbEntity;
            entityMapByName[dbEntity.name] = dbEntity;
        }
        return dbSchema;
    }
    buildDbEntity(jsonSchema, jsonEntity, dictionary, referencedSchemas, schemaVersion) {
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
            schemaVersion,
            sinceVersion: schemaVersion,
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
                sinceVersion: schemaVersion
            };
            propertyMap[jsonProperty.name] = property;
            properties[index] = property;
        });
        jsonEntity.properties.sort((a, b) => a.index < b.index ? -1 : 1);
        properties.sort((a, b) => a.index < b.index ? -1 : 1);
        jsonEntity.relations.forEach((jsonRelation, index) => {
            const dbProperty = properties[jsonRelation.propertyRef.index];
            const dbRelation = this.buildDbRelation(jsonRelation, dbProperty, schemaVersion);
            relations[index] = dbRelation;
        });
        relations.sort((a, b) => a.index < b.index ? -1 : 1);
        jsonEntity.columns.forEach((jsonColumn, index) => {
            const dbColumn = this.buildDbColumn(jsonSchema, jsonEntity, jsonColumn, properties, dictionary, referencedSchemas, schemaVersion, dbEntity);
            columnMap[jsonColumn.name] = dbColumn;
            columns[index] = dbColumn;
        });
        jsonEntity.idColumnRefs.forEach((idColumnRef, index) => {
            idColumns[index] = columns[idColumnRef.index];
        });
        columns.sort((a, b) => a.index < b.index ? -1 : 1);
        return dbEntity;
    }
    buildDbRelation(jsonRelation, dbProperty, schemaVersion) {
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
            sinceVersion: schemaVersion
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
    buildDbColumn(jsonSchema, jsonEntity, jsonColumn, properties, dictionary, referencedSchemas, schemaVersion, entity) {
        const dbColumn = {
            entity,
            id: null,
            index: jsonColumn.index,
            isGenerated: !!jsonColumn.isGenerated,
            manyRelationColumns: [],
            name: jsonColumn.name,
            notNull: jsonColumn.notNull,
            oneRelationColumns: [],
            propertyColumnMap: {},
            propertyColumns: null,
            sinceVersion: schemaVersion,
            type: jsonColumn.type
        };
        const propertyColumns = jsonColumn.propertyRefs.map(propertyColumnRef => {
            const propertyIndex = propertyColumnRef.index;
            const property = properties[propertyIndex];
            return {
                column: dbColumn,
                property,
                sinceVersion: schemaVersion,
            };
        });
        dbColumn.propertyColumns = propertyColumns;
        jsonColumn.manyRelationColumnRefs.map(relationColumnRef => {
            const manySchemaReferenceIndex = jsonSchema.index;
            let manySchema;
            if (manySchemaReferenceIndex === null) {
                manySchema = jsonSchema;
            }
            else {
                manySchema = referencedSchemas[manySchemaReferenceIndex];
            }
            const manyTableIndex = jsonEntity.index;
            const manyRelationIndex = relationColumnRef.manyRelationIndex;
            const manyColumnIndex = dbColumn.index;
            const oneSchemaReferenceIndex = relationColumnRef.oneSchemaIndex;
            let oneSchema;
            if (oneSchemaReferenceIndex === null) {
                oneSchema = jsonSchema;
            }
            else {
                oneSchema = referencedSchemas[oneSchemaReferenceIndex];
            }
            if (!oneSchema) {
                // FIXME: figure out if not having references to nested schemas is OK
                return;
            }
            const oneTableIndex = relationColumnRef.oneTableIndex;
            const oneRelationIndex = relationColumnRef.oneRelationIndex;
            const oneColumnIndex = relationColumnRef.oneColumnIndex;
            const manyRelationColumnMap = ensureChildMap(ensureChildMap(ensureChildMap(ensureChildMap(dictionary.dbColumnRelationMapByManySide, manySchema.name), manyTableIndex), manyRelationIndex), manySchema.domain);
            manyRelationColumnMap[manyColumnIndex] = {
                domain: oneSchema.domain,
                schemaName: oneSchema.name,
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
    /**
     * Schema loading process at runtime:
     *
     * First the build-in schema's run:
     *
     * 1) Traffic Pattern
     * 2) Holding Pattern
     *
     * Then the schema for the application being loaded is run, in order of the dependency
     * graph:
     *
     * 3) App schema grand-dependency
     * 4) App schema dependency
     * 5) Application schema
     *
     * Load provided schemas
     */
    /**
     *
     * @param {{[p: string]: DbSchema}} schemaMap
     * @param {{[p: string]: JsonSchema}} jsonSchemaMap
     * @param {ILinkingDictionary} dictionary
     */
    linkDbSchemasByReferences(schemaMap, jsonSchemaMap, dictionary, failOnMissingMappings = true) {
        // Map referenced schemas
        for (const domain in jsonSchemaMap) {
            const domainMap = jsonSchemaMap[domain];
            const dbDomainMap = schemaMap[domain];
            if (!dbDomainMap) {
                if (failOnMissingMappings) {
                    throw new Error(`Domain '${domain}' is not yet available for relation linking.`);
                }
                continue;
            }
            for (const schemaName in domainMap) {
                const ownSchema = dbDomainMap[schemaName];
                if (!ownSchema) {
                    if (failOnMissingMappings) {
                        throw new Error(`Schema '${schemaName}' is not yet available for relation linking.`);
                    }
                    continue;
                }
                const jsonSchema = domainMap[schemaName];
                // FIXME: find a way to get the right schema version once versioning is added
                const jsonSchemaVersion = jsonSchema.versions[0];
                for (const index in jsonSchemaVersion.referencedSchemas) {
                    const schemaReference = jsonSchemaVersion.referencedSchemas[index];
                    const referencedSchemaName = schemaReference.name;
                    const referencedDbDomain = schemaMap[schemaReference.domain];
                    if (!referencedDbDomain) {
                        if (failOnMissingMappings) {
                            throw new Error(`Domain '${schemaReference.domain}' is not yet available for relation linking.`);
                        }
                        continue;
                    }
                    const referencedSchema = referencedDbDomain[referencedSchemaName];
                    if (!referencedSchema) {
                        if (failOnMissingMappings) {
                            throw new Error(`Schema '${referencedSchemaName}' is not yet available for relation linking.`);
                        }
                        continue;
                    }
                    // FIXME: find a way to get the right schema version once versioning is added
                    const ownSchemaVersion = ownSchema.currentVersion;
                    const referencedSchemaVersion = referencedSchema.currentVersion;
                    const dbSchemaReference = {
                        index: parseInt(index),
                        ownSchemaVersion,
                        referencedSchemaVersion,
                        sinceVersion: null
                    };
                    ownSchemaVersion.references[index] = dbSchemaReference;
                    referencedSchemaVersion.referencedBy.push(dbSchemaReference);
                    ownSchemaVersion.referencesMapByName[referencedSchema.name] = dbSchemaReference;
                    referencedSchemaVersion.referencedByMapByName[ownSchema.name] = dbSchemaReference;
                }
            }
        }
        // Map Column Relations
        for (const domain in dictionary.dbColumnRelationMapByManySide) {
            const domainMap = dictionary.dbColumnRelationMapByManySide[domain];
            for (const schemaName in domainMap) {
                const mapForSchema = domainMap[schemaName];
                const manySchema = schemaMap[schemaName];
                if (!manySchema) {
                    if (failOnMissingMappings) {
                        throw new Error(`Schema '${schemaName}' is not yet available for relation linking.`);
                    }
                    continue;
                }
                for (const entityIndex in mapForSchema) {
                    const mapForEntity = mapForSchema[entityIndex];
                    const manyEntity = manySchema.entities[entityIndex];
                    if (!schemaMap) {
                        throw new Error(`Table '${schemaName}.${entityIndex}' is not defined.`);
                    }
                    for (const relationIndex in mapForEntity) {
                        const mapForRelation = mapForEntity[relationIndex];
                        const manyRelation = manyEntity.relations[relationIndex];
                        if (!manyRelation) {
                            throw new Error(`Relation '${schemaName}.${manyEntity.name} - ${relationIndex}' is not defined.`);
                        }
                        for (const columnIndex in mapForRelation) {
                            const relationColumnReference = mapForRelation[columnIndex];
                            const oneSchema = schemaMap[relationColumnReference.schemaName];
                            if (!oneSchema) {
                                if (failOnMissingMappings) {
                                    throw new Error(`Schema '${relationColumnReference.schemaName}' is not yet available for relation linking.`);
                                }
                                break;
                            }
                            const oneEntity = manySchema.entities[relationColumnReference.entityIndex];
                            if (!oneEntity) {
                                throw new Error(`Table '${relationColumnReference.schemaName}.${relationColumnReference.entityIndex}' is not defined.`);
                            }
                            const oneRelation = manyEntity.relations[relationColumnReference.relationIndex];
                            if (!oneRelation) {
                                throw new Error(`Relation '${relationColumnReference.schemaName}.${oneEntity.name} - ${relationColumnReference.relationIndex}' is not defined.`);
                            }
                            const oneColumn = oneEntity.columns[relationColumnReference.columnIndex];
                            if (!oneColumn) {
                                throw new Error(`Column '${relationColumnReference.schemaName}.${oneEntity.name} - ${relationColumnReference.columnIndex}' is not defined.`);
                            }
                            const manyColumn = oneEntity.columns[columnIndex];
                            if (!manyColumn) {
                                throw new Error(`Column '${schemaName}.${oneEntity.name} - ${columnIndex}' is not defined.`);
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
}
//# sourceMappingURL=DbSchemaBuilder.js.map