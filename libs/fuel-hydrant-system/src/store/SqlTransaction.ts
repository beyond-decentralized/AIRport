import {
    IContext,
    IInjected
} from '@airport/direction-indicator'
import {
    DbApplication_Name,
    DbEntity,
    DbDomain_Name,
    DbApplication_FullName,
    InternalFragments,
    Query,
    PortableQuery,
    QueryType,
    SQLDataType,
    StoreType,
    IActor,
    ITransactionHistory,
    IRepositoryMember,
    SyncApplicationMap,
    Repository_GUID,
    Repository_LocalId
} from '@airport/ground-control'
import {
    IOperationContext,
    IStoreDriver,
    ITransaction,
    ITransactionContext,
    ITransactionCredentials
} from '@airport/terminal-map'
import { v4 as guidv4 } from "uuid";

export abstract class SqlTransaction
    implements ITransaction {

    actor: IActor
    childTransaction: ITransaction
    credentials: ITransactionCredentials
    fieldMap: SyncApplicationMap = new SyncApplicationMap()
    id: string
    isSync = false
    newRepositoryMembers: IRepositoryMember[] = []
    affectedRepository_GUIDSet: Set<Repository_GUID> = new Set()
    affectedRepository_LocalIdSet: Set<Repository_LocalId> = new Set()
    updatedRepositoryMembers: IRepositoryMember[] = []

    transactionHistory: ITransactionHistory
    type: StoreType;

    initiator = {
        application: '',
        domain: '',
        methodName: '',
        objectName: ''
    }

    constructor(
        protected driver: IStoreDriver,
        public parentTransaction: ITransaction
    ) {
        (<IInjected>this).__container__ = (<IInjected>driver).__container__
        this.id = guidv4()
        this.type = driver.type
        if (parentTransaction) {
            parentTransaction.childTransaction = this
        }
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

    getSelectQuerySuffix(
        query: Query,
        context: IContext,
    ): string {

        return this.driver.getSelectQuerySuffix(query, context)
    }

    getTableName(
        application: {
            domain: DbDomain_Name | {
                name: DbDomain_Name
            };
            name: DbApplication_Name;
            fullName?: DbApplication_FullName;
        },
        applicationIntegerVersion: number,
        table: {
            name: string, tableConfig?: {
                name?: string
            }
        },
        context: IContext,
    ): string {
        return this.driver.getTableName(
            application, applicationIntegerVersion, table, context)
    }

    async initialize(
        dbName: string,
        context: IContext,
    ): Promise<any> {
        // Nothing to do
    }

    async startTransaction(
        transaction: ITransaction,
        context: ITransactionContext
    ): Promise<void> {
        throw new Error(`Nested transactions are not supported`)
    }

    async setupTransaction(
        context: ITransactionContext,
        parentTransaction?: ITransaction,
    ): Promise<ITransaction> {
        throw new Error(`Nested transactions are not supported`)
    }

    async tearDownTransaction(
        transaction: ITransaction,
        context: ITransactionContext
    ): Promise<void> {
        throw new Error(`Nested transactions are not supported`)
    }

    async commit(
        transaction: ITransaction,
        context: ITransactionContext
    ): Promise<void> {
        await this.driver.commit(this, context)
    }

    async rollback(
        transaction: ITransaction,
        context: ITransactionContext
    ): Promise<void> {
        await this.driver.rollback(this, context)
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