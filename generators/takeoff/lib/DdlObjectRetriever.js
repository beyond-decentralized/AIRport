"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const diTokens_1 = require("./diTokens");
class DdlObjectRetriever {
    constructor() {
        this.lastIds = {
            columns: 0,
            domains: 0,
            entities: 0,
            properties: 0,
            propertyColumns: 0,
            relations: 0,
            relationColumns: 0,
            schemas: 0,
            schemaVersions: 0
        };
    }
    async retrieveDdlObjects() {
        const [schemaDao, schemaVersionDao, schemaReferenceDao, schemaEntityDao, schemaPropertyDao, schemaRelationDao, schemaColumnDao, schemaPropertyColumnDao, schemaRelationColumnDao] = await di_1.DI.get(traffic_pattern_1.SCHEMA_DAO, traffic_pattern_1.SCHEMA_VERSION_DAO, traffic_pattern_1.SCHEMA_REFERENCE_DAO, traffic_pattern_1.SCHEMA_ENTITY_DAO, traffic_pattern_1.SCHEMA_PROPERTY_DAO, traffic_pattern_1.SCHEMA_RELATION_DAO, traffic_pattern_1.SCHEMA_COLUMN_DAO, traffic_pattern_1.SCHEMA_PROPERTY_COLUMN_DAO, traffic_pattern_1.SCHEMA_RELATION_COLUMN_DAO);
        const schemas = await schemaDao.findAllActive();
        const schemaIndexes = [];
        const domainIdSet = new Set();
        schemas.forEach(schema => {
            schemaIndexes.push(schema.index);
            domainIdSet.add(schema.domain.id);
        });
        schemas.sort((schema1, schema2) => {
            return schema1.index - schema2.index;
        });
        const domains = await (await this.domainDao()).findByIdIn(Array.from(domainIdSet));
        const allSchemaVersions = await schemaVersionDao
            .findAllActiveOrderBySchemaIndexAndId();
        let lastSchemaIndex;
        const allSchemaVersionsByIds = [];
        const latestSchemaVersions = [];
        const schemaVersions = [];
        for (const schemaVersion of allSchemaVersions) {
            if (schemaVersion.schema.index !== lastSchemaIndex) {
                latestSchemaVersions.push(schemaVersion);
            }
            allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
            lastSchemaIndex = schemaVersion.schema.index;
            schemaVersions.push(schemaVersion);
        }
        const latestSchemaVersionIds = latestSchemaVersions.map(schemaVersion => schemaVersion.id);
        const schemaReferences = await schemaReferenceDao
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entities = await schemaEntityDao
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entityIds = entities.map(entity => entity.id);
        const properties = await schemaPropertyDao
            .findAllForEntities(entityIds);
        const propertyIds = properties.map(property => property.id);
        const relations = await schemaRelationDao
            .findAllForProperties(propertyIds);
        const columns = await schemaColumnDao
            .findAllForEntities(entityIds);
        const columnIds = columns.map(column => column.id);
        const propertyColumns = await schemaPropertyColumnDao
            .findAllForColumns(columnIds);
        const relationColumns = await schemaRelationColumnDao
            .findAllForColumns(columnIds);
        this.lastIds = {
            columns: columns.length,
            domains: domains.length,
            entities: entities.length,
            properties: properties.length,
            propertyColumns: propertyColumns.length,
            relationColumns: relationColumns.length,
            relations: relations.length,
            schemas: schemas.length,
            schemaVersions: schemaVersions.length,
        };
        return {
            allDomains: domains,
            allSchemas: schemas,
            allSchemaVersionsByIds,
            columns,
            domains,
            entities,
            latestSchemaVersions,
            properties,
            propertyColumns,
            relationColumns,
            relations,
            schemaReferences,
            schemas,
            schemaVersions
        };
    }
}
exports.DdlObjectRetriever = DdlObjectRetriever;
di_1.DI.set(diTokens_1.DDL_OBJECT_RETRIEVER, DdlObjectRetriever);
//# sourceMappingURL=DdlObjectRetriever.js.map