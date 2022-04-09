import { ILocalAPIRequest } from "@airport/aviation-communication";
import { PortableQuery } from "@airport/ground-control";
import { Observable } from "rxjs";
import { JsonApplicationWithLastIds } from '..';
import { LastIds } from '../LastIds';
export declare enum IsolateMessageType {
    ADD_REPOSITORY = "ADD_REPOSITORY",
    APP_INITIALIZING = "APP_INITIALIZING",
    APP_INITIALIZED = "APP_INITIALIZED",
    CALL_API = "CALL_API",
    COMMIT = "COMMIT",
    DELETE_WHERE = "DELETE_WHERE",
    FIND = "FIND",
    FIND_ONE = "FIND_ONE",
    GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME = "GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME",
    INSERT_VALUES = "INSERT_VALUES",
    INSERT_VALUES_GET_IDS = "INSERT_VALUES_GET_IDS",
    RETRIEVE_DOMAIN = "RETRIEVE_DOMAIN",
    ROLLBACK = "ROLLBACK",
    SEARCH = "SEARCH",
    SEARCH_ONE = "SEARCH_ONE",
    SEARCH_UNSUBSCRIBE = "UNSUBSCRIBE",
    START_TRANSACTION = "START_TRANSACTION",
    SAVE = "SAVE",
    SAVE_TO_DESTINATION = "SAVE_TO_DESTINATION",
    UPDATE_VALUES = "UPDATE_VALUES"
}
export declare type IsolateMessageCategoryType = 'FromDb' | 'ToDb';
export interface IIsolateMessage<CategoryType = IsolateMessageCategoryType> {
    __received__?: boolean;
    __receivedTime__?: number;
    application: string;
    category: CategoryType;
    domain: string;
    id: string;
    repositoryDestination?: string;
    repositorySource?: string;
    type: IsolateMessageType;
}
export interface IIsolateMessageOut<T> extends IIsolateMessage {
    category: 'FromDb';
    errorMessage: string;
    result: T;
}
export interface IInitConnectionIMI extends IIsolateMessage {
    jsonApplication: JsonApplicationWithLastIds;
}
export interface IConnectionInitializedIMI extends IIsolateMessage {
    fullApplicationName: string;
}
export interface IInitConnectionIMO extends IIsolateMessageOut<LastIds> {
}
export interface ILocalAPIRequestIMI extends ILocalAPIRequest<'FromClientRedirected'>, IIsolateMessage<'FromClientRedirected'> {
}
export interface ITransactionEndIMI extends IIsolateMessage {
    transactionId: string;
}
export interface IAddRepositoryIMI extends IIsolateMessage {
}
export interface ICallApiIMI extends IIsolateMessage {
    args: Array<boolean | number | string>;
    methodName: string;
    objectName: string;
}
export interface INumberIMO extends IIsolateMessageOut<number> {
}
export interface IPortableQueryIMI extends IIsolateMessage {
    portableQuery: PortableQuery;
}
export interface IReadQueryIMI extends IPortableQueryIMI {
    cachedSqlQueryId?: number;
    portableQuery: PortableQuery;
    repository?: {
        source: string;
        uuid?: string;
    };
}
export interface IDataIMO<T> extends IIsolateMessageOut<T> {
}
export interface IObservableDataIMO<T> extends IIsolateMessageOut<Observable<T>> {
}
export interface ISaveIMI<E, T = E | E[]> extends IIsolateMessage {
    dbEntity: {
        id: number;
        applicationVersionId: number;
    };
    entity: T;
}
export interface ISaveToDestinationIMI<E, T = E | E[]> extends IIsolateMessage {
    dbEntity: {
        id: number;
        applicationVersionId: number;
    };
    entity: T;
    repositoryDestination: string;
}
export interface IGetLatestApplicationVersionByApplicationNameIMI extends IIsolateMessage {
    fullApplicationName: string;
}
export interface IRetrieveDomainIMI extends IIsolateMessage {
    domainName: string;
}
//# sourceMappingURL=IsolateMessage.d.ts.map