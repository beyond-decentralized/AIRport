import { DI } from '@airport/di';
import { DDL_OBJECT_LINKER } from './tokens';
export class DdlObjectLinker {
    link(ddlObjects, terminalStore) {
        const { allDomains, allSchemaVersionsByIds, columns, entities, latestSchemaVersions, properties, propertyColumns, relationColumns, relations, schemaReferences, schemas } = ddlObjects;
        this.linkDomainsAndSchemasAndVersions(allSchemaVersionsByIds, allDomains, schemas, latestSchemaVersions, schemaReferences);
        const entityArrayById = this.linkEntities(allSchemaVersionsByIds, entities);
        const { propertyMapById, relationMapById } = this.linkPropertiesAndRelations(properties, relations, entityArrayById, terminalStore);
        this.linkColumns(propertyMapById, relationMapById, columns, propertyColumns, relationColumns, entityArrayById, terminalStore);
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
            ownSchemaVersion.referencesMapByName[referencedSchemaVersion.schema.name] = schemaReference;
            referencedSchemaVersion.referencedBy.push(schemaReference);
            referencedSchemaVersion.referencedByMapByName[ownSchemaVersion.schema.name] = schemaReference;
            schemaReference.ownSchemaVersion = ownSchemaVersion;
            schemaReference.referencedSchemaVersion = referencedSchemaVersion;
        });
    }
    linkEntities(allSchemaVersionsByIds, entities // All of the entities of newly created schemas
    // from the latest available versions
    ) {
        const entityArrayById = [];
        entities.forEach((entity) => {
            const schemaVersion = allSchemaVersionsByIds[entity.schemaVersion.id];
            entity.schemaVersion = schemaVersion;
            schemaVersion.entities[entity.index] = entity;
            schemaVersion.entityMapByName[entity.name] = entity;
            entityArrayById[entity.id] = entity;
            entity.columns = [];
            entity.properties = [];
            entity.relations = [];
            entity.relationReferences = [];
            entity.columnMap = {};
            entity.idColumns = [];
            entity.idColumnMap = {};
            entity.propertyMap = {};
        });
        return entityArrayById;
    }
    linkPropertiesAndRelations(properties, relations, entityArrayById, terminalStore) {
        const propertyMapById = new Map();
        properties.forEach((property) => {
            // Entity is already property wired in
            const entity = entityArrayById[property.entity.id];
            entity.properties[property.index] = property;
            entity.propertyMap[property.name] = property;
            property.entity = entity;
            property.propertyColumns = [];
            propertyMapById.set(property.id, property);
        });
        const relationMapById = new Map();
        relations.forEach((relation) => {
            const entity = entityArrayById[relation.entity.id];
            entity.relations[relation.index] = relation;
            let relationEntity = entityArrayById[relation.relationEntity.id];
            if (!relationEntity) {
                relationEntity = terminalStore.getAllEntities()[relation.relationEntity.id];
            }
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
            propertyMapById, relationMapById
        };
    }
    linkColumns(propertyMapById, relationMapById, columns, propertyColumns, relationColumns, entityArrayById, terminalStore) {
        const columnMapById = new Map();
        columns.forEach((column) => {
            columnMapById.set(column.id, column);
            const entity = entityArrayById[column.entity.id];
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
            let manyColumn = columnMapById.get(relationColumn.manyColumn.id);
            if (!manyColumn) {
                manyColumn = terminalStore.getAllColumns()[relationColumn.manyColumn.id];
            }
            manyColumn.manyRelationColumns.push(relationColumn);
            let oneColumn = columnMapById.get(relationColumn.oneColumn.id);
            if (!oneColumn) {
                oneColumn = terminalStore.getAllColumns()[relationColumn.oneColumn.id];
            }
            oneColumn.oneRelationColumns.push(relationColumn);
            let manyRelation;
            if (relationColumn.manyRelation && relationColumn.manyRelation.id) {
                manyRelation = relationMapById.get(relationColumn.manyRelation.id);
                if (!manyRelation) {
                    manyRelation = terminalStore.getAllRelations()[relationColumn.manyRelation.id];
                }
                manyRelation.manyRelationColumns.push(relationColumn);
            }
            let oneRelation;
            if (relationColumn.oneRelation && relationColumn.oneRelation.id) {
                oneRelation = relationMapById.get(relationColumn.oneRelation.id);
                if (!oneRelation) {
                    oneRelation = terminalStore.getAllRelations()[relationColumn.oneRelation.id];
                }
                oneRelation.oneRelationColumns.push(relationColumn);
            }
            relationColumn.manyColumn = manyColumn;
            relationColumn.manyRelation = manyRelation;
            relationColumn.oneColumn = oneColumn;
            relationColumn.oneRelation = oneRelation;
        });
    }
}
DI.set(DDL_OBJECT_LINKER, DdlObjectLinker);
//# sourceMappingURL=DdlObjectLinker.js.map