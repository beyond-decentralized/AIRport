"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../diTokens");
class SchemaComposer {
    compose(jsonSchemas, ddlObjectRetriever, schemaLocator, terminalStore) {
        const domainSet = new Set();
        const jsonSchemaMapByName = new Map();
        for (const jsonSchema of jsonSchemas) {
            domainSet.add(jsonSchema.domain);
            jsonSchemaMapByName.set(ground_control_1.getSchemaName(jsonSchema), jsonSchema);
        }
        const allSchemaVersionsByIds = [...terminalStore.getAllSchemaVersionsByIds()];
        const { domainMapByName, allDomains, newDomains } = this.composeDomains(domainSet, ddlObjectRetriever, terminalStore);
        const { allSchemas, newSchemaMapByName, newSchemas } = this.composeSchemas(domainMapByName, jsonSchemaMapByName, ddlObjectRetriever, terminalStore);
        const { newLatestSchemaVersions, newSchemaVersionMapBySchemaName, newSchemaVersions } = this.composeSchemaVersions(jsonSchemaMapByName, newSchemaMapByName, ddlObjectRetriever);
        const { newSchemaReferenceMap, newSchemaReferences } = this.composeSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, schemaLocator, terminalStore);
        const { newEntitiesMapBySchemaName, newEntities } = this.composeSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, ddlObjectRetriever);
        const { newProperties, newPropertiesMap } = this.composeSchemaProperties(jsonSchemaMapByName, newEntitiesMapBySchemaName, ddlObjectRetriever);
        const { newRelations, newRelationsMap } = this.composeSchemaRelations(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap, ddlObjectRetriever);
        const { newColumns, newColumnsMap, newPropertyColumns } = this.composeSchemaColumns(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap, ddlObjectRetriever);
        const newRelationColumns = this.composeSchemaRelationColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, newSchemaReferenceMap, newRelationsMap, newColumnsMap);
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
    composeDomains(domainNameSet, ddlObjectRetriever, terminalStore) {
        const allDomains = [];
        const existingDomains = terminalStore.getDomains();
        const domainMapByName = new Map();
        for (const domain of existingDomains) {
            if (domainNameSet.has(domain.name)) {
                domainMapByName.set(domain.name, domain);
            }
        }
        const newDomains = [];
        for (const domainName of domainNameSet) {
            const existingDomain = domainMapByName.get(domainName);
            if (existingDomain) {
                allDomains.push(existingDomain);
                // continue
            }
            else {
                const domain = {
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
    composeSchemas(domainMapByName, jsonSchemaMapByName, ddlObjectRetriever, terminalStore) {
        const schemaMapByName = new Map();
        const newSchemaMapByName = new Map();
        const allSchemas = terminalStore.getSchemas();
        for (const schema of allSchemas) {
            schemaMapByName.set(schema.name, schema);
        }
        const newSchemas = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            if (schemaMapByName.has(schemaName)) {
                continue;
            }
            const domain = domainMapByName.get(jsonSchema.domain);
            const schema = {
                domain,
                index: ++ddlObjectRetriever.lastIds.schemas,
                name: schemaName,
                scope: 'public',
                status: ground_control_1.SchemaStatus.CURRENT,
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
    composeSchemaVersions(jsonSchemaMapByName, newSchemaMapByName, ddlObjectRetriever) {
        // Schema versions are guaranteed to be new
        const newSchemaVersions = [];
        const newSchemaVersionMapBySchemaName = new Map();
        const newLatestSchemaVersions = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const schema = newSchemaMapByName.get(schemaName);
            let newSchemaVersion;
            for (const schemaVersion of jsonSchema.versions) {
                const versionParts = schemaVersion.versionString.split('.');
                newSchemaVersion = {
                    id: ++ddlObjectRetriever.lastIds.schemaVersions,
                    integerVersion: schemaVersion.integerVersion,
                    versionString: schemaVersion.versionString,
                    majorVersion: parseInt(versionParts[0]),
                    minorVersion: parseInt(versionParts[1]),
                    patchVersion: parseInt(versionParts[2]),
                    schema,
                };
                // schema.currentVersion                  = newSchemaVersion
                // schema.versions                        = [newSchemaVersion]
                newSchemaVersions.push(newSchemaVersion);
            }
            newLatestSchemaVersions.push(newSchemaVersion);
            newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion);
        }
        return {
            newLatestSchemaVersions,
            newSchemaVersionMapBySchemaName,
            newSchemaVersions
        };
    }
    composeSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, schemaLocator, terminalStore) {
        const newSchemaReferenceMap = new Map();
        const newSchemaReferences = [];
        for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
            const schema = ownSchemaVersion.schema;
            const jsonSchema = jsonSchemaMapByName.get(schema.name);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const schemaReferences = ground_control_1.ensureChildArray(newSchemaReferenceMap, schemaName);
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
                const referencedSchemaName = ground_control_1.getSchemaName(jsonReferencedSchema);
                let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(referencedSchemaName);
                if (!referencedSchemaVersion) {
                    referencedSchemaVersion = schemaLocator.locateLatestSchemaVersionBySchemaName(referencedSchemaName, terminalStore);
                    if (!referencedSchemaVersion) {
                        throw new Error(`Could not locate schema:
						${referencedSchemaName}
						in either existing schemas or schemas being currently processed`);
                    }
                }
                const schemaReference = {
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
    composeSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, ddlObjectRetriever) {
        const newEntitiesMapBySchemaName = new Map();
        const newEntities = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            let index = 0;
            // TODO: verify that jsonSchema.versions is always ordered ascending
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const newSchemaEntities = [];
            const schemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
            for (const jsonEntity of jsonEntities) {
                const entity = {
                    id: ++ddlObjectRetriever.lastIds.entities,
                    index: index++,
                    schemaVersion,
                    isLocal: jsonEntity.isLocal,
                    isRepositoryEntity: jsonEntity.isRepositoryEntity,
                    name: jsonEntity.name,
                    tableConfig: jsonEntity.tableConfig,
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
    composeSchemaProperties(jsonSchemaMapByName, newEntitiesMapBySchemaName, ddlObjectRetriever) {
        const newProperties = [];
        const newPropertiesMap = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const entities = newEntitiesMapBySchemaName.get(schemaName);
            const propertiesByEntityIndex = ground_control_1.ensureChildArray(newPropertiesMap, schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const entity = entities[tableIndex];
                const propertiesForEntity = [];
                propertiesByEntityIndex[tableIndex]
                    = propertiesForEntity;
                let index = 0;
                for (const jsonProperty of jsonEntity.properties) {
                    const property = {
                        id: ++ddlObjectRetriever.lastIds.properties,
                        index,
                        entity,
                        name: jsonProperty.name,
                        isId: jsonProperty.isId,
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
    composeSchemaRelations(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap, ddlObjectRetriever) {
        const newRelations = [];
        const newRelationsMap = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
            const propertiesByEntityIndex = newPropertiesMap.get(schemaName);
            const relationsByEntityIndex = ground_control_1.ensureChildArray(newRelationsMap, schemaName);
            const referencesForSchema = newSchemaReferenceMap.get(schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const propertiesForEntity = propertiesByEntityIndex[tableIndex];
                const relationsForEntity = [];
                relationsByEntityIndex[tableIndex]
                    = relationsForEntity;
                const entity = entitiesForSchema[tableIndex];
                let index = 0;
                const relations = [];
                for (const jsonRelation of jsonEntity.relations) {
                    const property = propertiesForEntity[jsonRelation.propertyRef.index];
                    let referencedSchemaName = schemaName;
                    if (jsonRelation.relationTableSchemaIndex
                        || jsonRelation.relationTableSchemaIndex === 0) {
                        const schemaReference = referencesForSchema[jsonRelation.relationTableSchemaIndex];
                        referencedSchemaName = schemaReference.referencedSchemaVersion.schema.name;
                    }
                    const relationEntity = newEntitiesMapBySchemaName.get(referencedSchemaName)[jsonRelation.relationTableIndex];
                    const relation = {
                        entity,
                        id: ++ddlObjectRetriever.lastIds.relations,
                        index,
                        foreignKey: jsonRelation.foreignKey,
                        isId: property.isId,
                        manyToOneElems: jsonRelation.manyToOneElems,
                        property,
                        oneToManyElems: jsonRelation.oneToManyElems,
                        relationEntity,
                        relationType: jsonRelation.relationType,
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
    composeSchemaColumns(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap, ddlObjectRetriever) {
        const newColumnsMap = new Map();
        const newColumns = [];
        const newPropertyColumns = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const columnsByTable = [];
            newColumnsMap.set(schemaName, columnsByTable);
            const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const propertiesForSchema = newPropertiesMap.get(schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const entity = entitiesForSchema[tableIndex];
                const columnsForTable = [];
                columnsByTable[tableIndex] = columnsForTable;
                const idColumnIndexes = [];
                jsonEntity.idColumnRefs.forEach((idColumnRef, idColumnIndex) => {
                    idColumnIndexes[idColumnRef.index] = idColumnIndex;
                });
                const propertiesForEntity = propertiesForSchema[tableIndex];
                jsonEntity.columns.forEach((jsonColumn, index) => {
                    const idColumndIndex = idColumnIndexes[index];
                    const column = {
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
                        propertyColumns: [],
                        type: jsonColumn.type,
                    };
                    columnsForTable[index] = column;
                    newColumns.push(column);
                    // entity.columns.push(column)
                    // entity.columnMap[column.name] = column
                    // if (idColumndIndex || idColumndIndex === 0) {
                    // 	entity.idColumns[idColumndIndex] = column
                    // 	entity.idColumnMap[column.name]  = column
                    // }
                    jsonColumn.propertyRefs.forEach((propertyReference) => {
                        const property = propertiesForEntity[propertyReference.index];
                        const propertyColumn = {
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
    composeSchemaRelationColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, newSchemaReferenceMap, newRelationsMap, newColumnsMap) {
        const newRelationColumns = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const columnsForSchema = newColumnsMap.get(schemaName);
            const relationsForSchema = newRelationsMap.get(schemaName);
            const schemaReferencesForSchema = newSchemaReferenceMap.get(schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const columnsForEntity = columnsForSchema[tableIndex];
                const relationsForEntity = relationsForSchema[tableIndex];
                jsonEntity.columns.forEach((jsonColumn, index) => {
                    const manyColumn = columnsForEntity[index];
                    const relationColumns = [];
                    jsonColumn.manyRelationColumnRefs.forEach((jsonRelationColumn) => {
                        const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex];
                        // if (!manyRelation.manyRelationColumns) {
                        // 	manyRelation.manyRelationColumns = []
                        // }
                        let oneRelationSchemaVersion;
                        if (jsonRelationColumn.oneSchemaIndex
                            || jsonRelationColumn.oneSchemaIndex === 0) {
                            const schemaReference = schemaReferencesForSchema[jsonRelationColumn.oneSchemaIndex];
                            oneRelationSchemaVersion = schemaReference.referencedSchemaVersion;
                        }
                        else {
                            oneRelationSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
                        }
                        let oneTableColumns = newColumnsMap.get(oneRelationSchemaVersion.schema.name)[jsonRelationColumn.oneTableIndex];
                        const oneColumn = oneTableColumns[jsonRelationColumn.oneColumnIndex];
                        // if (!jsonRelationColumn.oneSchemaIndex
                        // 	&& !oneColumn.oneRelationColumns) {
                        // 	oneColumn.oneRelationColumns = []
                        // }
                        let oneTableRelations = newRelationsMap.get(oneRelationSchemaVersion.schema.name)[jsonRelationColumn.oneTableIndex];
                        const oneRelation = oneTableRelations[jsonRelationColumn.oneRelationIndex];
                        // if (!jsonRelationColumn.oneSchemaIndex
                        // 	&& !oneRelation.oneRelationColumns) {
                        // 	oneRelation.oneRelationColumns = []
                        // }
                        const relationColumn = {
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
exports.SchemaComposer = SchemaComposer;
di_1.DI.set(diTokens_1.SCHEMA_COMPOSER, SchemaComposer);
//# sourceMappingURL=SchemaComposer.js.map