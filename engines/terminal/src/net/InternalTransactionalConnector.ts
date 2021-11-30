import { IEntityContext, IQueryContext } from '@airport/air-control';
import {
    container,
    DI,
    IContext
} from '@airport/di';
import {
    AIRepository,
    ISaveResult,
    ITransactionalConnector,
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
        // url: string,
        // platform: PlatformType,
        // platformConfig: string,
        // distributionStrategy: DistributionStrategy,
        context: IContext
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.addRepository(
            // url,
            // platform,
            // platformConfig,
            // distributionStrategy,
            {
                applicationSignature: 'internal'
            },
            {
                internal: true,
                ...context
            }
        );
    }

    async find<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Promise<EntityArray> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.find(
            portableQuery,
            {
                applicationSignature: 'internal'
            },
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
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.findOne(
            portableQuery,
            {
                applicationSignature: 'internal'
            },
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
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);

        return transServer.search(
            portableQuery,
            {
                applicationSignature: 'internal'
            },
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
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);

        return transServer.searchOne(
            portableQuery,
            {
                applicationSignature: 'internal'
            },
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
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.save(entity,
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        });
    }

	async saveToDestination<E, T = E | E[]>(
		repositoryDestination: string,
		entity: T,
		context?: IContext,
	): Promise<ISaveResult> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);

        return await transServer.saveToDestination(repositoryDestination, entity,
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        } as any);
    }

    async insertValues(
        portableQuery: PortableQuery,
        context: IContext,
        ensureGeneratedValues?: boolean // For internal use only
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.insertValues(
            portableQuery,
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        }, ensureGeneratedValues)
    }

    async insertValuesGetIds(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number[][]> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.insertValuesGetIds(portableQuery,
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        })
    }

    async updateValues(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.updateValues(portableQuery,
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        })
    }

    async deleteWhere(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.deleteWhere(portableQuery,
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        })
    }

    async startTransaction(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.startTransaction(
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        })
    }

    async commit(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.commit(
            {
                applicationSignature: 'internal'
            }, {
            internal: true,
            ...context
        })
    }

    async rollback(
        context: IContext
    ): Promise<boolean> {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER)

        return await transServer.rollback(
            {
                applicationSignature: 'internal'
            }, {
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
