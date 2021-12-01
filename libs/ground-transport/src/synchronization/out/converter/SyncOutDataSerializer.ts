import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { DI } from "@airport/di";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern";
import { SYNC_OUT_DATA_SERIALIZER } from "../../../tokens";

export interface ISyncOutDataSerializer {

	serialize(
		repositoryTransactionHistories: IRepositoryTransactionHistory
	): RepositorySynchronizationMessage[]
}

export class SyncOutDataSerializer
	implements ISyncOutDataSerializer {

	serialize(
		repositoryTransactionHistories: IRepositoryTransactionHistory
	): RepositorySynchronizationMessage[] {
		return []
	}

}
DI.set(SYNC_OUT_DATA_SERIALIZER, SyncOutDataSerializer)
