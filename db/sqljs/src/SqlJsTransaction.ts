import {
    IContext,
    IInjectable
} from '@airport/di'
import {
    DbEntity,
    DomainName,
    InternalFragments,
    IStoreDriver,
    PortableQuery,
    QueryType,
    SchemaName,
    SchemaStatus,
    SQLDataType,
    StoreType
} from '@airport/ground-control'
import { ITransactionHistory } from '@airport/holding-pattern'
import {
    ICredentials,
    IOperationContext,
    ITransaction
} from '@airport/terminal-map'
import {Observable}   from 'rxjs'
import type { SqlJsDriver } from "./SqlJsDriver";

export class SqlJsTransaction
    implements ITransaction {

    credentials: ICredentials
    transHistory: ITransactionHistory
    type: StoreType;

    constructor(
        private driver: SqlJsDriver
    ) {
        (<IInjectable>this).__container__ = (<IInjectable>driver).__container__
        this.type = driver.type
    }

    async commit(): Promise<void> {
        this.driver.commit();
    }

    async rollback(): Promise<void> {
        this.driver.rollback();
    }

    async saveTransaction(transaction: ITransactionHistory): Promise<any> {
    }

    async query(
        queryType: QueryType,
        query: string,
        params = [],
        context: IOperationContext,
        saveTransaction: boolean = false
    ): Promise<any> {
        return this.driver.query(queryType, query, params, context, saveTransaction)
    }

    async doesTableExist(
        schemaName: string,
        tableName: string,
        context: IOperationContext,
    ): Promise<boolean> {
        return await this.driver.doesTableExist(schemaName, tableName, context)
    }

    async dropTable(
        schemaName: string,
        tableName: string,
        context: IOperationContext,
    ): Promise<boolean> {
        return await this.driver.dropTable(schemaName, tableName, context)
    }

    getEntityTableName(
        dbEntity: DbEntity,
        context: IContext,
    ): string {
        return this.driver.getEntityTableName(dbEntity, context)
    }

    getTableName(
        schema: {
            domain: DomainName | {
                name: DomainName
            };
            name: SchemaName;
            status?: SchemaStatus;
        },
        table: {
            name: string, tableConfig?: {
                name?: string
            }
        },
        context: IContext,
    ): string {
        return this.driver.getTableName(schema, table, context)
    }

    async initialize(
        dbName: string,
        context: IContext,
    ): Promise<any> {
        // Nothing to do
    }

    search<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        internalFragments: InternalFragments,
        context: IContext,
        cachedSqlQueryId?: number,
    ): Observable<EntityArray> {
        return this.driver.search(portableQuery, internalFragments, context, cachedSqlQueryId)
    }

    searchOne<E>(
        portableQuery: PortableQuery,
        internalFragments: InternalFragments,
        context: IContext,
        cachedSqlQueryId?: number,
    ): Observable<E> {
        return this.driver.searchOne(portableQuery, internalFragments, context, cachedSqlQueryId)
    }

    async transact(
        transactionalCallback: {
            (
                transaction: IStoreDriver
            ): Promise<void> | void
        },
        context: IContext,
    ): Promise<void> {
        await transactionalCallback(this);
    }

    isServer(
        context?: IContext,
    ): boolean {
        return false
    }

    async deleteWhere(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        return await this.driver.deleteWhere(portableQuery, context)
    }

    async find<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        internalFragments: InternalFragments,
        context: IContext,
        cachedSqlQueryId?: number,
    ): Promise<EntityArray> {
        return await this.driver.find(portableQuery, internalFragments, context, cachedSqlQueryId)
    }

    async findOne<E>(
        portableQuery: PortableQuery,
        internalFragments: InternalFragments,
        context: IContext,
        cachedSqlQueryId?: number,
    ): Promise<E> {
        return await this.driver.findOne(portableQuery, internalFragments, context, cachedSqlQueryId)
    }

    async findNative(
        sqlQuery: string,
        parameters: any[],
        context: IOperationContext,
    ): Promise<any[]> {
        return await this.driver.findNative(sqlQuery, parameters, context)
    }

    async insertValues(
        portableQuery: PortableQuery,
        context: IContext,
        cachedSqlQueryId?: number,
    ): Promise<number> {
        return await this.driver.insertValues(portableQuery, context, cachedSqlQueryId)
    }


    async updateWhere(
        portableQuery: PortableQuery,
        internalFragments: InternalFragments,
        context: IContext,
    ): Promise<number> {
        return await this.driver.updateWhere(portableQuery, internalFragments, context)
    }

    isValueValid(
        value: any,
        sqlDataType: SQLDataType,
        context: IOperationContext,
    ): boolean {
        return this.driver.isValueValid(value, sqlDataType, context)
    }

}