import {
    IContext,
    IInjectable
} from '@airport/di'
import {
    ApplicationName,
    DbEntity,
    DomainName,
    FullApplicationName,
    InternalFragments,
    PortableQuery,
    QueryType,
    SQLDataType,
    StoreType
} from '@airport/ground-control'
import { ITransactionHistory } from '@airport/holding-pattern'
import {
    ICredentials,
    IOperationContext,
    IStoreDriver,
    ITransaction
} from '@airport/terminal-map'
import { Observable } from 'rxjs'
import { v4 as uuidv4 } from "uuid";
import type { SqlJsDriver } from "./SqlJsDriver";

export class SqlJsTransaction
    implements ITransaction {

    childTransaction: ITransaction
    credentials: ICredentials
    id: string
    isSync = false

    transHistory: ITransactionHistory
    type: StoreType;

    constructor(
        private driver: SqlJsDriver,
        public parentTransaction: ITransaction
    ) {
        (<IInjectable>this).__container__ = (<IInjectable>driver).__container__
        this.id = uuidv4()
        this.type = driver.type
        if (parentTransaction) {
            parentTransaction.childTransaction = this
        }
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
        applicationName: string,
        tableName: string,
        context: IOperationContext,
    ): Promise<boolean> {
        return await this.driver.doesTableExist(applicationName, tableName, context)
    }

    async dropTable(
        applicationName: string,
        tableName: string,
        context: IOperationContext,
    ): Promise<boolean> {
        return await this.driver.dropTable(applicationName, tableName, context)
    }

    getEntityTableName(
        dbEntity: DbEntity,
        context: IContext,
    ): string {
        return this.driver.getEntityTableName(dbEntity, context)
    }

    getTableName(
        application: {
            domain: DomainName | {
                name: DomainName
            };
            name: ApplicationName;
            fullName?: FullApplicationName;
        },
        table: {
            name: string, tableConfig?: {
                name?: string
            }
        },
        context: IContext,
    ): string {
        return this.driver.getTableName(application, table, context)
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
        parentTransaction?: ITransaction,
    ): Promise<void> {
        await transactionalCallback(this);
    }

    async startTransaction(
		transaction: ITransaction,
	): Promise<void> {
        throw new Error(`Nested transactions are not supported`)
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