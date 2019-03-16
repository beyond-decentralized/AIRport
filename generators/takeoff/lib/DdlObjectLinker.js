"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("./InjectionTokens");
let DdlObjectLinker = class DdlObjectLinker {
    link(ddlObjects) {
        const { columns, domains, entities, latestSchemaVersions, properties, propertyColumns, relationColumns, relations, schemaReferences, schemas } = ddlObjects;
        const schemaVersionMapById = this.linkDomainsAndSchemasAndVersions(domains, schemas, latestSchemaVersions, schemaReferences);
        const entityMapById = this.linkEntities(schemaVersionMapById, entities);
        const { propertyMapById, relationMapById } = this.linkPropertiesAndRelations(entityMapById, properties, relations);
        this.linkColumns(entityMapById, propertyMapById, relationMapById, columns, propertyColumns, relationColumns);
    }
    linkDomainsAndSchemasAndVersions(domains, schemas, latestSchemaVersions, schemaReferences) {
        const domainMapById = new Map();
        domains.forEach((domain) => {
            domainMapById.set(domain.id, domain);
            domain.schemas = [];
        });
        const schemaMapByIndex = new Map();
        schemas.forEach((schema) => {
            schemaMapByIndex.set(schema.index, schema);
            const domain = domainMapById.get(schema.domain.id);
            schema.domain = domain;
            domain.schemas.push(schema);
        });
        const schemaVersionMapById = new Map();
        latestSchemaVersions.forEach((schemaVersion) => {
            schemaVersionMapById.set(schemaVersion.id, schemaVersion);
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
            const ownSchemaVersion = schemaVersionMapById.get(schemaReference.ownSchemaVersion.id);
            const referencedSchemaVersion = schemaVersionMapById.get(schemaReference.referencedSchemaVersion.id);
            ownSchemaVersion.references[schemaReference.index] = schemaReference;
            ownSchemaVersion.referencesMapByName[referencedSchemaVersion.schema.name]
                = schemaReference;
            referencedSchemaVersion.referencedBy.push(schemaReference);
            referencedSchemaVersion.referencedByMapByName[ownSchemaVersion.schema.name]
                = schemaReference;
            schemaReference.ownSchemaVersion = ownSchemaVersion;
            schemaReference.referencedSchemaVersion = referencedSchemaVersion;
        });
        return schemaVersionMapById;
    }
    linkEntities(schemaVersionMapById, entities) {
        const entityMapById = new Map();
        entities.forEach((entity) => {
            const schemaVersion = schemaVersionMapById.get(entity.schemaVersion.id);
            entity.schemaVersion = schemaVersion;
            schemaVersion.entities[entity.index]
                = entity;
            schemaVersion.entityMapByName[entity.name]
                = entity;
            entity.columns = [];
            entity.properties = [];
            entity.relations = [];
            entity.relationReferences = [];
            entity.columnMap = {};
            entity.idColumns = [];
            entity.idColumnMap = {};
            entity.propertyMap = {};
            entityMapById.set(entity.id, entity);
        });
        return entityMapById;
    }
    linkPropertiesAndRelations(entityMapById, properties, relations) {
        const propertyMapById = new Map();
        properties.forEach((property) => {
            const entity = entityMapById.get(property.entity.id);
            entity.properties[property.index] = property;
            entity.propertyMap[property.name] = property;
            property.entity = entity;
            property.propertyColumns = [];
            propertyMapById.set(property.id, property);
        });
        const relationMapById = new Map();
        relations.forEach((relation) => {
            const entity = entityMapById.get(relation.entity.id);
            entity.relations[relation.index] = relation;
            const relationEntity = entityMapById.get(relation.relationEntity.id);
            relationEntity.relationReferences.push(relation);
            const property = propertyMapById.get(relation.id);
            relation.property = property;
            property.relation = [relation];
            relation.entity = entity;
            relation.relationEntity = relationEntity;
            relation.manyRelationColumns = [];
            relation.oneRelationColumns = [];
        });
        return {
            propertyMapById,
            relationMapById
        };
    }
    linkColumns(entityMapById, propertyMapById, relationMapById, columns, propertyColumns, relationColumns) {
        const columnMapById = new Map();
        columns.forEach((column) => {
            columnMapById.set(column.id, column);
            const entity = entityMapById.get(column.entity.id);
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
            const manyRelation = relationMapById.get(relationColumn.manyRelation.id);
            manyRelation.manyRelationColumns.push(relationColumn);
            const oneRelation = relationMapById.get(relationColumn.oneRelation.id);
            oneRelation.oneRelationColumns.push(relationColumn);
            relationColumn.manyColumn = manyColumn;
            relationColumn.manyRelation = manyRelation;
            relationColumn.oneColumn = oneColumn;
            relationColumn.oneRelation = oneRelation;
        });
    }
};
DdlObjectLinker = __decorate([
    typedi_1.Service(InjectionTokens_1.DdlObjectLinkerToken)
], DdlObjectLinker);
exports.DdlObjectLinker = DdlObjectLinker;
//# sourceMappingURL=DdlObjectLinker.js.map