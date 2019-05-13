"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const diTokens_1 = require("../diTokens");
class SchemaRecorder {
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
    async record(ddlObjects, normalOperation) {
        if (normalOperation) {
            await this.normalRecord(ddlObjects, await this.domainDao, await this.schemaDao, await this.schemaVersionDao, await this.schemaReferenceDao, await this.schemaEntityDao, await this.schemaPropertyDao, await this.schemaRelationDao, await this.schemaColumnDao, await this.schemaPropertyColumnDao, await this.schemaRelationColumnDao);
        }
        else {
            await this.bootstrapRecord(ddlObjects, await this.domainDao, await this.schemaDao, await this.schemaVersionDao, await this.schemaReferenceDao, await this.schemaEntityDao, await this.schemaPropertyDao, await this.schemaRelationDao, await this.schemaColumnDao, await this.schemaPropertyColumnDao, await this.schemaRelationColumnDao);
        }
    }
    async normalRecord(ddlObjects, domainDao, schemaDao, schemaVersionDao, schemaReferenceDao, schemaEntityDao, schemaPropertyDao, schemaRelationDao, schemaColumnDao, schemaPropertyColumnDao, schemaRelationColumnDao) {
        await domainDao.bulkCreate(ddlObjects.domains, false, false);
        await schemaDao.bulkCreate(ddlObjects.schemas, false, false);
        await schemaVersionDao.bulkCreate(ddlObjects.schemaVersions, false, false);
        await schemaReferenceDao.bulkCreate(ddlObjects.schemaReferences, false, false);
        await schemaEntityDao.bulkCreate(ddlObjects.entities, false, false);
        await schemaPropertyDao.bulkCreate(ddlObjects.properties, false, false);
        await schemaRelationDao.bulkCreate(ddlObjects.relations, false, false);
        await schemaColumnDao.bulkCreate(ddlObjects.columns, false, false);
        await schemaPropertyColumnDao.bulkCreate(ddlObjects.propertyColumns, false, false);
        await schemaRelationColumnDao.bulkCreate(ddlObjects.relationColumns, false, false);
    }
    async bootstrapRecord(ddlObjects, domainDao, schemaDao, schemaVersionDao, schemaReferenceDao, schemaEntityDao, schemaPropertyDao, schemaRelationDao, schemaColumnDao, schemaPropertyColumnDao, schemaRelationColumnDao) {
        await this.bulkCreate(domainDao, ddlObjects.domains);
        await this.bulkCreate(schemaDao, ddlObjects.schemas);
        await this.bulkCreate(schemaVersionDao, ddlObjects.latestSchemaVersions);
        await this.bulkCreate(schemaReferenceDao, ddlObjects.schemaReferences);
        await this.bulkCreate(schemaEntityDao, ddlObjects.entities);
        await this.bulkCreate(schemaPropertyDao, ddlObjects.properties);
        await this.bulkCreate(schemaRelationDao, ddlObjects.relations);
        await this.bulkCreate(schemaColumnDao, ddlObjects.columns);
        await this.bulkCreate(schemaPropertyColumnDao, ddlObjects.propertyColumns);
        await this.bulkCreate(schemaRelationColumnDao, ddlObjects.relationColumns);
    }
    async bulkCreate(dao, entities) {
        const entityDbFacade = dao.db;
        const dbFacade = entityDbFacade.common;
        await dbFacade.bulkCreate(entityDbFacade.dbEntity, entities, false, false, false);
    }
}
exports.SchemaRecorder = SchemaRecorder;
di_1.DI.set(diTokens_1.SCHEMA_RECORDER, SchemaRecorder);
//# sourceMappingURL=SchemaRecorder.js.map