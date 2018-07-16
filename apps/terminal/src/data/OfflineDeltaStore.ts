import { OfflineSqlDeltaStore } from "./offline/sql/OfflineSqlDeltaStore";
import { IStoreDriver } from "@airport/ground-control";
import {
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory
} from "@airport/holding-pattern";
import { StoreType } from "@airport/terminal-map";

/**
 * Created by Papa on 5/31/2016.
 */

export interface IOfflineDeltaStore {

	addRemoteChanges(
		repository: IRepository,
		transactions: IRepositoryTransactionHistory[]
	): Promise<void>;

	addChange(
		transaction: ITransactionHistory
	): Promise<ITransactionHistory>;

	markChangesAsSynced(
		repository: IRepository,
		transactions: IRepositoryTransactionHistory[]
	): Promise<void>;

}

export function getOfflineDeltaStore(
	localStore: IStoreDriver,
): IOfflineDeltaStore {
	switch (localStore.type) {
		case StoreType.SQLITE_CORDOVA:
		case StoreType.SQLJS:
			throw `Implement!`;
		// return new OfflineSqlDeltaStore(localStore);
		default:
			throw `Unsupported LocalStoreType: ${localStore.type}`;
	}
}