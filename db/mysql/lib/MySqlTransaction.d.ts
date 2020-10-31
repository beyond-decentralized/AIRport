import { ITransaction } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern';
import { ICredentials } from '@airport/terminal-map';
import { Connection, Pool } from 'mysql2/promise';
import { MySqlDriver } from './MySqlDriver';
export declare class MySqlTransaction extends MySqlDriver implements ITransaction {
    private driver;
    private connection;
    credentials: ICredentials;
    transHistory: ITransactionHistory;
    constructor(driver: MySqlDriver, pool: Pool, connection: Connection);
    saveTransaction(transaction: ITransactionHistory): Promise<any>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
//# sourceMappingURL=MySqlTransaction.d.ts.map