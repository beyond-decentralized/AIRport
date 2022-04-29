export class DdlObjectLinker {
    link(allDdlObjects) {
        const { all, allApplicationVersionsByIds, added } = allDdlObjects;
        const { latestApplicationVersions, properties, relations, applicationReferences, applications } = added;
        this.linkDomainsAndApplicationsAndVersions(allApplicationVersionsByIds, all.domains, applications, latestApplicationVersions, applicationReferences);
        const entityArrayById = this.linkEntities(allApplicationVersionsByIds, all.entities, added.entities);
        const { propertyMapById, relationMapById } = this.linkPropertiesAndRelations(properties, relations, entityArrayById);
        this.linkColumns(propertyMapById, relationMapById, allDdlObjects, entityArrayById);
    }
    linkDomainsAndApplicationsAndVersions(allApplicationVersionsByIds, domains, applications, latestApplicationVersions, applicationReferences) {
        const domainMapById = new Map();
        domains.forEach((domain) => {
            domainMapById.set(domain.id, domain);
        });
        const applicationMapByIndex = new Map();
        applications.forEach((application) => {
            applicationMapByIndex.set(application.index, application);
            const domain = domainMapById.get(application.domain.id);
            application.domain = domain;
            domain.applications.push(application);
        });
        latestApplicationVersions.forEach((applicationVersion) => {
            const application = applicationMapByIndex.get(applicationVersion.application.index);
            let applicationCurrentVersion = {
                application,
                applicationVersion
            };
            application.currentVersion = [applicationCurrentVersion];
            application.versions = [applicationVersion];
            applicationVersion.application = application;
            applicationVersion.entities = [];
            applicationVersion.references = [];
            applicationVersion.referencedBy = [];
            applicationVersion.entityMapByName = {};
            applicationVersion.referencesMapByName = {};
            applicationVersion.referencedByMapByName = {};
        });
        applicationReferences.forEach((applicationReference) => {
            const ownApplicationVersion = allApplicationVersionsByIds[applicationReference.ownApplicationVersion.id];
            const referencedApplicationVersion = allApplicationVersionsByIds[applicationReference.referencedApplicationVersion.id];
            ownApplicationVersion.references[applicationReference.index] = applicationReference;
            ownApplicationVersion.referencesMapByName[referencedApplicationVersion.application.fullName] = applicationReference;
            referencedApplicationVersion.referencedBy.push(applicationReference);
            referencedApplicationVersion.referencedByMapByName[ownApplicationVersion.application.fullName] = applicationReference;
            applicationReference.ownApplicationVersion = ownApplicationVersion;
            applicationReference.referencedApplicationVersion = referencedApplicationVersion;
        });
    }
    linkEntities(allApplicationVersionsByIds, allEntities, // All of the entities of newly created applications
    addedEntities // All of the entities of newly created applications
    // from the latest available versions
    ) {
        const entityArrayById = [];
        allEntities.forEach((entity) => {
            entityArrayById[entity.id] = entity;
        });
        addedEntities.forEach((entity) => {
            const applicationVersion = allApplicationVersionsByIds[entity.applicationVersion.id];
            entity.applicationVersion = applicationVersion;
            applicationVersion.entities[entity.index] = entity;
            applicationVersion.entityMapByName[entity.name] = entity;
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
    linkPropertiesAndRelations(properties, relations, entityArrayById) {
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
                relationEntity = this.terminalStore.getAllEntities()[relation.relationEntity.id];
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
    linkColumns(propertyMapById, relationMapById, allDdlObjects, entityArrayById) {
        const columnMapById = new Map();
        allDdlObjects.all.columns.forEach((column) => {
            columnMapById.set(column.id, column);
        });
        allDdlObjects.added.columns.forEach((column) => {
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
        allDdlObjects.added.propertyColumns.forEach((propertyColumn) => {
            const column = columnMapById.get(propertyColumn.column.id);
            column.propertyColumns.push(propertyColumn);
            const property = propertyMapById.get(propertyColumn.property.id);
            property.propertyColumns.push(propertyColumn);
            propertyColumn.column = column;
            propertyColumn.property = property;
        });
        allDdlObjects.added.relationColumns.forEach((relationColumn) => {
            let manyColumn = columnMapById.get(relationColumn.manyColumn.id);
            if (!manyColumn) {
                manyColumn = this.terminalStore.getAllColumns()[relationColumn.manyColumn.id];
            }
            manyColumn.manyRelationColumns.push(relationColumn);
            let oneColumn = columnMapById.get(relationColumn.oneColumn.id);
            if (!oneColumn) {
                oneColumn = this.terminalStore.getAllColumns()[relationColumn.oneColumn.id];
            }
            oneColumn.oneRelationColumns.push(relationColumn);
            let manyRelation;
            if (relationColumn.manyRelation && relationColumn.manyRelation.id) {
                manyRelation = relationMapById.get(relationColumn.manyRelation.id);
                if (!manyRelation) {
                    manyRelation = this.terminalStore.getAllRelations()[relationColumn.manyRelation.id];
                }
                manyRelation.manyRelationColumns.push(relationColumn);
            }
            let oneRelation;
            if (relationColumn.oneRelation && relationColumn.oneRelation.id) {
                oneRelation = relationMapById.get(relationColumn.oneRelation.id);
                if (!oneRelation) {
                    oneRelation = this.terminalStore.getAllRelations()[relationColumn.oneRelation.id];
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
//# sourceMappingURL=DdlObjectLinker.js.map