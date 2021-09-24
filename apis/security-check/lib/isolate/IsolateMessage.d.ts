import { DistributionStrategy, PlatformType, PortableQuery } from "@airport/ground-control";
import { Observable } from "rxjs";
import { JsonSchemaWithLastIds } from '..';
import { LastIds } from '../LastIds';
export declare enum IsolateMessageType {
    ADD_REPOSITORY = 0,
    APP_INITIALIZING = 1,
    APP_INITIALIZED = 2,
    COMMIT = 3,
    DELETE_WHERE = 4,
    FIND = 5,
    FIND_ONE = 6,
    INSERT_VALUES = 7,
    INSERT_VALUES_GET_IDS = 8,
    ROLLBACK = 9,
    SEARCH = 10,
    SEARCH_ONE = 11,
    SEARCH_UNSUBSCRIBE = 12,
    START_TRANSACTION = 13,
    SAVE = 14,
    UPDATE_VALUES = 15
}
export interface IIsolateMessage {
    category: 'Db';
    id: number;
    schemaSignature: string;
    type: IsolateMessageType;
}
export interface IIsolateMessageOut<T> extends IIsolateMessage {
    errorMessage: string;
    result: T;
}
export interface IInitConnectionIMI extends IIsolateMessage {
    schema: JsonSchemaWithLastIds;
}
export interface IInitConnectionIMO extends IIsolateMessageOut<LastIds> {
}
export interface IAddRepositoryIMI extends IIsolateMessage {
    distributionStrategy: DistributionStrategy;
    name: string;
    platform: PlatformType;
    platformConfig: string;
    url: string;
}
export interface INumberIMO extends IIsolateMessageOut<number> {
}
export interface IPortableQueryIMI extends IIsolateMessage {
    portableQuery: PortableQuery;
}
export interface IReadQueryIMI extends IPortableQueryIMI {
    cachedSqlQueryId?: number;
    portableQuery: PortableQuery;
}
export interface IDataIMO<T> extends IIsolateMessageOut<T> {
}
export interface IObservableDataIMO<T> extends IIsolateMessageOut<Observable<T>> {
}
export interface ISaveIMI<E, T = E | E[]> extends IIsolateMessage {
    entity: T;
}
//# sourceMappingURL=IsolateMessage.d.ts.map