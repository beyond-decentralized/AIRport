export interface IArchivedPartitionManagementServer {

	indexSyncRecordPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void>;

	indexSyncLogPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void>;

	dropArchivedSyncRecordPartition(
		dateOfPartition: number
	): Promise<void>;

	dropArchivedSyncLogPartition(
		dateOfPartition: number
	): Promise<void>;

	deleteDatabaseSyncLogsWithoutChildSyncLogs( //
	): Promise<void>;
}

/**
 * (At least at first) archiving should only be performed on a partition
 * that is no longer queried for recent sync entries.
 * Before archiving of a particular date starts, add any required indexes
 * to the SyncRecord and SyncLog tables.
 * Once archiving has finished, drop the archived partitions.
 * Then delete all DatabaseSyncLog records that no longer have any SyncLog
 * children.
 */
export class ArchivedPartitionManagementServer
	implements IArchivedPartitionManagementServer {

	async indexSyncRecordPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void> {
	}

	async indexSyncLogPartitionToBeArchived(
		dateOfPartition: number
	): Promise<void> {
	}

	async dropArchivedSyncRecordPartition(
		dateOfPartition: number
	): Promise<void> {
	}

	async dropArchivedSyncLogPartition(
		dateOfPartition: number
	): Promise<void> {
	}

	async deleteDatabaseSyncLogsWithoutChildSyncLogs( //
	): Promise<void> {
	}

}
