"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaRecorder = class SchemaRecorder {
    constructor(
    // @Inject(AirportDatabaseToken)
    // private airportDatabase: IAirportDatabase,
    domainDao, schemaColumnDao, schemaDao, schemaEntityDao, schemaLocator, schemaPropertyColumnDao, schemaPropertyDao, schemaReferenceDao, schemaRelationColumnDao, schemaRelationDao, schemaUtils, schemaVersionDao, utils) {
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
        this.schemaUtils = schemaUtils;
        this.schemaVersionDao = schemaVersionDao;
        this.utils = utils;
    }
    async record(jsonSchemas) {
        const domainSet = new Set();
        const jsonSchemaMapByName = new Map();
        for (const jsonSchema of jsonSchemas) {
            domainSet.add(jsonSchema.domain);
            jsonSchemaMapByName.set(this.schemaUtils.getSchemaName(jsonSchema), jsonSchema);
        }
        const domainMapByName = await this.recordDomains(domainSet);
        const schemaMapByName = await this.recordSchemas(domainMapByName, jsonSchemaMapByName);
        const newSchemaVersionMapBySchemaName = await this.recordSchemaVersions(jsonSchemaMapByName, schemaMapByName);
        const schemaReferenceMap = await this.generateSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName);
        const entitiesMapBySchemaName = await this.generateSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName);
        const propertiesMap = await this.generateSchemaProperties(jsonSchemaMapByName, entitiesMapBySchemaName);
        const relationsMap = await this.generateSchemaRelations(jsonSchemaMapByName, entitiesMapBySchemaName, propertiesMap, schemaReferenceMap);
        const columnsMap = await this.generateSchemaColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, entitiesMapBySchemaName, propertiesMap);
        await this.generateSchemaRelationColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, schemaReferenceMap, relationsMap, columnsMap);
    }
    async recordDomains(domainSet) {
        const domainMapByName = await this.domainDao.findMapByNameWithNames(Array.from(domainSet));
        const newDomains = [];
        for (const domainName of domainSet) {
            if (domainMapByName.has(domainName)) {
                continue;
            }
            newDomains.push({
                name: domainName
            });
        }
        if (newDomains.length) {
            await this.domainDao.bulkCreate(newDomains, false, false);
            for (const domain of newDomains) {
                domainMapByName.set(domain.name, domain);
            }
        }
        return domainMapByName;
    }
    async recordSchemas(domainMapByName, jsonSchemaMapByName) {
        const schemaMapByName = await this.schemaDao
            .findMapByNames(Array.from(jsonSchemaMapByName.keys()));
        const newSchemas = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            if (schemaMapByName.has(schemaName)) {
                continue;
            }
            const domain = domainMapByName.get(jsonSchema.domain);
            newSchemas.push({
                domain,
                scope: 'public',
                name: schemaName,
                status: traffic_pattern_1.SchemaStatus.CURRENT
            });
        }
        if (newSchemas.length) {
            await this.schemaDao.bulkCreate(newSchemas, false, false);
            for (const schema of newSchemas) {
                schemaMapByName.set(schema.name, schema);
            }
        }
        return schemaMapByName;
    }
    async recordSchemaVersions(jsonSchemaMapByName, schemaMapByName) {
        // Schema versions are guaranteed to be new
        const newSchemaVersions = [];
        const newSchemaVersionMapBySchemaName = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const schema = schemaMapByName.get(schemaName);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const versionParts = lastJsonSchemaVersion.versionString.split('.');
            const newSchemaVersion = {
                integerVersion: lastJsonSchemaVersion.integerVersion,
                versionString: lastJsonSchemaVersion.versionString,
                majorVersion: parseInt(versionParts[0]),
                minorVersion: parseInt(versionParts[1]),
                patchVersion: parseInt(versionParts[2]),
                entities: [],
                schema
            };
            newSchemaVersions.push(newSchemaVersion);
            newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion);
        }
        await this.schemaVersionDao.bulkCreate(newSchemaVersions, false, false);
        return newSchemaVersionMapBySchemaName;
    }
    async generateSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName) {
        const schemaReferenceMap = new Map();
        const allSchemaReferences = [];
        for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
            const schema = ownSchemaVersion.schema;
            const jsonSchema = jsonSchemaMapByName.get(schema.name);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const schemaReferences = this.utils.ensureChildArray(schemaReferenceMap, schemaName);
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
                const referencedSchemaName = this.schemaUtils.getSchemaName(jsonReferencedSchema);
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
                allSchemaReferences.push(schemaReference);
            }
        }
        await this.schemaReferenceDao.bulkCreate(allSchemaReferences, false, false);
        return schemaReferenceMap;
    }
    async generateSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName) {
        const entitiesMapBySchemaName = new Map();
        const allEntities = [];
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
                    columns: [],
                    columnMap: {},
                    idColumns: [],
                    idColumnMap: {},
                    relations: [],
                    properties: [],
                    propertyMap: {}
                };
                schemaVersion.entities.push(entity);
                allEntities.push(entity);
            }
            entitiesMapBySchemaName.set(schemaName, schemaVersion.entities);
        }
        await this.schemaEntityDao.bulkCreate(allEntities, false, false);
        return entitiesMapBySchemaName;
    }
    async generateSchemaProperties(jsonSchemaMapByName, entitiesMapBySchemaName) {
        const allProperties = [];
        const propertiesMap = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const entities = entitiesMapBySchemaName.get(schemaName);
            const propertiesByEntityIndex = this.utils.ensureChildArray(propertiesMap, schemaName);
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
                        propertyColumns: []
                    };
                    entity.properties.push(property);
                    entity.propertyMap[property.name] = property;
                    propertiesForEntity[index] = property;
                    allProperties.push(property);
                }
            });
        }
        await this.schemaPropertyDao.bulkCreate(allProperties, false, false);
        return propertiesMap;
    }
    async generateSchemaRelations(jsonSchemaMapByName, entitiesMapBySchemaName, propertiesMap, schemaReferenceMap) {
        const allRelations = [];
        const relationsMap = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const entitiesForSchema = entitiesMapBySchemaName.get(schemaName);
            const propertiesByEntityIndex = propertiesMap.get(schemaName);
            const relationsByEntityIndex = this.utils.ensureChildArray(relationsMap, schemaName);
            const referencesForSchema = schemaReferenceMap.get(schemaName);
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
                        oneRelationColumns: [],
                        manyRelationColumns: []
                    };
                    property.relation = [relation];
                    relationEntity.relations.push(relation);
                    propertiesForEntity[index] = relation;
                    relations.push(relation);
                    allRelations.push(relation);
                }
            });
        }
        await this.schemaRelationDao.bulkCreate(allRelations, false, false);
        return relationsMap;
    }
    async generateSchemaColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, entitiesMapBySchemaName, propertiesMap) {
        const columnsMap = new Map();
        const allColumns = [];
        const allPropertyColumns = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const schemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
            const entitiesForSchema = entitiesMapBySchemaName.get(schemaName);
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const propertiesForSchema = propertiesMap.get(schemaName);
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
                        tableIndex,
                        schemaVersionId: schemaVersion.id,
                        idIndex: idColumndIndex,
                        isGenerated: jsonColumn.isGenerated,
                        allocationSize: jsonColumn.allocationSize,
                        name: jsonColumn.name,
                        notNull: jsonColumn.notNull,
                        type: jsonColumn.type,
                        propertyColumns: [],
                        oneRelationColumns: [],
                        manyRelationColumns: []
                    };
                    allColumns.push(column);
                    entity.columns.push(column);
                    entity.columnMap[column.name] = column;
                    if (idColumndIndex || idColumndIndex === 0) {
                        entity.idColumns[idColumndIndex] = column;
                        entity.idColumnMap[column.name] = column;
                    }
                    jsonColumn.propertyRefs.forEach((propertyReference) => {
                        const property = propertiesForEntity[propertyReference.index];
                        const propertyColumn = {
                            column,
                            property
                        };
                        allPropertyColumns.push(propertyColumn);
                        column.propertyColumns.push(propertyColumn);
                        property.propertyColumns.push(propertyColumn);
                    });
                });
            });
        }
        await this.schemaColumnDao.bulkCreate(allColumns, false, false);
        await this.schemaPropertyColumnDao.bulkCreate(allPropertyColumns, false, false);
        return columnsMap;
    }
    async generateSchemaRelationColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, schemaReferenceMap, relationsMap, columnsMap) {
        const allRelationColumns = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const columnsForSchema = columnsMap.get(schemaName);
            const relationsForSchema = relationsMap.get(schemaName);
            const schemaReferencesForSchema = schemaReferenceMap.get(schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const columnsForEntity = columnsForSchema[tableIndex];
                const relationsForEntity = relationsForSchema[tableIndex];
                jsonEntity.columns.forEach((jsonColumn, index) => {
                    const manyColumn = columnsForEntity[index];
                    const relationColumns = [];
                    jsonColumn.manyRelationColumnRefs.forEach((jsonRelationColumn) => {
                        const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex];
                        if (!manyRelation.manyRelationColumns) {
                            manyRelation.manyRelationColumns = [];
                        }
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
                        if (!jsonRelationColumn.oneSchemaIndex
                            && !oneColumn.oneRelationColumns) {
                            oneColumn.oneRelationColumns = [];
                        }
                        const oneRelation = oneTable.relations[jsonRelationColumn.oneRelationIndex];
                        if (!jsonRelationColumn.oneSchemaIndex
                            && !oneRelation.oneRelationColumns) {
                            oneRelation.oneRelationColumns = [];
                        }
                        const relationColumn = {
                            manyColumn,
                            manyRelation,
                            oneColumn,
                            oneRelation
                        };
                        manyRelation.manyRelationColumns.push(relationColumn);
                        if (!jsonRelationColumn.oneSchemaIndex) {
                            oneColumn.oneRelationColumns.push(relationColumn);
                            oneRelation.oneRelationColumns.push(relationColumn);
                        }
                        relationColumns.push(relationColumn);
                        allRelationColumns.push(relationColumn);
                    });
                    manyColumn.manyRelationColumns = relationColumns;
                });
            });
        }
        if (allRelationColumns.length) {
            await this.schemaRelationColumnDao.bulkCreate(allRelationColumns, false, false);
        }
        return columnsMap;
    }
};
SchemaRecorder = __decorate([
    typedi_1.Service(ground_control_1.SchemaUtilsToken),
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
    __param(10, typedi_1.Inject(ground_control_1.SchemaUtilsToken)),
    __param(11, typedi_1.Inject(traffic_pattern_1.SchemaVersionDaoToken)),
    __param(12, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], SchemaRecorder);
exports.SchemaRecorder = SchemaRecorder;
//# sourceMappingURL=SchemaRecorder.js.map