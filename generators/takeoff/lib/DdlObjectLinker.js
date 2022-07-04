var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let DdlObjectLinker = class DdlObjectLinker {
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
            domainMapById.set(domain._localId, domain);
        });
        const applicationMapByIndex = new Map();
        applications.forEach((application) => {
            applicationMapByIndex.set(application.index, application);
            const domain = domainMapById.get(application.domain._localId);
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
            const ownApplicationVersion = allApplicationVersionsByIds[applicationReference.ownApplicationVersion._localId];
            const referencedApplicationVersion = allApplicationVersionsByIds[applicationReference.referencedApplicationVersion._localId];
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
            entityArrayById[entity._localId] = entity;
        });
        addedEntities.forEach((entity) => {
            const applicationVersion = allApplicationVersionsByIds[entity.applicationVersion._localId];
            entity.applicationVersion = applicationVersion;
            applicationVersion.entities[entity.index] = entity;
            applicationVersion.entityMapByName[entity.name] = entity;
            entityArrayById[entity._localId] = entity;
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
            const entity = entityArrayById[property.entity._localId];
            entity.properties[property.index] = property;
            entity.propertyMap[property.name] = property;
            property.entity = entity;
            property.propertyColumns = [];
            propertyMapById.set(property._localId, property);
        });
        const relationMapById = new Map();
        relations.forEach((relation) => {
            const entity = entityArrayById[relation.entity._localId];
            entity.relations[relation.index] = relation;
            let relationEntity = entityArrayById[relation.relationEntity._localId];
            if (!relationEntity) {
                relationEntity = this.terminalStore.getAllEntities()[relation.relationEntity._localId];
            }
            relationEntity.relationReferences.push(relation);
            const property = propertyMapById.get(relation.property._localId);
            relation.property = property;
            property.relation = [relation];
            relation.entity = entity;
            relation.relationEntity = relationEntity;
            relation.manyRelationColumns = [];
            relation.oneRelationColumns = [];
            relationMapById.set(relation._localId, relation);
        });
        return {
            propertyMapById, relationMapById
        };
    }
    linkColumns(propertyMapById, relationMapById, allDdlObjects, entityArrayById) {
        const columnMapById = new Map();
        allDdlObjects.all.columns.forEach((column) => {
            columnMapById.set(column._localId, column);
        });
        allDdlObjects.added.columns.forEach((column) => {
            columnMapById.set(column._localId, column);
            const entity = entityArrayById[column.entity._localId];
            entity.columns[column.index] = column;
            entity.columnMap[column.name] = column;
            if (column.idIndex || column.idIndex === 0) {
                entity.idColumns[column.idIndex] = column;
                entity.idColumnMap[column.name] = column;
            }
            column.entity = entity;
        });
        allDdlObjects.added.propertyColumns.forEach((propertyColumn) => {
            const column = columnMapById.get(propertyColumn.column._localId);
            column.propertyColumns.push(propertyColumn);
            const property = propertyMapById.get(propertyColumn.property._localId);
            property.propertyColumns.push(propertyColumn);
            propertyColumn.column = column;
            propertyColumn.property = property;
        });
        allDdlObjects.added.relationColumns.forEach((relationColumn) => {
            let manyColumn = columnMapById.get(relationColumn.manyColumn._localId);
            if (!manyColumn) {
                manyColumn = this.terminalStore.getAllColumns()[relationColumn.manyColumn._localId];
            }
            manyColumn.manyRelationColumns.push(relationColumn);
            let oneColumn = columnMapById.get(relationColumn.oneColumn._localId);
            if (!oneColumn) {
                oneColumn = this.terminalStore.getAllColumns()[relationColumn.oneColumn._localId];
            }
            oneColumn.oneRelationColumns.push(relationColumn);
            let manyRelation;
            if (relationColumn.manyRelation && relationColumn.manyRelation._localId) {
                manyRelation = relationMapById.get(relationColumn.manyRelation._localId);
                if (!manyRelation) {
                    manyRelation = this.terminalStore.getAllRelations()[relationColumn.manyRelation._localId];
                }
                manyRelation.manyRelationColumns.push(relationColumn);
            }
            let oneRelation;
            if (relationColumn.oneRelation && relationColumn.oneRelation._localId) {
                oneRelation = relationMapById.get(relationColumn.oneRelation._localId);
                if (!oneRelation) {
                    oneRelation = this.terminalStore.getAllRelations()[relationColumn.oneRelation._localId];
                }
                oneRelation.oneRelationColumns.push(relationColumn);
            }
            relationColumn.manyColumn = manyColumn;
            relationColumn.manyRelation = manyRelation;
            relationColumn.oneColumn = oneColumn;
            relationColumn.oneRelation = oneRelation;
        });
    }
};
__decorate([
    Inject()
], DdlObjectLinker.prototype, "terminalStore", void 0);
DdlObjectLinker = __decorate([
    Injected()
], DdlObjectLinker);
export { DdlObjectLinker };
//# sourceMappingURL=DdlObjectLinker.js.map