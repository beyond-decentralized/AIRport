import { ITransactionHistory } from '@airport/holding-pattern';
import { IStoreDriver } from '../core/data/StoreDriver';
import { ITransactionCredentials } from '../Credentials';
export interface ITransactionInitiator {
    application: string;
    domain: string;
    methodName: string;
    objectName: string;
}
export interface ITransaction extends IStoreDriver {
    childTransaction: ITransaction;
    credentials: ITransactionCredentials;
    id: string;
    initiator: ITransactionInitiator;
    isSync: boolean;
    parentTransaction: ITransaction;
    transHistory: ITransactionHistory;
    saveTransaction(transaction: ITransactionHistory): Promise<void>;
}
//# sourceMappingURL=ITransaction.d.ts.map