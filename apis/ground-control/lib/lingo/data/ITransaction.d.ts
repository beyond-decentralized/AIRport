import { ATransactionHistory, IStoreOperator } from './IStoreOperator';
export interface ITransaction extends IStoreOperator {
    saveTransaction(transaction: ATransactionHistory): Promise<any>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
//# sourceMappingURL=ITransaction.d.ts.map