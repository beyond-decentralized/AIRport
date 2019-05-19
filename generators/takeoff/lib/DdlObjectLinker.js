"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("./diTokens");
class DdlObjectLinker {
    link(ddlObjects) {
        const { allSchemaVersionsByIds, columns, domains, entities, latestSchemaVersions, properties, propertyColumns, relationColumns, relations, schemaReferences, schemas } = ddlObjects;
        this.linkDomainsAndSchemasAndVersions(allSchemaVersionsByIds, domains, schemas, latestSchemaVersions, schemaReferences);
        const entityMapById = this.linkEntities(allSchemaVersionsByIds, entities);
        const { propertyMapById, relationMapById } = this.linkPropertiesAndRelations(properties, relations);
        this.linkColumns(propertyMapById, relationMapById, columns, propertyColumns, relationColumns);
    }
    linkDomainsAndSchemasAndVersions(allSchemaVersionsByIds, domains, schemas, latestSchemaVersions, schemaReferences) {
        const domainMapById = new Map();
        domains.forEach((domain) => {
            domainMapById.set(domain.id, domain);
        });
        const schemaMapByIndex = new Map();
        schemas.forEach((schema) => {
            schemaMapByIndex.set(schema.index, schema);
            const domain = domainMapById.get(schema.domain.id);
            schema.domain = domain;
            domain.schemas.push(schema);
        });
        latestSchemaVersions.forEach((schemaVersion) => {
            const schema = schemaMapByIndex.get(schemaVersion.schema.index);
            schema.currentVersion = schemaVersion;
            schema.versions = [schemaVersion];
            schemaVersion.schema = schema;
            schemaVersion.entities = [];
            schemaVersion.references = [];
            schemaVersion.referencedBy = [];
            schemaVersion.entityMapByName = {};
            schemaVersion.referencesMapByName = {};
            schemaVersion.referencedByMapByName = {};
        });
        schemaReferences.forEach((schemaReference) => {
            const ownSchemaVersion = allSchemaVersionsByIds[schemaReference.ownSchemaVersion.id];
            const referencedSchemaVersion = allSchemaVersionsByIds[schemaReference.referencedSchemaVersion.id];
            ownSchemaVersion.references[schemaReference.index] = schemaReference;
            ownSchemaVersion.referencesMapByName[referencedSchemaVersion.schema.name]
                = schemaReference;
            referencedSchemaVersion.referencedBy.push(schemaReference);
            referencedSchemaVersion.referencedByMapByName[ownSchemaVersion.schema.name]
                = schemaReference;
            schemaReference.ownSchemaVersion = ownSchemaVersion;
            schemaReference.referencedSchemaVersion = referencedSchemaVersion;
        });
    }
    linkEntities(allSchemaVersionsByIds, entities // All of the entities of newly created schemas
    // from the latest available versions
    ) {
        entities.forEach((entity) => {
            const schemaVersion = allSchemaVersionsByIds[entity.schemaVersion.id];
            entity.schemaVersion = schemaVersion;
            schemaVersion.entities[entity.index] = entity;
            schemaVersion.entityMapByName[entity.name] = entity;
            entity.columns = [];
            entity.properties = [];
            entity.relations = [];
            entity.relationReferences = [];
            entity.columnMap = {};
            entity.idColumns = [];
            entity.idColumnMap = {};
            entity.propertyMap = {};
        });
    }
    linkPropertiesAndRelations(properties, relations) {
        const propertyMapById = new Map();
        properties.forEach((property) => {
            // Entity is already property wired in
            const entity = property.entity;
            entity.properties[property.index] = property;
            entity.propertyMap[property.name] = property;
            property.entity = entity;
            property.propertyColumns = [];
            propertyMapById.set(property.id, property);
        });
        const relationMapById = new Map();
        relations.forEach((relation) => {
            const entity = relation.entity;
            entity.relations[relation.index] = relation;
            const relationEntity = relation.relationEntity;
            relationEntity.relationReferences.push(relation);
            const property = propertyMapById.get(relation.property.id);
            relation.property = property;
            property.relation = [relation];
            relation.entity = entity;
            relation.relationEntity = relationEntity;
            relation.manyRelationColumns = [];
            relation.oneRelationColumns = [];
            relationMapById.set(relation.id, relation);
        });
        return {
            propertyMapById,
            relationMapById
        };
    }
    linkColumns(propertyMapById, relationMapById, columns, propertyColumns, relationColumns) {
        const columnMapById = new Map();
        columns.forEach((column) => {
            columnMapById.set(column.id, column);
            const entity = column.entity;
            entity.columns[column.index] = column;
            entity.columnMap[column.name] = column;
            if (column.idIndex || column.idIndex === 0) {
                entity.idColumns[column.idIndex] = column;
                entity.idColumnMap[column.name] = column;
            }
            column.entity = entity;
        });
        propertyColumns.forEach((propertyColumn) => {
            const column = columnMapById.get(propertyColumn.column.id);
            column.propertyColumns.push(propertyColumn);
            const property = propertyMapById.get(propertyColumn.property.id);
            property.propertyColumns.push(propertyColumn);
            propertyColumn.column = column;
            propertyColumn.property = property;
        });
        relationColumns.forEach((relationColumn) => {
            const manyColumn = columnMapById.get(relationColumn.manyColumn.id);
            manyColumn.manyRelationColumns.push(relationColumn);
            const oneColumn = columnMapById.get(relationColumn.oneColumn.id);
            oneColumn.oneRelationColumns.push(relationColumn);
            let manyRelation;
            if (relationColumn.manyRelation) {
                manyRelation = relationMapById.get(relationColumn.manyRelation.id);
                manyRelation.manyRelationColumns.push(relationColumn);
            }
            let oneRelation;
            if (relationColumn.oneRelation) {
                oneRelation = relationMapById.get(relationColumn.oneRelation.id);
                oneRelation.oneRelationColumns.push(relationColumn);
            }
            relationColumn.manyColumn = manyColumn;
            relationColumn.manyRelation = manyRelation;
            relationColumn.oneColumn = oneColumn;
            relationColumn.oneRelation = oneRelation;
        });
    }
}
exports.DdlObjectLinker = DdlObjectLinker;
di_1.DI.set(diTokens_1.DDL_OBJECT_LINKER, DdlObjectLinker);
//# sourceMappingURL=DdlObjectLinker.js.map