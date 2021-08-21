import { DistributionStrategy, PlatformType, PortableQuery } from "@airport/ground-control";
import { Observable } from "rxjs";
export declare enum IsolateMessageType {
    ADD_REPOSITORY = 0,
    COMMIT = 1,
    DELETE_WHERE = 2,
    FIND = 3,
    FIND_ONE = 4,
    INSERT_VALUES = 5,
    INSERT_VALUES_GET_IDS = 6,
    ROLLBACK = 7,
    SEARCH = 8,
    SEARCH_ONE = 9,
    START_TRANSACTION = 10,
    SAVE = 11,
    UPDATE_VALUES = 12
}
export interface IIsolateMessage {
    id: number;
    isolateId: string;
    type: IsolateMessageType;
}
export interface IIsolateMessageOut<T> extends IIsolateMessage {
    result: T;
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