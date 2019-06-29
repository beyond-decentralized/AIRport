"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const territory_1 = require("@airport/territory");
const tower_1 = require("@airport/tower");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const diTokens_1 = require("../diTokens");
class SchemaRecorder {
    async record(ddlObjects, normalOperation) {
        const [airDb, domainDao, schemaColumnDao, schemaDao, schemaEntityDao, schemaPropertyColumnDao, schemaPropertyDao, schemaReferenceDao, schemaRelationColumnDao, schemaRelationDao, schemaVersionDao] = await di_1.DI.get(air_control_1.AIR_DB, territory_1.DOMAIN_DAO, traffic_pattern_1.SCHEMA_COLUMN_DAO, traffic_pattern_1.SCHEMA_DAO, traffic_pattern_1.SCHEMA_ENTITY_DAO, traffic_pattern_1.SCHEMA_PROPERTY_COLUMN_DAO, traffic_pattern_1.SCHEMA_PROPERTY_DAO, traffic_pattern_1.SCHEMA_REFERENCE_DAO, traffic_pattern_1.SCHEMA_RELATION_COLUMN_DAO, traffic_pattern_1.SCHEMA_RELATION_DAO, traffic_pattern_1.SCHEMA_VERSION_DAO);
        await tower_1.transactional(async () => {
            // FIXME: add support for real schema versioning
            this.setDefaultVersioning(ddlObjects);
            if (normalOperation) {
                await this.normalRecord(ddlObjects, domainDao, schemaDao, schemaVersionDao, schemaReferenceDao, schemaEntityDao, schemaPropertyDao, schemaRelationDao, schemaColumnDao, schemaPropertyColumnDao, schemaRelationColumnDao);
            }
            else {
                await this.bootstrapRecord(airDb, ddlObjects, domainDao, schemaDao, schemaVersionDao, schemaReferenceDao, schemaEntityDao, schemaPropertyDao, schemaRelationDao, schemaColumnDao, schemaPropertyColumnDao, schemaRelationColumnDao);
            }
        });
    }
    async normalRecord(ddlObjects, domainDao, schemaDao, schemaVersionDao, schemaReferenceDao, schemaEntityDao, schemaPropertyDao, schemaRelationDao, schemaColumnDao, schemaPropertyColumnDao, schemaRelationColumnDao) {
        await domainDao.bulkCreate(ddlObjects.domains, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaDao.bulkCreate(ddlObjects.schemas, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaVersionDao.bulkCreate(ddlObjects.schemaVersions, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaReferenceDao.bulkCreate(ddlObjects.schemaReferences, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaEntityDao.bulkCreate(ddlObjects.entities, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaPropertyDao.bulkCreate(ddlObjects.properties, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaRelationDao.bulkCreate(ddlObjects.relations, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaColumnDao.bulkCreate(ddlObjects.columns, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaPropertyColumnDao.bulkCreate(ddlObjects.propertyColumns, ground_control_1.CascadeOverwrite.NEVER, false);
        await schemaRelationColumnDao.bulkCreate(ddlObjects.relationColumns, ground_control_1.CascadeOverwrite.NEVER, false);
    }
    setDefaultVersioning(ddlObjects) {
        for (const schemaReference of ddlObjects.schemaReferences) {
            schemaReference.deprecatedSinceVersion = null;
            schemaReference.removedInVersion = null;
            schemaReference.sinceVersion = schemaReference.ownSchemaVersion;
        }
        for (const entity of ddlObjects.entities) {
            entity.deprecatedSinceVersion = null;
            entity.removedInVersion = null;
            entity.sinceVersion = entity.schemaVersion;
        }
        for (const property of ddlObjects.properties) {
            property.deprecatedSinceVersion = null;
            property.removedInVersion = null;
            property.sinceVersion = property.entity.schemaVersion;
        }
        for (const relation of ddlObjects.relations) {
            relation.deprecatedSinceVersion = null;
            relation.removedInVersion = null;
            relation.sinceVersion = relation.entity.schemaVersion;
        }
        for (const column of ddlObjects.columns) {
            column.deprecatedSinceVersion = null;
            column.removedInVersion = null;
            column.sinceVersion = column.entity.schemaVersion;
        }
        for (const propertyColumn of ddlObjects.propertyColumns) {
            propertyColumn.deprecatedSinceVersion = null;
            propertyColumn.removedInVersion = null;
            propertyColumn.sinceVersion = propertyColumn.property.entity.schemaVersion;
        }
        for (const relationColumn of ddlObjects.relationColumns) {
            relationColumn.deprecatedSinceVersion = null;
            relationColumn.removedInVersion = null;
            relationColumn.sinceVersion = relationColumn.parentRelation.entity.schemaVersion;
        }
    }
    async bootstrapRecord(airDb, ddlObjects, domainDao, schemaDao, schemaVersionDao, schemaReferenceDao, schemaEntityDao, schemaPropertyDao, schemaRelationDao, schemaColumnDao, schemaPropertyColumnDao, schemaRelationColumnDao) {
        await this.bulkCreate(airDb, domainDao, ddlObjects.domains);
        await this.bulkCreate(airDb, schemaDao, ddlObjects.schemas);
        await this.bulkCreate(airDb, schemaVersionDao, ddlObjects.latestSchemaVersions);
        await this.bulkCreate(airDb, schemaReferenceDao, ddlObjects.schemaReferences);
        await this.bulkCreate(airDb, schemaEntityDao, ddlObjects.entities);
        await this.bulkCreate(airDb, schemaPropertyDao, ddlObjects.properties);
        await this.bulkCreate(airDb, schemaRelationDao, ddlObjects.relations);
        await this.bulkCreate(airDb, schemaColumnDao, ddlObjects.columns);
        await this.bulkCreate(airDb, schemaPropertyColumnDao, ddlObjects.propertyColumns);
        await this.bulkCreate(airDb, schemaRelationColumnDao, ddlObjects.relationColumns);
    }
    async bulkCreate(airDb, dao, entities) {
        await airDb.bulkCreate(dao.db.dbEntity, entities, ground_control_1.CascadeOverwrite.NEVER, false, false);
    }
}
exports.SchemaRecorder = SchemaRecorder;
di_1.DI.set(diTokens_1.SCHEMA_RECORDER, SchemaRecorder);
//# sourceMappingURL=SchemaRecorder.js.map