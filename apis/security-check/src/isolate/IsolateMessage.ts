import {
    DistributionStrategy,
    PlatformType,
    PortableQuery
} from "@airport/ground-control";
import { Observable } from "rxjs";
import { JsonSchemaWithLastIds } from '..';
import { LastIds } from '../LastIds';

export enum IsolateMessageType {
    ADD_REPOSITORY,
    APP_INITIALIZING,
    APP_INITIALIZED,
    COMMIT,
    DELETE_WHERE,
    FIND,
    FIND_ONE,
    INSERT_VALUES,
    INSERT_VALUES_GET_IDS,
    ROLLBACK,
    SEARCH,
    SEARCH_ONE,
    SEARCH_UNSUBSCRIBE,
    START_TRANSACTION,
    SAVE,
    UPDATE_VALUES
}

export interface IIsolateMessage {
    category: 'Db'
    id: number
    schemaSignature: string
    type: IsolateMessageType
}

export interface IIsolateMessageOut<T>
    extends IIsolateMessage {
    errorMessage: string
    result: T
}

// FIXME: right now feature/App schema initialization happens on 
// Initail connection handshake (as a short term solution)
// rethink that - schema should probably be initialized at initial
// schema retrieval request (from a UI or an app that needs it)
// and initial connection should probably not play a role in that
export interface IInitConnectionIMI
    extends IIsolateMessage {
    schema: JsonSchemaWithLastIds
}

export interface IInitConnectionIMO
    extends IIsolateMessageOut<LastIds> {
}

export interface IAddRepositoryIMI
    extends IIsolateMessage {
    distributionStrategy: DistributionStrategy
    name: string
    platform: PlatformType
    platformConfig: string
    url: string
}

export interface INumberIMO
    extends IIsolateMessageOut<number> {
}

export interface IPortableQueryIMI
    extends IIsolateMessage {
    portableQuery: PortableQuery
}

export interface IReadQueryIMI
    extends IPortableQueryIMI {
    cachedSqlQueryId?: number
    portableQuery: PortableQuery
}

export interface IDataIMO<T>
    extends IIsolateMessageOut<T> {
}

export interface IObservableDataIMO<T>
    extends IIsolateMessageOut<Observable<T>> {
}

export interface ISaveIMI<E, T = E | E[]>
    extends IIsolateMessage {
    entity: T
}

