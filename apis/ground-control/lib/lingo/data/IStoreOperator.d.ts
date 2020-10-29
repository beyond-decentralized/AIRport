import { SQLDataType } from '../core/field/JSONClause';
import { PortableQuery } from '../query/PortableQuery';
import { DbColumn } from '../schema/Property';
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
export interface IStoreOperator {
    deleteWhere(portableQuery: PortableQuery): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<E>;
    findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    insertValues(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<number>;
    query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments): Promise<number>;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
}
//# sourceMappingURL=IStoreOperator.d.ts.map