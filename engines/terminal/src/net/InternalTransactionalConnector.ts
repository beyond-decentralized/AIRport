import { IApiCallRequestMessage } from '@airport/aviation-communication';
import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    IContext
} from '@airport/direction-indicator';
import {
    IAirEntity,
    ISaveResult,
    ITransactionalConnector,
    PortableQuery
} from '@airport/ground-control';
import { ITerminalStore, ITransactionalServer } from '@airport/terminal-map';
import { Observable } from 'rxjs';
import { IQueryContext } from '@airport/tarmaq-query';
import { IEntityContext } from '@airport/tarmaq-entity';

@Injected()
export class InternalTransactionalConnector
    implements ITransactionalConnector {

    @Inject()
    terminalStore: ITerminalStore

    @Inject()
    transactionalServer: ITransactionalServer

    internal = true

    callApi<Response>(
        _: IApiCallRequestMessage
    ): Promise<Response> {
        throw new Error(`InternalTransactionalConnector.callApi should never be called.
Interal Application API requests should be made directly (since
they are internal to the AIRport framework).`)
    }

    async find<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext
    ): Promise<EntityArray> {
        return await this.transactionalServer.find(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            }
        );
    }

    async findOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext
    ): Promise<E> {
        return await this.transactionalServer.findOne(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            }
        );
    }

    search<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext
    ): Observable<EntityArray> {
        return this.transactionalServer.search(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            }
        );
    }

    searchOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext
    ): Observable<E> {
        return this.transactionalServer.searchOne(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            }
        );
    }

    async save<E extends IAirEntity, T = E | E[]>(
        entity: T,
        context: IEntityContext,
    ): Promise<ISaveResult> {
        return await this.transactionalServer.save(entity,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }

    async insertValues(
        portableQuery: PortableQuery,
        context: IContext,
        ensureGeneratedValues?: boolean // For internal use only
    ): Promise<number> {
        return await this.transactionalServer.insertValues(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, ensureGeneratedValues)
    }

    async insertValuesGetLocalIds(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number[][]> {
        return await this.transactionalServer.insertValuesGetLocalIds(portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async updateValues(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        return await this.transactionalServer.updateValues(portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async deleteWhere(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        return await this.transactionalServer.deleteWhere(portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
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

export function injectTransactionalConnector(): void {
    console.log('Injecting TransactionalConnector')
}
