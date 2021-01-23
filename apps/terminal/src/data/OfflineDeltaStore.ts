import { DI }                  from '@airport/di';
import {
	IStoreDriver,
	StoreType
}                              from '@airport/ground-control';
import {
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory
}                              from '@airport/holding-pattern';
import { OFFLINE_DELTA_STORE } from '../tokens';

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
			throw new Error(`Implement!`);
		// return new OfflineSqlDeltaStore(localStore);
		default:
			throw new Error(`Unsupported LocalStoreType: ${localStore.type}`);
	}
}

export class OfflineDeltaStore {

	addRemoteChanges(
		repository: IRepository,
		transactions: IRepositoryTransactionHistory[]
	): Promise<void> {
		throw new Error(`Implement!`);
	}

	addChange(
		transaction: ITransactionHistory
	): Promise<ITransactionHistory> {
		throw new Error(`Implement!`);
	}

	markChangesAsSynced(
		repository: IRepository,
		transactions: IRepositoryTransactionHistory[]
	): Promise<void> {
		throw new Error(`Implement!`);
	}

}

DI.set(OFFLINE_DELTA_STORE, OfflineDeltaStore);

