"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaRecorder = class SchemaRecorder {
    constructor(
    // @Inject(AIR_DB)
    // private airDb: IAirportDatabase,
    domainDao, schemaColumnDao, schemaDao, schemaEntityDao, schemaLocator, schemaPropertyColumnDao, schemaPropertyDao, schemaReferenceDao, schemaRelationColumnDao, schemaRelationDao, dbSchemaUtils, schemaVersionDao, terminalStore, utils) {
        this.domainDao = domainDao;
        this.schemaColumnDao = schemaColumnDao;
        this.schemaDao = schemaDao;
        this.schemaEntityDao = schemaEntityDao;
        this.schemaLocator = schemaLocator;
        this.schemaPropertyColumnDao = schemaPropertyColumnDao;
        this.schemaPropertyDao = schemaPropertyDao;
        this.schemaReferenceDao = schemaReferenceDao;
        this.schemaRelationColumnDao = schemaRelationColumnDao;
        this.schemaRelationDao = schemaRelationDao;
        this.dbSchemaUtils = dbSchemaUtils;
        this.schemaVersionDao = schemaVersionDao;
        this.terminalStore = terminalStore;
        this.utils = utils;
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
            await this.domainDao.bulkCreate(newDomains, false, false);
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
            await this.schemaDao.bulkCreate(newSchemas, false, false);
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
        await this.schemaVersionDao.bulkCreate(newSchemaVersions, false, false);
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
        await this.schemaReferenceDao.bulkCreate(newSchemaReferences, false, false);
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
        await this.schemaEntityDao.bulkCreate(newEntities, false, false);
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
        await this.schemaPropertyDao.bulkCreate(newProperties, false, false);
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
        await this.schemaRelationDao.bulkCreate(newRelations, false, false);
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
        await this.schemaColumnDao.bulkCreate(newColumns, false, false);
        await this.schemaPropertyColumnDao.bulkCreate(newPropertyColumns, false, false);
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
            await this.schemaRelationColumnDao.bulkCreate(newRelationColumns, false, false);
        }
        return newRelationColumns;
    }
};
SchemaRecorder = __decorate([
    typedi_1.Service(InjectionTokens_1.SchemaRecorderToken),
    __param(0, typedi_1.Inject(territory_1.DomainDaoToken)),
    __param(1, typedi_1.Inject(traffic_pattern_1.SchemaColumnDaoToken)),
    __param(2, typedi_1.Inject(traffic_pattern_1.SchemaDaoToken)),
    __param(3, typedi_1.Inject(traffic_pattern_1.SchemaEntityDaoToken)),
    __param(4, typedi_1.Inject(InjectionTokens_1.SchemaLocatorToken)),
    __param(5, typedi_1.Inject(traffic_pattern_1.SchemaPropertyColumnDaoToken)),
    __param(6, typedi_1.Inject(traffic_pattern_1.SchemaPropertyDaoToken)),
    __param(7, typedi_1.Inject(traffic_pattern_1.SchemaReferenceDaoToken)),
    __param(8, typedi_1.Inject(traffic_pattern_1.SchemaRelationColumnDaoToken)),
    __param(9, typedi_1.Inject(traffic_pattern_1.SchemaRelationDaoToken)),
    __param(10, typedi_1.Inject(ground_control_1.DbSchemaUtilsToken)),
    __param(11, typedi_1.Inject(traffic_pattern_1.SchemaVersionDaoToken)),
    __param(12, typedi_1.Inject(terminal_map_1.TerminalStoreToken)),
    __param(13, typedi_1.Inject(air_control_1.UtilsToken))
], SchemaRecorder);
exports.SchemaRecorder = SchemaRecorder;
//# sourceMappingURL=SchemaRecorder.js.map