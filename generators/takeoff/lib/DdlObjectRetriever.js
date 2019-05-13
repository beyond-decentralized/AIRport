"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const diTokens_1 = require("./diTokens");
class DdlObjectRetriever {
    constructor() {
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
    async retrieveDdlObjects() {
        const schemas = await (await this.schemaDao).findAllActive();
        const schemaIndexes = [];
        const domainIdSet = new Set();
        schemas.forEach(schema => {
            schemaIndexes.push(schema.index);
            domainIdSet.add(schema.domain.id);
        });
        schemas.sort((schema1, schema2) => {
            return schema1.index - schema2.index;
        });
        const domains = await (await this.domainDao).findByIdIn(Array.from(domainIdSet));
        const allSchemaVersions = await (await this.schemaVersionDao)
            .findAllActiveOrderBySchemaIndexAndId();
        let lastSchemaIndex;
        const latestSchemaVersions = [];
        const allSchemaVersionsByIds = [];
        for (const schemaVersion of allSchemaVersions) {
            if (schemaVersion.schema.index !== lastSchemaIndex) {
                latestSchemaVersions.push(schemaVersion);
            }
            allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
            lastSchemaIndex = schemaVersion.schema.index;
        }
        const latestSchemaVersionIds = latestSchemaVersions.map(schemaVersion => schemaVersion.id);
        const schemaReferences = await (await this.schemaReferenceDao)
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entities = await (await this.schemaEntityDao)
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entityIds = entities.map(entity => entity.id);
        const properties = await (await this.schemaPropertyDao)
            .findAllForEntities(entityIds);
        const propertyIds = properties.map(property => property.id);
        const relations = await (await this.schemaRelationDao)
            .findAllForProperties(propertyIds);
        const columns = await (await this.schemaColumnDao)
            .findAllForEntities(entityIds);
        const columnIds = columns.map(column => column.id);
        const propertyColumns = await (await this.schemaPropertyColumnDao)
            .findAllForColumns(columnIds);
        const relationColumns = await (await this.schemaRelationColumnDao)
            .findAllForColumns(columnIds);
        return {
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
            schemas
        };
    }
}
exports.DdlObjectRetriever = DdlObjectRetriever;
di_1.DI.set(diTokens_1.DDL_OBJECT_RETRIEVER, DdlObjectRetriever);
//# sourceMappingURL=DdlObjectRetriever.js.map