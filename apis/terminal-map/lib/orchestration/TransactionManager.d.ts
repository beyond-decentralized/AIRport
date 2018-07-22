import { StoreType } from "@airport/ground-control";
import { ITransactionHistory } from "@airport/holding-pattern";
export interface ITransactionManager {
    currentTransHistory: ITransactionHistory;
    storeType: StoreType;
    initialize(dbName: string): Promise<void>;
    startTransaction(transactionIndex: number): Promise<void>;
    rollbackTransaction(transactionIndex: number): Promise<void>;
    commitTransaction(transactionIndex: number): Promise<void>;
}
