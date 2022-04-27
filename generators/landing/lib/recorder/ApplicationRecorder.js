import { container, DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { transactional } from '@airport/tower';
import { DOMAIN_DAO, APPLICATION_COLUMN_DAO, APPLICATION_DAO, APPLICATION_ENTITY_DAO, APPLICATION_PROPERTY_COLUMN_DAO, APPLICATION_PROPERTY_DAO, APPLICATION_REFERENCE_DAO, APPLICATION_RELATION_COLUMN_DAO, APPLICATION_RELATION_DAO, APPLICATION_VERSION_DAO, } from '@airport/airspace';
import { APPLICATION_RECORDER } from '../tokens';
export class ApplicationRecorder {
    async record(ddlObjects, 
    // normalOperation: boolean,
    context) {
        const [domainDao, applicationColumnDao, applicationDao, applicationEntityDao, applicationPropertyColumnDao, applicationPropertyDao, applicationReferenceDao, applicationRelationColumnDao, applicationRelationDao, applicationVersionDao] = await container(this)
            .get(DOMAIN_DAO, APPLICATION_COLUMN_DAO, APPLICATION_DAO, APPLICATION_ENTITY_DAO, APPLICATION_PROPERTY_COLUMN_DAO, APPLICATION_PROPERTY_DAO, APPLICATION_REFERENCE_DAO, APPLICATION_RELATION_COLUMN_DAO, APPLICATION_RELATION_DAO, APPLICATION_VERSION_DAO);
        await transactional(async () => {
            // FIXME: add support for real application versioning
            this.setDefaultVersioning(ddlObjects);
            await domainDao.checkAndInsertIfNeeded(ddlObjects.domains);
            await applicationDao.insert(ddlObjects.applications);
            await applicationVersionDao.insert(ddlObjects.applicationVersions);
            await applicationReferenceDao.insert(ddlObjects.applicationReferences);
            await applicationEntityDao.insert(ddlObjects.entities);
            await applicationPropertyDao.insert(ddlObjects.properties);
            await applicationRelationDao.insert(ddlObjects.relations);
            await applicationColumnDao.insert(ddlObjects.columns);
            await applicationPropertyColumnDao.insert(ddlObjects.propertyColumns);
            await applicationRelationColumnDao.insert(ddlObjects.relationColumns);
        }, context);
    }
    setDefaultVersioning(ddlObjects) {
        for (const applicationReference of ddlObjects.applicationReferences) {
            applicationReference.deprecatedSinceVersion = null;
            applicationReference.removedInVersion = null;
            applicationReference.sinceVersion = applicationReference.ownApplicationVersion;
        }
        for (const entity of ddlObjects.entities) {
            entity.deprecatedSinceVersion = null;
            entity.removedInVersion = null;
            entity.sinceVersion = entity.applicationVersion;
        }
        for (const property of ddlObjects.properties) {
            property.deprecatedSinceVersion = null;
            property.removedInVersion = null;
            property.sinceVersion = property.entity.applicationVersion;
        }
        for (const relation of ddlObjects.relations) {
            relation.deprecatedSinceVersion = null;
            relation.removedInVersion = null;
            relation.sinceVersion = relation.entity.applicationVersion;
        }
        for (const column of ddlObjects.columns) {
            column.deprecatedSinceVersion = null;
            column.removedInVersion = null;
            column.sinceVersion = column.entity.applicationVersion;
        }
        for (const propertyColumn of ddlObjects.propertyColumns) {
            propertyColumn.deprecatedSinceVersion = null;
            propertyColumn.removedInVersion = null;
            propertyColumn.sinceVersion = propertyColumn.property.entity.applicationVersion;
        }
        for (const relationColumn of ddlObjects.relationColumns) {
            relationColumn.deprecatedSinceVersion = null;
            relationColumn.removedInVersion = null;
            relationColumn.sinceVersion = relationColumn.parentRelation.entity.applicationVersion;
        }
    }
    async bulkCreate(dao, entities, context) {
        await dao.save(entities, context);
    }
}
DEPENDENCY_INJECTION.set(APPLICATION_RECORDER, ApplicationRecorder);
//# sourceMappingURL=ApplicationRecorder.js.map