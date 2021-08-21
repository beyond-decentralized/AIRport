import { IQueryContext } from '@airport/air-control';
import {
    container,
    DI,
    IContext
} from '@airport/di';
import {
    DistributionStrategy,
    ISaveResult,
    ITransactionalConnector,
    PlatformType,
    PortableQuery,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export class TransactionalConnector
    implements ITransactionalConnector {

    dbName: string;
    serverUrl: string;

    async init(): Promise<void> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        await transServer.init();
    }

    async addRepository(
        name: string,
        url: string,
        platform: PlatformType,
        platformConfig: string,
        distributionStrategy: DistributionStrategy,
        context: IContext
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.addRepository(
            name,
            url,
            platform,
            platformConfig,
            distributionStrategy,
            {
                domainAndPort: 'test'
            },
            context
        );
    }

    async find<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext<E>,
        cachedSqlQueryId?: number,
    ): Promise<EntityArray> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.find(
            portableQuery,
            {
                domainAndPort: 'test'
            },
            context,
            cachedSqlQueryId
        );
    }

    async findOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext<E>,
        cachedSqlQueryId?: number,
    ): Promise<E> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.findOne(
            portableQuery,
            {
                domainAndPort: 'test'
            },
            context,
            cachedSqlQueryId
        );
    }

    async search<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext<E>,
        cachedSqlQueryId?: number,
    ): Promise<Observable<EntityArray>> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.search(
            portableQuery,
            {
                domainAndPort: 'test'
            },
            context,
            cachedSqlQueryId
        );
    }

    async searchOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext<E>,
        cachedSqlQueryId?: number,
    ): Promise<Observable<E>> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.searchOne(
            portableQuery,
            {
                domainAndPort: 'test'
            },
            context,
            cachedSqlQueryId
        );
    }

    async save<E, T = E | E[]>(
        entity: T,
        context: IContext,
    ): Promise<ISaveResult> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.save(entity, null, context);
    }

    async insertValues(
        portableQuery: PortableQuery,
        context: IContext,
        ensureGeneratedValues?: boolean // For internal use only
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.insertValues(
            portableQuery, null, context, ensureGeneratedValues)
    }

    async insertValuesGetIds(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number[] | string[] | number[][] | string[][]> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.insertValuesGetIds(portableQuery, null, context)
    }

    async updateValues(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.updateValues(portableQuery, null, context)
    }

    async deleteWhere(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.deleteWhere(portableQuery, null, context)
    }

    async startTransaction(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.startTransaction(null, context)
    }

    async commit(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.commit(null, context)
    }

    async rollback(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.rollback(null, context)
    }

}

DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);

export function injectTransactionalConnector(): void {
    // console.log('Injecting TransactionalConnector')
}
