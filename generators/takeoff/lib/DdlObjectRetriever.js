"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const diTokens_1 = require("./diTokens");
class DdlObjectRetriever {
    constructor() {
        di_1.DI.get((domainDao, schemaColumnDao, schemaDao, schemaEntityDao, schemaPropertyColumnDao, schemaPropertyDao, schemaReferenceDao, schemaRelationColumnDao, schemaRelationDao, schemaVersionDao) => {
            this.domainDao = domainDao;
            this.schemaColumnDao = schemaColumnDao;
            this.schemaDao = schemaDao;
            this.schemaEntityDao = schemaEntityDao;
            this.schemaPropertyColumnDao = schemaPropertyColumnDao;
            this.schemaPropertyDao = schemaPropertyDao;
            this.schemaReferenceDao = schemaReferenceDao;
            this.schemaRelationColumnDao = schemaRelationColumnDao;
            this.schemaRelationDao = schemaRelationDao;
            this.schemaVersionDao = schemaVersionDao;
        }, territory_1.DOMAIN_DAO, traffic_pattern_1.SCHEMA_COLUMN_DAO, traffic_pattern_1.SCHEMA_DAO, traffic_pattern_1.SCHEMA_ENTITY_DAO, traffic_pattern_1.SCHEMA_PROPERTY_COLUMN_DAO, traffic_pattern_1.SCHEMA_PROPERTY_DAO, traffic_pattern_1.SCHEMA_REFERENCE_DAO, traffic_pattern_1.SCHEMA_RELATION_COLUMN_DAO, traffic_pattern_1.SCHEMA_RELATION_DAO, traffic_pattern_1.SCHEMA_VERSION_DAO);
    }
    async retrieveDdlObjects() {
        const schemas = await this.schemaDao
            .findAllActive();
        const schemaIndexes = [];
        const domainIdSet = new Set();
        schemas.forEach(schema => {
            schemaIndexes.push(schema.index);
            domainIdSet.add(schema.domain.id);
        });
        schemas.sort((schema1, schema2) => {
            return schema1.index - schema2.index;
        });
        const domains = await this.domainDao
            .findByIdIn(Array.from(domainIdSet));
        const latestSchemaVersions = await this.schemaVersionDao
            .findAllLatestForSchemaIndexes(schemaIndexes);
        const latestSchemaVersionIds = latestSchemaVersions.map(schemaVersion => schemaVersion.id);
        const schemaReferences = await this.schemaReferenceDao
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entities = await this.schemaEntityDao
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entityIds = entities.map(entity => entity.id);
        const properties = await this.schemaPropertyDao
            .findAllForEntities(entityIds);
        const propertyIds = properties.map(property => property.id);
        const relations = await this.schemaRelationDao
            .findAllForProperties(propertyIds);
        const columns = await this.schemaColumnDao
            .findAllForEntities(entityIds);
        const columnIds = columns.map(column => column.id);
        const propertyColumns = await this.schemaPropertyColumnDao
            .findAllForColumns(columnIds);
        const relationColumns = await this.schemaRelationColumnDao
            .findAllForColumns(columnIds);
        return {
            columns,
            domains,
            entities,
            latestSchemaVersions,
            properties,
            propertyColumns,
            relationColumns,
            relations,
            schemaReferences,
            schemas
        };
    }
}
exports.DdlObjectRetriever = DdlObjectRetriever;
di_1.DI.set(diTokens_1.DDL_OBJECT_RETRIEVER, DdlObjectRetriever);
//# sourceMappingURL=DdlObjectRetriever.js.map