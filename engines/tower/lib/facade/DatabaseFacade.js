import { DATABASE_FACADE, Delete, InsertColumnValues, InsertValues, QUERY_CONTEXT_LOADER, SCHEMA_UTILS, UPDATE_CACHE_MANAGER, UpdateColumns, UpdateProperties, } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
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
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.addRepository(
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
        const portableQuery = queryContext.ioc.queryFacade.getPortableQuery(insertColumnValues, null, queryContext);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValues(portableQuery, context);
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
        const portableQuery = queryContext.ioc.queryFacade.getPortableQuery(insertValues, null, queryContext);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValues(portableQuery, context);
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
        const portableQuery = queryContext.ioc.queryFacade.getPortableQuery(insertValues, null, queryContext);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValuesGetIds(portableQuery, context);
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
        const portableQuery = queryContext.ioc.queryFacade.getPortableQuery(insertValues, null, queryContext);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValuesGetIds(portableQuery, context);
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
        let portableQuery = queryContext.ioc.queryFacade.getPortableQuery(deleteWhere, null, queryContext);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.deleteWhere(portableQuery, context);
    }
    async save(entity, context) {
        if (!entity) {
            return null;
        }
        const entityCopy = await this.preSaveOperations(entity, context);
        const [updateCacheManager, entityStateManager, schemaUtils, transactionalConnector] = await container(this).get(UPDATE_CACHE_MANAGER, ENTITY_STATE_MANAGER, SCHEMA_UTILS, TRANSACTIONAL_CONNECTOR);
        const saveResult = await transactionalConnector.save(entityCopy, context);
        updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult, entityStateManager, schemaUtils, new Set());
        return saveResult;
    }
    async saveToDestination(repositoryDestination, entity, context) {
        if (!entity) {
            return null;
        }
        const entityCopy = await this.preSaveOperations(entity, context);
        const [updateCacheManager, entityStateManager, schemaUtils, transactionalConnector] = await container(this).get(UPDATE_CACHE_MANAGER, ENTITY_STATE_MANAGER, SCHEMA_UTILS, TRANSACTIONAL_CONNECTOR);
        const saveResult = await transactionalConnector
            .saveToDestination(repositoryDestination, entityCopy, context);
        updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult, entityStateManager, schemaUtils, new Set());
        return saveResult;
    }
    async preSaveOperations(entity, context) {
        if (!entity) {
            return null;
        }
        const [updateCacheManager, entityCopier, entityStateManager, schemaUtils] = await container(this).get(UPDATE_CACHE_MANAGER, ENTITY_COPIER, ENTITY_STATE_MANAGER, SCHEMA_UTILS, TRANSACTIONAL_CONNECTOR);
        const dbEntity = context.dbEntity;
        const entityCopy = entityCopier
            .copyEntityForProcessing(entity, dbEntity, entityStateManager);
        updateCacheManager.setOperationState(entityCopy, dbEntity, entityStateManager, schemaUtils, new Set());
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
        const portableQuery = queryContext.ioc.queryFacade.getPortableQuery(updateColumns, null, queryContext);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.updateValues(portableQuery, context);
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
        const portableQuery = queryContext.ioc.queryFacade.getPortableQuery(update, null, queryContext);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.updateValues(portableQuery, context);
    }
    prepare(queryFunction) {
        return new FunctionWrapper(queryFunction);
    }
    async ensureQueryContext(context) {
        const queryContext = context;
        const queryContextLoader = await container(this).get(QUERY_CONTEXT_LOADER);
        await queryContextLoader.ensure(queryContext);
        return queryContext;
    }
}
DI.set(DATABASE_FACADE, DatabaseFacade);
export class FunctionWrapper {
    constructor(queryFunction) {
        throw new Error('Not Implemented');
    }
    find(...params) {
    }
}
//# sourceMappingURL=DatabaseFacade.js.map