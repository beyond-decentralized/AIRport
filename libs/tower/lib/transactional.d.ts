import { ITransaction } from '@airport/ground-control';
/**
 * Created by Papa on 4/3/2019.
 */
export declare function transact(): Promise<ITransaction>;
export declare function commit(transaction: ITransaction): Promise<void>;
export declare function rollback(transaction: ITransaction): Promise<void>;
export declare function transactional<T>(callback: (transaction: ITransaction) => Promise<T>, keepAlive?: boolean): Promise<T>;
//# sourceMappingURL=transactional.d.ts.map