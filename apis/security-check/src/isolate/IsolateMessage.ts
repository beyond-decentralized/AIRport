import { ILocalAPIRequest } from "@airport/aviation-communication";
import {
    PortableQuery
} from "@airport/ground-control";
import { Observable } from "rxjs";
import { JsonApplicationWithLastIds } from '..';
import { LastIds } from '../LastIds';

export enum IsolateMessageType {
    ADD_REPOSITORY = 'ADD_REPOSITORY',
    APP_INITIALIZING = 'APP_INITIALIZING',
    APP_INITIALIZED = 'APP_INITIALIZED',
    CALL_API = 'CALL_API',
    DELETE_WHERE = 'DELETE_WHERE',
    FIND = 'FIND',
    FIND_ONE = 'FIND_ONE',
    GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME = 'GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME',
    INSERT_VALUES = 'INSERT_VALUES',
    INSERT_VALUES_GET_IDS = 'INSERT_VALUES_GET_IDS',
    RETRIEVE_DOMAIN = 'RETRIEVE_DOMAIN',
    SEARCH = 'SEARCH',
    SEARCH_ONE = 'SEARCH_ONE',
    SEARCH_UNSUBSCRIBE = 'UNSUBSCRIBE',
    SAVE = 'SAVE',
    SAVE_TO_DESTINATION = 'SAVE_TO_DESTINATION',
    UPDATE_VALUES = 'UPDATE_VALUES'
}

export type IsolateMessageCategoryType = 'FromDb' | 'ToDb'

export interface IIsolateMessage<CategoryType = IsolateMessageCategoryType> {
    __received__?: boolean
    __receivedTime__?: number
    application: string
    category: CategoryType
    domain: string
    errorMessage: string
    id: string
    repositoryDestination?: string
    repositorySource?: string
    type: IsolateMessageType
}

export interface IIsolateMessageOut<T>
    extends IIsolateMessage {
    category: 'FromDb'
    errorMessage: string
    result: T
}

// FIXME: right now feature/App application initialization happens on 
// Initail connection handshake (as a short term solution)
// rethink that - application should probably be initialized at initial
// application retrieval request (from a UI or an app that needs it)
// and initial connection should probably not play a role in that
export interface IInitConnectionIMI
    extends IIsolateMessage {
    jsonApplication: JsonApplicationWithLastIds
}

export interface IConnectionInitializedIMI
    extends IIsolateMessage {
    fullApplicationName: string
}

export interface IInitConnectionIMO
    extends IIsolateMessageOut<LastIds> {
}

export interface ILocalAPIRequestIMI
    extends IApiIMI, ILocalAPIRequest<'FromClientRedirected'>,
    IIsolateMessage<'FromClientRedirected'> {
}

export interface ITransactionEndIMI
    extends IApiIMI, IIsolateMessage {
    transactionId: string
}

export interface IAddRepositoryIMI
    extends IIsolateMessage {
    // distributionStrategy: DistributionStrategy
    // name: string
    // platform: PlatformType
    // platformConfig: string
    // url: string
}

export interface IApiIMI {
    methodName: string
    objectName: string
    transactionId?: string
}

export interface ICallApiIMI
    extends IApiIMI, IIsolateMessage {
    args: Array<boolean | number | string>
}

export interface INumberIMO
    extends IIsolateMessageOut<number> {
}

export interface IPortableQueryIMI
    extends IApiIMI, IIsolateMessage {
    portableQuery: PortableQuery
}

export interface IReadQueryIMI
    extends IPortableQueryIMI {
    cachedSqlQueryId?: number
    portableQuery: PortableQuery
    repository?: {
        source: string
        uuid?: string
    }
}

export interface IDataIMO<T>
    extends IIsolateMessageOut<T> {
}

export interface IObservableDataIMO<T>
    extends IIsolateMessageOut<Observable<T>> {
}

export interface ISaveIMI<E, T = E | E[]>
    extends IApiIMI, IIsolateMessage {
    dbEntity: {
        id: number,
        applicationVersionId: number
    }
    entity: T
}

export interface ISaveToDestinationIMI<E, T = E | E[]>
    extends IApiIMI, IIsolateMessage {
    dbEntity: {
        id: number,
        applicationVersionId: number
    }
    entity: T
    repositoryDestination: string
}

export interface IGetLatestApplicationVersionByApplicationNameIMI
    extends IIsolateMessage {
    fullApplicationName: string
}

export interface IRetrieveDomainIMI
    extends IIsolateMessage {
    domainName: string
}
