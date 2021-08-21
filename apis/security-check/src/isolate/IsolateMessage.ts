import {
    DistributionStrategy,
    PlatformType,
    PortableQuery
} from "@airport/ground-control";
import { Observable } from "rxjs";

export enum IsolateMessageType {
    ADD_REPOSITORY,
    COMMIT,
    DELETE_WHERE,
    FIND,
    FIND_ONE,
    INSERT_VALUES,
    INSERT_VALUES_GET_IDS,
    ROLLBACK,
    SEARCH,
    SEARCH_ONE,
    START_TRANSACTION,
    SAVE,
    UPDATE_VALUES
}

export interface IIsolateMessage {
    id: number
    isolateId: string
    type: IsolateMessageType
}

export interface IIsolateMessageOut<T>
    extends IIsolateMessage {
    result: T
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

