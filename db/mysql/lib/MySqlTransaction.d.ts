import { ATransactionHistory, ITransaction } from '@airport/ground-control';
import { Connection, Pool } from 'mysql2/promise';
import { MySqlDriver } from './MySqlDriver';
export declare class MySqlTransaction extends MySqlDriver implements ITransaction {
    private driver;
    private connection;
    transHisto: any;
    constructor(driver: MySqlDriver, pool: Pool, connection: Connection);
    saveTransaction(transaction: ATransactionHistory): Promise<any>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
//# sourceMappingURL=MySqlTransaction.d.ts.map