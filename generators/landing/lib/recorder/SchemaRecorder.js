"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const diTokens_1 = require("../diTokens");
class SchemaRecorder {
    constructor() {
        di_1.DI.get((schemaLocator, dbSchemaUtils, terminalStore, utils) => {
            this.schemaLocator = schemaLocator;
            this.dbSchemaUtils = dbSchemaUtils;
            this.terminalStore = terminalStore;
            this.utils = utils;
        }, diTokens_1.SCHEMA_LOCATOR, ground_control_1.DB_SCHEMA_UTILS, terminal_map_1.TERMINAL_STORE, air_control_1.UTILS);
        this.domainDao = di_1.DI.getP(territory_1.DOMAIN_DAO);
        this.schemaColumnDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_COLUMN_DAO);
        this.schemaDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_DAO);
        this.schemaEntityDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_ENTITY_DAO);
        this.schemaPropertyColumnDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_PROPERTY_COLUMN_DAO);
        this.schemaPropertyDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_PROPERTY_DAO);
        this.schemaReferenceDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_REFERENCE_DAO);
        this.schemaRelationColumnDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_RELATION_COLUMN_DAO);
        this.schemaRelationDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_RELATION_DAO);
        this.schemaVersionDao = di_1.DI.getP(traffic_pattern_1.SCHEMA_VERSION_DAO);
    }
    async record(jsonSchemas) {
        const domainSet = new Set();
        const jsonSchemaMapByName = new Map();
        for (const jsonSchema of jsonSchemas) {
            domainSet.add(jsonSchema.domain);
            jsonSchemaMapByName.set(this.dbSchemaUtils.getSchemaName(jsonSchema), jsonSchema);
        }
        const { domainMapByName, domains } = await this.recordDomains(domainSet);
        const { newSchemaMapByName, newSchemas } = await this.recordSchemas(domainMapByName, jsonSchemaMapByName);
        const { newSchemaVersionMapBySchemaName, newSchemaVersions } = await this.recordSchemaVersions(jsonSchemaMapByName, newSchemaMapByName);
        const { newSchemaReferenceMap, newSchemaReferences } = await this.generateSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName);
        const { newEntitiesMapBySchemaName, newEntities } = await this.generateSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName);
        const { newProperties, newPropertiesMap } = await this.generateSchemaProperties(jsonSchemaMapByName, newEntitiesMapBySchemaName);
        const { newRelations, newRelationsMap } = await this.generateSchemaRelations(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap);
        const { newColumns, newColumnsMap, newPropertyColumns } = await this.generateSchemaColumns(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap);
        const newRelationColumns = await this.generateSchemaRelationColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, newSchemaReferenceMap, newRelationsMap, newColumnsMap);
        return {
            columns: newColumns,
            domains,
            entities: newEntities,
            latestSchemaVersions: newSchemaVersions,
            properties: newProperties,
            propertyColumns: newPropertyColumns,
            relationColumns: newRelationColumns,
            relations: newRelations,
            schemaReferences: newSchemaReferences,
            schemas: newSchemas
        };
    }
    async recordDomains(domainNameSet) {
        const domains = [];
        const existingDomains = this.terminalStore.getDomains();
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
                domains.push(existingDomain);
                continue;
            }
            const domain = {
                name: domainName,
                schemas: []
            };
            newDomains.push(domain);
            domains.push(domain);
        }
        if (newDomains.length) {
            await (await this.domainDao).bulkCreate(newDomains, false, false);
            for (const domain of newDomains) {
                domainMapByName.set(domain.name, domain);
            }
        }
        return {
            domainMapByName,
            domains
        };
    }
    async recordSchemas(domainMapByName, jsonSchemaMapByName) {
        const newSchemaMapByName = new Map();
        const allSchemas = this.terminalStore.getSchemas();
        for (const schema of allSchemas) {
            newSchemaMapByName.set(schema.name, schema);
        }
        const newSchemas = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            if (newSchemaMapByName.has(schemaName)) {
                continue;
            }
            const domain = domainMapByName.get(jsonSchema.domain);
            const schema = {
                domain,
                name: schemaName,
                scope: 'public',
                status: ground_control_1.SchemaStatus.CURRENT,
            };
            domain.schemas.push(schema);
            newSchemas.push(schema);
        }
        if (newSchemas.length) {
            await (await this.schemaDao).bulkCreate(newSchemas, false, false);
            for (const schema of newSchemas) {
                newSchemaMapByName.set(schema.name, schema);
            }
        }
        return {
            newSchemaMapByName,
            newSchemas
        };
    }
    async recordSchemaVersions(jsonSchemaMapByName, newSchemaMapByName) {
        // Schema versions are guaranteed to be new
        const newSchemaVersions = [];
        const newSchemaVersionMapBySchemaName = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const schema = newSchemaMapByName.get(schemaName);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const versionParts = lastJsonSchemaVersion.versionString.split('.');
            const newSchemaVersion = {
                integerVersion: lastJsonSchemaVersion.integerVersion,
                versionString: lastJsonSchemaVersion.versionString,
                majorVersion: parseInt(versionParts[0]),
                minorVersion: parseInt(versionParts[1]),
                patchVersion: parseInt(versionParts[2]),
                schema,
            };
            // schema.currentVersion                  = newSchemaVersion
            // schema.versions                        = [newSchemaVersion]
            newSchemaVersions.push(newSchemaVersion);
            newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion);
        }
        await (await this.schemaVersionDao).bulkCreate(newSchemaVersions, false, false);
        return {
            newSchemaVersionMapBySchemaName,
            newSchemaVersions
        };
    }
    async generateSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName) {
        const newSchemaReferenceMap = new Map();
        const newSchemaReferences = [];
        for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
            const schema = ownSchemaVersion.schema;
            const jsonSchema = jsonSchemaMapByName.get(schema.name);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const schemaReferences = this.utils.ensureChildArray(newSchemaReferenceMap, schemaName);
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
                const referencedSchemaName = this.dbSchemaUtils.getSchemaName(jsonReferencedSchema);
                let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(referencedSchemaName);
                if (!referencedSchemaVersion) {
                    referencedSchemaVersion = this.schemaLocator.locateLatestSchemaVersionBySchemaName(referencedSchemaName);
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
                schemaReferences.push(schemaReference);
                schemaReferences.push(schemaReference);
            }
        }
        await (await this.schemaReferenceDao).bulkCreate(newSchemaReferences, false, false);
        return {
            newSchemaReferenceMap,
            newSchemaReferences
        };
    }
    async generateSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName) {
        const newEntitiesMapBySchemaName = new Map();
        const newEntities = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            let index = 0;
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const schemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
            for (const jsonEntity of jsonEntities) {
                const entity = {
                    index: index++,
                    schemaVersion,
                    isLocal: jsonEntity.isLocal,
                    isRepositoryEntity: jsonEntity.isRepositoryEntity,
                    name: jsonEntity.name,
                    tableConfig: jsonEntity.tableConfig,
                };
                // schemaVersion.entities.push(entity)
                newEntities.push(entity);
            }
            newEntitiesMapBySchemaName.set(schemaName, schemaVersion.entities);
        }
        await (await this.schemaEntityDao).bulkCreate(newEntities, false, false);
        return {
            newEntitiesMapBySchemaName,
            newEntities
        };
    }
    async generateSchemaProperties(jsonSchemaMapByName, newEntitiesMapBySchemaName) {
        const newProperties = [];
        const newPropertiesMap = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const entities = newEntitiesMapBySchemaName.get(schemaName);
            const propertiesByEntityIndex = this.utils.ensureChildArray(newPropertiesMap, schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const entity = entities[tableIndex];
                const propertiesForEntity = [];
                propertiesByEntityIndex[tableIndex]
                    = propertiesForEntity;
                let index = 0;
                for (const jsonProperty of jsonEntity.properties) {
                    const property = {
                        index: index++,
                        entity,
                        name: jsonProperty.name,
                        isId: jsonProperty.isId,
                    };
                    // entity.properties.push(property)
                    // entity.propertyMap[property.name] = property
                    propertiesForEntity[index] = property;
                    newProperties.push(property);
                }
            });
        }
        await (await this.schemaPropertyDao).bulkCreate(newProperties, false, false);
        return {
            newProperties,
            newPropertiesMap
        };
    }
    async generateSchemaRelations(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap) {
        const newRelations = [];
        const newRelationsMap = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
            const propertiesByEntityIndex = newPropertiesMap.get(schemaName);
            const relationsByEntityIndex = this.utils.ensureChildArray(newRelationsMap, schemaName);
            const referencesForSchema = newSchemaReferenceMap.get(schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const propertiesForEntity = propertiesByEntityIndex[tableIndex];
                const relationsForEntity = [];
                relationsByEntityIndex[tableIndex]
                    = relationsForEntity;
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
                    const relationEntity = entitiesForSchema[jsonRelation.relationTableIndex];
                    const relation = {
                        index: index++,
                        property,
                        foreignKey: jsonRelation.foreignKey,
                        manyToOneElems: jsonRelation.manyToOneElems,
                        oneToManyElems: jsonRelation.oneToManyElems,
                        relationType: jsonRelation.relationType,
                        isId: property.isId,
                        relationEntity,
                    };
                    // property.relation               = [relation]
                    // relationEntity.relations.push(relation)
                    propertiesForEntity[index] = relation;
                    relations.push(relation);
                    newRelations.push(relation);
                }
            });
        }
        await (await this.schemaRelationDao).bulkCreate(newRelations, false, false);
        return {
            newRelations,
            newRelationsMap
        };
    }
    async generateSchemaColumns(jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap) {
        const newColumnsMap = new Map();
        const newColumns = [];
        const newPropertyColumns = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const propertiesForSchema = newPropertiesMap.get(schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const entity = entitiesForSchema[tableIndex];
                const idColumnIndexes = [];
                jsonEntity.idColumnRefs.forEach((idColumnRef, idColumnIndex) => {
                    idColumnIndexes[idColumnRef.index] = idColumnIndex;
                });
                const propertiesForEntity = propertiesForSchema[tableIndex];
                jsonEntity.columns.forEach((jsonColumn, index) => {
                    const idColumndIndex = idColumnIndexes[index];
                    const column = {
                        index,
                        entity,
                        idIndex: idColumndIndex,
                        isGenerated: jsonColumn.isGenerated,
                        allocationSize: jsonColumn.allocationSize,
                        name: jsonColumn.name,
                        notNull: jsonColumn.notNull,
                        type: jsonColumn.type,
                    };
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
        await (await this.schemaColumnDao).bulkCreate(newColumns, false, false);
        await (await this.schemaPropertyColumnDao).bulkCreate(newPropertyColumns, false, false);
        return {
            newColumns,
            newColumnsMap,
            newPropertyColumns
        };
    }
    async generateSchemaRelationColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, newSchemaReferenceMap, newRelationsMap, newColumnsMap) {
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
                        if (jsonRelationColumn.oneSchemaIndex) {
                            const schemaReference = schemaReferencesForSchema[jsonRelationColumn.oneSchemaIndex];
                            oneRelationSchemaVersion = schemaReference.referencedSchemaVersion;
                        }
                        else {
                            oneRelationSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
                        }
                        const oneTable = oneRelationSchemaVersion
                            .entities[jsonRelationColumn.oneTableIndex];
                        const oneColumn = oneTable.columns[jsonRelationColumn.oneColumnIndex];
                        // if (!jsonRelationColumn.oneSchemaIndex
                        // 	&& !oneColumn.oneRelationColumns) {
                        // 	oneColumn.oneRelationColumns = []
                        // }
                        const oneRelation = oneTable.relations[jsonRelationColumn.oneRelationIndex];
                        // if (!jsonRelationColumn.oneSchemaIndex
                        // 	&& !oneRelation.oneRelationColumns) {
                        // 	oneRelation.oneRelationColumns = []
                        // }
                        const relationColumn = {
                            manyColumn,
                            manyRelation,
                            oneColumn,
                            oneRelation
                        };
                        // manyRelation.manyRelationColumns.push(relationColumn)
                        // if (!jsonRelationColumn.oneSchemaIndex) {
                        // 	oneColumn.oneRelationColumns.push(relationColumn)
                        // 	oneRelation.oneRelationColumns.push(relationColumn)
                        // }
                        relationColumns.push(relationColumn);
                        newRelationColumns.push(relationColumn);
                    });
                    manyColumn.manyRelationColumns = relationColumns;
                });
            });
        }
        if (newRelationColumns.length) {
            await (await this.schemaRelationColumnDao).bulkCreate(newRelationColumns, false, false);
        }
        return newRelationColumns;
    }
}
exports.SchemaRecorder = SchemaRecorder;
di_1.DI.set(diTokens_1.SCHEMA_RECORDER, SchemaRecorder);
//# sourceMappingURL=SchemaRecorder.js.map