import { QUERY_FACADE, } from '@airport/air-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
export class QueryFacade {
    async find(query, queryResultType, context) {
        await this.ensureContext(context);
        const result = await this.transactionalConnector.find(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    async findOne(query, queryResultType, context) {
        await this.ensureContext(context);
        const result = await this.transactionalConnector.findOne(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    getPortableQuery(query, queryResultType, context) {
        return {
            jsonQuery: query.toJSON(this.queryUtils, this.fieldUtils, this.relationManager),
            parameterMap: query.getParameters(),
            queryResultType,
            applicationIndex: context.dbEntity.applicationVersion.application.index,
            tableIndex: context.dbEntity.index,
            // values: query.values
        };
    }
    // FIXME: merge update caches on the client
    async search(query, queryResultType, context) {
        await this.ensureContext(context);
        let observable = await this.transactionalConnector.search(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async searchOne(query, queryResultType, context) {
        await this.ensureContext(context);
        let observable = await this.transactionalConnector.searchOne(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async ensureContext(context) {
    }
}
DEPENDENCY_INJECTION.set(QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map