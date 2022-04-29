import { DATABASE_FACADE, Delete, InsertColumnValues, InsertValues, UpdateColumns, UpdateProperties, QUERY_FACADE, } from '@airport/air-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { ENTITY_COPIER } from '../tokens';
/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade {
    async addRepository(
    // url: string = null,
    // platform: PlatformType = PlatformType.GOOGLE_DOCS,
    // platformConfig: string = null,
    // distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
    context) {
        // TODO: figure out how addRepository will work
        return await this.transactionalConnector.addRepository(
        // url, platform, platformConfig, distributionStrategy, 
        context);
    }
    async insertColumnValues(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return 0;
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const insertColumnValues = new InsertColumnValues(rawInsertColumnValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertColumnValues, null, queryContext);
        return await this.transactionalConnector.insertValues(portableQuery, context);
    }
    async insertValues(rawInsertValues, context) {
        if (!rawInsertValues) {
            return 0;
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const insertValues = new InsertValues(rawInsertValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertValues, null, queryContext);
        return await this.transactionalConnector.insertValues(portableQuery, context);
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return [];
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const insertValues = new InsertColumnValues(rawInsertColumnValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertValues, null, queryContext);
        return await this.transactionalConnector.insertValuesGetIds(portableQuery, context);
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        if (!rawInsertValues) {
            return [];
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const insertValues = new InsertValues(rawInsertValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertValues, null, queryContext);
        return await this.transactionalConnector.insertValuesGetIds(portableQuery, context);
    }
    async deleteWhere(rawDelete, context) {
        if (!rawDelete) {
            return 0;
        }
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        let deleteWhere = new Delete(rawDelete);
        const queryContext = await this.ensureQueryContext(context);
        let portableQuery = this.queryFacade.getPortableQuery(deleteWhere, null, queryContext);
        return await this.transactionalConnector.deleteWhere(portableQuery, context);
    }
    async save(entity, context) {
        if (!entity) {
            return null;
        }
        const entityCopy = await this.preSaveOperations(entity, context);
        const saveResult = await this.transactionalConnector.save(entityCopy, context);
        this.updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult, new Set());
        return saveResult;
    }
    async saveToDestination(repositoryDestination, entity, context) {
        if (!entity) {
            return null;
        }
        const entityCopy = await this.preSaveOperations(entity, context);
        const saveResult = await this.transactionalConnector
            .saveToDestination(repositoryDestination, entityCopy, context);
        this.updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult, new Set());
        return saveResult;
    }
    async preSaveOperations(entity, context) {
        if (!entity) {
            return null;
        }
        const dbEntity = context.dbEntity;
        const entityCopy = this.entityCopier
            .copyEntityForProcessing(entity, dbEntity, this.entityStateManager, context);
        this.updateCacheManager.setOperationState(entityCopy, dbEntity, new Set());
        return entityCopy;
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let updateColumns = new UpdateColumns(rawUpdate);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(updateColumns, null, queryContext);
        return await this.transactionalConnector.updateValues(portableQuery, context);
    }
    async updateWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let update = new UpdateProperties(rawUpdate);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(update, null, queryContext);
        return await this.transactionalConnector.updateValues(portableQuery, context);
    }
    prepare(queryFunction) {
        return new FunctionWrapper(queryFunction);
    }
    async ensureQueryContext(context) {
        const queryContext = context;
        return queryContext;
    }
}
DEPENDENCY_INJECTION.set(DATABASE_FACADE, DatabaseFacade);
DATABASE_FACADE.setDependencies({
    entityCopier: ENTITY_COPIER,
    queryFacade: QUERY_FACADE
});
export class FunctionWrapper {
    constructor(queryFunction) {
        throw new Error('Not Implemented');
    }
    find(...params) {
    }
}
//# sourceMappingURL=DatabaseFacade.js.map