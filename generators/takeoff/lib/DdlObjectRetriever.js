import { container, DI } from '@airport/di';
import { DOMAIN_DAO, APPLICATION_COLUMN_DAO, APPLICATION_DAO, APPLICATION_ENTITY_DAO, APPLICATION_PROPERTY_COLUMN_DAO, APPLICATION_PROPERTY_DAO, APPLICATION_REFERENCE_DAO, APPLICATION_RELATION_COLUMN_DAO, APPLICATION_RELATION_DAO, APPLICATION_VERSION_DAO } from '@airport/airspace';
import { DDL_OBJECT_RETRIEVER } from './tokens';
export class DdlObjectRetriever {
    constructor() {
        this.lastIds = {
            columns: 0,
            domains: 0,
            entities: 0,
            properties: 0,
            propertyColumns: 0,
            relations: 0,
            relationColumns: 0,
            applications: 0,
            applicationVersions: 0
        };
    }
    async retrieveDdlObjects() {
        const [domainDao, applicationDao, applicationVersionDao, applicationReferenceDao, applicationEntityDao, applicationPropertyDao, applicationRelationDao, applicationColumnDao, applicationPropertyColumnDao, applicationRelationColumnDao] = await container(this).get(DOMAIN_DAO, APPLICATION_DAO, APPLICATION_VERSION_DAO, APPLICATION_REFERENCE_DAO, APPLICATION_ENTITY_DAO, APPLICATION_PROPERTY_DAO, APPLICATION_RELATION_DAO, APPLICATION_COLUMN_DAO, APPLICATION_PROPERTY_COLUMN_DAO, APPLICATION_RELATION_COLUMN_DAO);
        const applications = await applicationDao.findAllActive();
        const applicationIndexes = [];
        const domainIdSet = new Set();
        applications.forEach(application => {
            applicationIndexes.push(application.index);
            domainIdSet.add(application.domain.id);
        });
        applications.sort((application1, application2) => {
            return application1.index - application2.index;
        });
        const domains = await domainDao.findByIdIn(Array.from(domainIdSet));
        const allApplicationVersions = await applicationVersionDao
            .findAllActiveOrderByApplicationIndexAndId();
        let lastApplicationIndex;
        // const allApplicationVersionsByIds: IApplicationVersion[] = []
        const latestApplicationVersions = [];
        const applicationVersions = [];
        for (const applicationVersion of allApplicationVersions) {
            if (applicationVersion.application.index !== lastApplicationIndex) {
                latestApplicationVersions.push(applicationVersion);
            }
            // allApplicationVersionsByIds[applicationVersion.id] = applicationVersion
            lastApplicationIndex = applicationVersion.application.index;
            applicationVersions.push(applicationVersion);
        }
        const latestApplicationVersionIds = latestApplicationVersions.map(applicationVersion => applicationVersion.id);
        const applicationReferences = await applicationReferenceDao
            .findAllForApplicationVersions(latestApplicationVersionIds);
        const entities = await applicationEntityDao
            .findAllForApplicationVersions(latestApplicationVersionIds);
        const entityIds = entities.map(entity => entity.id);
        /*
        const entityIds = entities.map(
    entity => {
        if (entity.tableConfig) {
            entity.tableConfig = JSON.parse(entity.tableConfig as any)
        }
        return entity.id
    })
         */
        const properties = await applicationPropertyDao
            .findAllForEntities(entityIds);
        const propertyIds = properties.map(property => property.id);
        const relations = await applicationRelationDao
            .findAllForProperties(propertyIds);
        const columns = await applicationColumnDao
            .findAllForEntities(entityIds);
        const columnIds = columns.map(column => column.id);
        const propertyColumns = await applicationPropertyColumnDao
            .findAllForColumns(columnIds);
        const relationColumns = await applicationRelationColumnDao
            .findAllForColumns(columnIds);
        this.lastIds = {
            columns: columns.length,
            domains: domains.length,
            entities: entities.length,
            properties: properties.length,
            propertyColumns: propertyColumns.length,
            relationColumns: relationColumns.length,
            relations: relations.length,
            applications: applications.length,
            applicationVersions: applicationVersions.length,
        };
        return {
            // allDomains: domains,
            // allApplications: applications,
            // allApplicationVersionsByIds,
            columns,
            domains,
            entities,
            latestApplicationVersions,
            properties,
            propertyColumns,
            relationColumns,
            relations,
            applicationReferences,
            applications,
            applicationVersions
        };
    }
}
DI.set(DDL_OBJECT_RETRIEVER, DdlObjectRetriever);
//# sourceMappingURL=DdlObjectRetriever.js.map