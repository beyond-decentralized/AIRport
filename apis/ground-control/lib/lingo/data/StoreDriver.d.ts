import { IObservable } from '@airport/observe';
import { DbColumn } from '../..';
import { SQLDataType } from '../core/field/JSONClause';
import { PortableQuery } from '../query/PortableQuery';
import { StoreType } from './storeInfo';
/**
 * Created by Papa on 6/10/2016.
 */
export declare enum QueryType {
    DDL = 0,
    SELECT = 1,
    MUTATE = 2
}
export interface ATransactionHistory {
}
export interface InternalSetFragment {
    column: DbColumn;
    value: any;
}
export interface InternalFragments {
    SELECT?: DbColumn[];
    SET?: InternalSetFragment[];
}
export declare const INVALID_TABLE_NAME = "A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890";
export interface IStoreDriver {
    type: StoreType;
    deleteWhere(portableQuery: PortableQuery): Promise<number>;
    doesTableExist(schemaName: string, tableName: string): Promise<boolean>;
    dropTable(schemaName: string, tableName: string): Promise<boolean>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<E>;
    findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    initialize(dbName: string): Promise<any>;
    insertValues(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<number>;
    query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    saveTransaction(transaction: ATransactionHistory): Promise<any>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): IObservable<E>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments): Promise<number>;
    transact(keepAlive?: boolean): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
}
//# sourceMappingURL=StoreDriver.d.ts.map