import {
    IEntityContext,
    IQueryContext
} from '@airport/air-control';
import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from '@airport/aviation-communication';
import {
    container,
    DEPENDENCY_INJECTION,
    IContext
} from '@airport/direction-indicator';
import {
    ISaveResult,
    ITransactionalConnector,
    PortableQuery,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control';
import { TERMINAL_STORE, TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { Observable } from 'rxjs';

export class InternalTransactionalConnector
    implements ITransactionalConnector {

    callApi<Request, Response>(
        _: ILocalAPIRequest
    ): Promise<ILocalAPIResponse> {
        throw new Error(`InternalTransactionalConnector.callApi should never be called.
Interal Application API requests should be made directly (since
they are internal to the AIRport framework).`)
    }

    async addRepository(
        // url: string,
        // platform: PlatformType,
        // platformConfig: string,
        // distributionStrategy: DistributionStrategy,
        context: IContext
    ): Promise<number> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.addRepository(
            // url,
            // platform,
            // platformConfig,
            // distributionStrategy,
            terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context
            }
        )
    }

    async find<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Promise<EntityArray> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);

        return await transServer.find(
            portableQuery,
            terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    async findOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Promise<E> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.findOne(
            portableQuery,
            terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    search<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Observable<EntityArray> {
        const [terminalStore, transServer] = container(this)
            .getSync(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return transServer.search(
            portableQuery,
            terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    searchOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Observable<E> {
        const [terminalStore, transServer] = container(this)
            .getSync(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return transServer.searchOne(
            portableQuery,
            terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    async save<E, T = E | E[]>(
        entity: T,
        context: IEntityContext,
    ): Promise<ISaveResult> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.save(entity,
            terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }

    async saveToDestination<E, T = E | E[]>(
        repositoryDestination: string,
        entity: T,
        context?: IContext,
    ): Promise<ISaveResult> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.saveToDestination(repositoryDestination, entity,
            terminalStore.getInternalConnector().internalCredentials, {
                internal: true,
                ...context
            } as any);
    }

    async insertValues(
        portableQuery: PortableQuery,
        context: IContext,
        ensureGeneratedValues?: boolean // For internal use only
    ): Promise<number> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.insertValues(
            portableQuery,
            terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, ensureGeneratedValues)
    }

    async insertValuesGetIds(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number[][]> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.insertValuesGetIds(portableQuery,
            terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async updateValues(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.updateValues(portableQuery,
            terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async deleteWhere(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.deleteWhere(portableQuery,
            terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async startTransaction(
        context: IContext
    ): Promise<boolean> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.startTransaction(
            terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async commit(
        context: IContext
    ): Promise<boolean> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.commit(
            terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async rollback(
        context: IContext
    ): Promise<boolean> {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER)

        return await transServer.rollback(
            terminalStore.getInternalConnector().internalCredentials, {
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
DEPENDENCY_INJECTION.set(TRANSACTIONAL_CONNECTOR, InternalTransactionalConnector)

export function injectTransactionalConnector(): void {
    console.log('Injecting TransactionalConnector')
}
