import { ITransactionHistory } from '@airport/holding-pattern';
import { ICredentials, ITransaction } from '@airport/terminal-map';
import pg from 'pg';
import { PostgreSqlDriver } from './PostgreSqlDriver';
export declare class PostgreTransaction extends PostgreSqlDriver implements ITransaction {
    private driver;
    private client;
    credentials: ICredentials;
    transHistory: ITransactionHistory;
    constructor(driver: PostgreSqlDriver, pool: pg.Pool, client: pg.PoolClient);
    saveTransaction(transaction: ITransactionHistory): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    protected getClient(): Promise<pg.PoolClient | pg.Pool>;
}
//# sourceMappingURL=PostgreTransaction.d.ts.map