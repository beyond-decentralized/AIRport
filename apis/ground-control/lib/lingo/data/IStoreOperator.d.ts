import { IContext } from '@airport/di';
import { SQLDataType } from '../core/field/JSONClause';
import { PortableQuery } from '../query/PortableQuery';
import { DbColumn } from '../application/Property';
export declare enum QueryType {
    DDL = "DDL",
    SELECT = "SELECT",
    MUTATE = "MUTATE"
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
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, ctx: IContext, cachedSqlQueryId?: number): Promise<E>;
    findNative(sqlQuery: string, parameters: any[], context: IContext): Promise<any[]>;
    insertValues(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<number>;
    query(queryType: QueryType, query: string, params: any, context: IContext, saveTransaction?: boolean): Promise<any>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext): Promise<number>;
    isValueValid(value: any, sqlDataType: SQLDataType, context: IContext): boolean;
}
//# sourceMappingURL=IStoreOperator.d.ts.map