import { IContext } from "@airport/di";
import {
    DistributionStrategy,
    PlatformType,
    PortableQuery
} from "@airport/ground-control";

export enum IsolateMessageInType {
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

export interface IIsolateMessageIn {
    id: number
    isolateId: string
    type: IsolateMessageInType
}

export interface IAddRepositoryIMI
    extends IIsolateMessageIn {
    distributionStrategy: DistributionStrategy
    name: string
    platform: PlatformType
    platformConfig: string
    url: string
}

export interface IPortableQueryIMI
    extends IIsolateMessageIn {
    portableQuery: PortableQuery
}

export interface IReadQueryIMI
    extends IPortableQueryIMI {
    cachedSqlQueryId?: number
    portableQuery: PortableQuery
}

export interface ISaveIMI<E, T = E | E[]>
    extends IIsolateMessageIn {
    entity: T
}

