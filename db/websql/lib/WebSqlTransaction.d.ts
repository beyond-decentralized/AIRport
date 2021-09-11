import { ITransactionHistory } from '@airport/holding-pattern';
import { ICredentials, ITransaction } from '@airport/terminal-map';
import { WebSqlDriver } from './WebSqlDriver';
export declare class WebSqlTransaction extends WebSqlDriver implements ITransaction {
    private driver;
    private nativeTransaction;
    credentials: ICredentials;
    transHistory: ITransactionHistory;
    constructor(driver: WebSqlDriver, nativeTransaction: any);
    saveTransaction(transaction: ITransactionHistory): Promise<any>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
//# sourceMappingURL=WebSqlTransaction.d.ts.map