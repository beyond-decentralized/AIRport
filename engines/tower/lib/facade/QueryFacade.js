import { QUERY_CONTEXT_LOADER, QUERY_FACADE } from '@airport/air-control';
import { container, DI } from '@airport/di';
export class QueryFacade {
    async find(query, queryResultType, context) {
        await this.ensureIocContext(context);
        const result = await context.ioc.transactionalConnector.find(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    async findOne(query, queryResultType, context) {
        await this.ensureIocContext(context);
        const result = await context.ioc.transactionalConnector.findOne(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    getPortableQuery(query, queryResultType, context) {
        return {
            jsonQuery: query.toJSON(context.ioc.queryUtils, context.ioc.fieldUtils),
            parameterMap: query.getParameters(),
            queryResultType,
            applicationIndex: context.dbEntity.applicationVersion.application.index,
            tableIndex: context.dbEntity.index,
        };
    }
    // FIXME: merge update caches on the client
    async search(query, queryResultType, context) {
        await this.ensureIocContext(context);
        let observable = await context.ioc.transactionalConnector.search(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async searchOne(query, queryResultType, context) {
        await this.ensureIocContext(context);
        let observable = await context.ioc.transactionalConnector.searchOne(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async ensureIocContext(context) {
        const queryContextLoader = await container(this)
            .get(QUERY_CONTEXT_LOADER);
        await queryContextLoader.ensure(context);
    }
}
DI.set(QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map