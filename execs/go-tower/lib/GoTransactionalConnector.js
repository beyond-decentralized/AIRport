import { DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
export class GoTransactionalConnector {
    async init() {
        throw new Error('Not implemented');
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        throw new Error('Not implemented');
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        throw new Error('Not implemented');
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        throw new Error('Not implemented');
    }
    async search(portableQuery, context, cachedSqlQueryId) {
        throw new Error('Not implemented');
    }
    async searchOne(portableQuery, context, cachedSqlQueryId) {
        throw new Error('Not implemented');
    }
    /**
     * This is a TIQL Insert statement coming from the client.
     * It will have an id of the operation to be invoked, as
     * well as the parameters for this specific operation.
     * The operation will then be looked up from the schema,
     * parsed, cached (if appropriate) and executed.
     *
     * NOTE: some of these operations will be internal
     *
     * In a client Dao this will look like:
     *
     * @Prepared()
     * @Insert(...)
     *
     */
    insert(
    // todo define parameters
    ) {
        throw new Error(`TODO: implement`);
    }
    /**
     * @Update(...)
     */
    update(
    // todo define parameters
    ) {
        throw new Error(`TODO: implement`);
    }
    /**
     * @Delete(...)
     */
    delete(
    // todo define parameters
    ) {
        throw new Error(`TODO: implement`);
    }
    async save(entity, context) {
        throw new Error('Not implemented');
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        throw new Error('Not implemented');
    }
    async insertValuesGetIds(portableQuery, context) {
        throw new Error('Not implemented');
    }
    async updateValues(portableQuery, context) {
        throw new Error('Not implemented');
    }
    async deleteWhere(portableQuery, context) {
        throw new Error('Not implemented');
    }
    async startTransaction(context) {
        throw new Error('Not implemented');
    }
    async commit(context) {
        throw new Error('Not implemented');
    }
    async rollback(context) {
        throw new Error('Not implemented');
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, GoTransactionalConnector);
//# sourceMappingURL=GoTransactionalConnector.js.map