import { IEntityContext, IQueryContext } from '@airport/air-control';
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

    async addRepository(
        name: string,
        // url: string,
        // platform: PlatformType,
        // platformConfig: string,
        // distributionStrategy: DistributionStrategy,
        context: IContext
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.addRepository(
            name,
            // url,
            // platform,
            // platformConfig,
            // distributionStrategy,
            {
                domainAndPort: 'test'
            },
            {
                internal: true,
                ...context
            }
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
            {
                internal: true,
                ...context
            },
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
            {
                internal: true,
                ...context
            },
            cachedSqlQueryId
        );
    }

    search<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext<E>,
        cachedSqlQueryId?: number,
    ): Observable<EntityArray> {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);

        return transServer.search(
            portableQuery,
            {
                domainAndPort: 'test'
            },
            {
                internal: true,
                ...context
            },
            cachedSqlQueryId
        );
    }

    searchOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext<E>,
        cachedSqlQueryId?: number,
    ): Observable<E> {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);

        return transServer.searchOne(
            portableQuery,
            {
                domainAndPort: 'test'
            },
            {
                internal: true,
                ...context
            },
            cachedSqlQueryId
        );
    }

    async save<E, T = E | E[]>(
        entity: T,
        context: IEntityContext,
    ): Promise<ISaveResult> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.save(entity, null, {
            internal: true,
            ...context
        });
    }

    async insertValues(
        portableQuery: PortableQuery,
        context: IContext,
        ensureGeneratedValues?: boolean // For internal use only
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.insertValues(
            portableQuery, null, {
            internal: true,
            ...context
        }, ensureGeneratedValues)
    }

    async insertValuesGetIds(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number[][]> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.insertValuesGetIds(portableQuery, null, {
            internal: true,
            ...context
        })
    }

    async updateValues(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.updateValues(portableQuery, null, {
            internal: true,
            ...context
        })
    }

    async deleteWhere(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.deleteWhere(portableQuery, null, {
            internal: true,
            ...context
        })
    }

    async startTransaction(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.startTransaction(null, {
            internal: true,
            ...context
        })
    }

    async commit(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.commit(null, {
            internal: true,
            ...context
        })
    }

    async rollback(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.rollback(null, {
            internal: true,
            ...context
        })
    }

    onMessage(callback: (
        message: any
    ) => void) {
        // Nothing to do, onMessage callback was added for demo purposes for Web implementations
    }

}

DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);

export function injectTransactionalConnector(): void {
    console.log('Injecting TransactionalConnector')
}
