import { IStoreDriver } from "@airport/ground-control";
import { IRepository, IRepositoryTransactionHistory, ITransactionHistory } from "@airport/holding-pattern";
/**
 * Created by Papa on 5/31/2016.
 */
export interface IOfflineDeltaStore {
    addRemoteChanges(repository: IRepository, transactions: IRepositoryTransactionHistory[]): Promise<void>;
    addChange(transaction: ITransactionHistory): Promise<ITransactionHistory>;
    markChangesAsSynced(repository: IRepository, transactions: IRepositoryTransactionHistory[]): Promise<void>;
}
export declare function getOfflineDeltaStore(localStore: IStoreDriver): IOfflineDeltaStore;