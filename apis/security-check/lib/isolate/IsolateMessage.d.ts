import { DistributionStrategy, PlatformType, PortableQuery } from "@airport/ground-control";
export declare enum IsolateMessageInType {
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
export interface IIsolateMessageIn {
    id: number;
    isolateId: string;
    type: IsolateMessageInType;
}
export interface IAddRepositoryIMI extends IIsolateMessageIn {
    distributionStrategy: DistributionStrategy;
    name: string;
    platform: PlatformType;
    platformConfig: string;
    url: string;
}
export interface IPortableQueryIMI extends IIsolateMessageIn {
    portableQuery: PortableQuery;
}
export interface IReadQueryIMI extends IPortableQueryIMI {
    cachedSqlQueryId?: number;
    portableQuery: PortableQuery;
}
export interface ISaveIMI<E, T = E | E[]> extends IIsolateMessageIn {
    entity: T;
}
//# sourceMappingURL=IsolateMessage.d.ts.map