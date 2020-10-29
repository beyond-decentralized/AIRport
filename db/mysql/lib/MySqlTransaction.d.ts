import { ATransactionHistory, InternalFragments, ITransaction, PortableQuery, QueryType, SQLDataType } from '@airport/ground-control';
import { Connection, Pool } from 'mysql2/promise';
import { MySqlDriver } from './MySqlDriver';
export declare class MySqlTransaction implements ITransaction {
    private driver;
    private pool;
    private connection;
    constructor(driver: MySqlDriver, pool: Pool, connection: Connection);
    deleteWhere(portableQuery: PortableQuery): Promise<number>;
    find<E, EntityArray extends E[]>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<E>;
    findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    insertValues(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<number>;
    query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    saveTransaction(transaction: ATransactionHistory): Promise<any>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments): Promise<number>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
}
//# sourceMappingURL=MySqlTransaction.d.ts.map