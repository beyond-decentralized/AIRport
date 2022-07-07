import { IContext } from '@airport/direction-indicator';
import { Application_Name, DbEntity, Domain_Name, FullApplication_Name, IStoreOperator, JsonQuery, StoreType } from '@airport/ground-control';
import { ITransaction } from '../../transaction/ITransaction';
import { ITransactionContext } from '../../orchestration/TransactionManager';
/**
 * Created by Papa on 6/10/2016.
 */
export declare const INVALID_TABLE_NAME = "A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890";
export interface IStoreDriver extends IStoreOperator {
    type: StoreType;
    doesTableExist(applicationName: string, tableName: string, context: IContext): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IContext): Promise<boolean>;
    getEntityTableName(dbEntity: DbEntity, context: IContext): string;
    getSelectQuerySuffix(jsonQuery: JsonQuery, context: IContext): string;
    getTableName(application: {
        domain: Domain_Name | {
            name: Domain_Name;
        };
        name: Application_Name;
        fullName?: FullApplication_Name;
    }, table: {
        name: string;
        tableConfig?: {
            name?: string;
        };
    }, context: IContext): string;
    initialize(dbName: string, context: IContext): Promise<any>;
    setupTransaction(context: ITransactionContext, parentTransaction?: ITransaction): Promise<ITransaction>;
    tearDownTransaction(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    startTransaction(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    commit(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    rollback(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    isServer(context?: IContext): boolean;
}
//# sourceMappingURL=StoreDriver.d.ts.map