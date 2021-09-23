import { JsonSchemaWithApi } from '@airport/check-in';
import { DistributionStrategy, PlatformType, PortableQuery } from "@airport/ground-control";
import { Observable } from "rxjs";
import { LastIds } from '../LastIds';
export declare enum IsolateMessageType {
    ADD_REPOSITORY = 0,
    COMMIT = 1,
    DELETE_WHERE = 2,
    INIT_CONNECTION = 3,
    FIND = 4,
    FIND_ONE = 5,
    INSERT_VALUES = 6,
    INSERT_VALUES_GET_IDS = 7,
    ROLLBACK = 8,
    SEARCH = 9,
    SEARCH_ONE = 10,
    SEARCH_UNSUBSCRIBE = 11,
    START_TRANSACTION = 12,
    SAVE = 13,
    UPDATE_VALUES = 14
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
    schema: JsonSchemaWithApi;
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