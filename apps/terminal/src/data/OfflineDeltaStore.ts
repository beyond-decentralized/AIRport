import {DI}                  from '@airport/di'
import { IStoreDriver }      from "@airport/ground-control";
import {
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory
}                            from "@airport/holding-pattern";
import { StoreType }         from "@airport/terminal-map";
import {OFFLINE_DELTA_STORE} from '../diTokens'

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

export class OfflineDeltaStore {

	addRemoteChanges(
		repository: IRepository,
		transactions: IRepositoryTransactionHistory[]
	): Promise<void> {
		throw `Implement!`;
	}

	addChange(
		transaction: ITransactionHistory
	): Promise<ITransactionHistory> {
		throw `Implement!`;
	}

	markChangesAsSynced(
		repository: IRepository,
		transactions: IRepositoryTransactionHistory[]
	): Promise<void> {
		throw `Implement!`;
	}

}

DI.set(OFFLINE_DELTA_STORE, OfflineDeltaStore);

