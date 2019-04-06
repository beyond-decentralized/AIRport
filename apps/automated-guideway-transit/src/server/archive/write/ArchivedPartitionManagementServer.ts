export interface IArchivedPartitionManagementServer {

	indexRTBPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void>;

	indexSyncLogPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void>;

	dropArchivedRTBPartition(
		dateOfPartition: number
	): Promise<void>;

	dropArchivedSyncLogPartition(
		dateOfPartition: number
	): Promise<void>;

	deleteAgtSharingMessagesWithoutChildSyncLogs( //
	): Promise<void>;
}

/**
 * (At least at first) archiving should only be performed on a partition
 * that is no longer queried for daily sync entries.
 * Before archiving of a particular date starts, add any required indexes
 * to the AgtRepositoryTransactionBlock and SyncLog tables.
 * Once archiving has finished, drop the archived partitions.
 * Then delete all AgtSharingMessage records that no longer have any SyncLog
 * downstream.
 */
export class ArchivedPartitionManagementServer
	implements IArchivedPartitionManagementServer {

	async indexRTBPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void> {
	}

	async indexSyncLogPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void> {
	}

	async dropArchivedRTBPartition(
		dateOfPartition: number
	): Promise<void> {
	}

	async dropArchivedSyncLogPartition(
		dateOfPartition: number
	): Promise<void> {
	}

	async deleteAgtSharingMessagesWithoutChildSyncLogs( //
	): Promise<void> {
	}

}
