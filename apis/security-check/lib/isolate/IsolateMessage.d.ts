import { PortableQuery } from "@airport/ground-control";
import { Observable } from "rxjs";
import { JsonApplicationWithLastIds } from '..';
import { LastIds } from '../LastIds';
export declare enum IsolateMessageType {
    ADD_REPOSITORY = "ADD_REPOSITORY",
    APP_INITIALIZING = "APP_INITIALIZING",
    APP_INITIALIZED = "APP_INITIALIZED",
    COMMIT = "COMMIT",
    DELETE_WHERE = "DELETE_WHERE",
    FIND = "FIND",
    FIND_ONE = "FIND_ONE",
    GET_LATEST_SCHEMA_VERSION_BY_SCHEMA_NAME = "GET_LATEST_SCHEMA_VERSION_BY_SCHEMA_NAME",
    INSERT_VALUES = "INSERT_VALUES",
    INSERT_VALUES_GET_IDS = "INSERT_VALUES_GET_IDS",
    ROLLBACK = "ROLLBACK",
    SEARCH = "SEARCH",
    SEARCH_ONE = "SEARCH_ONE",
    SEARCH_UNSUBSCRIBE = "UNSUBSCRIBE",
    START_TRANSACTION = "START_TRANSACTION",
    SAVE = "SAVE",
    SAVE_TO_DESTINATION = "SAVE_TO_DESTINATION",
    UPDATE_VALUES = "UPDATE_VALUES"
}
export interface IIsolateMessage {
    __received__?: boolean;
    __receivedTime__?: number;
    category: 'FromDb' | 'ToDb';
    id: number;
    repositoryDestination?: string;
    repositorySource?: string;
    applicationSignature: string;
    type: IsolateMessageType;
}
export interface IIsolateMessageOut<T> extends IIsolateMessage {
    category: 'FromDb';
    errorMessage: string;
    result: T;
}
export interface IInitConnectionIMI extends IIsolateMessage {
    application: JsonApplicationWithLastIds;
}
export interface IConnectionInitializedIMI extends IIsolateMessage {
    applicationName: string;
}
export interface IInitConnectionIMO extends IIsolateMessageOut<LastIds> {
}
export interface IAddRepositoryIMI extends IIsolateMessage {
}
export interface INumberIMO extends IIsolateMessageOut<number> {
}
export interface IPortableQueryIMI extends IIsolateMessage {
    portableQuery: PortableQuery;
}
export interface IReadQueryIMI extends IPortableQueryIMI {
    cachedSqlQueryId?: number;
    portableQuery: PortableQuery;
    repositorySource: string;
    repositoryUuid: string;
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
    applicationName: string;
}
//# sourceMappingURL=IsolateMessage.d.ts.map