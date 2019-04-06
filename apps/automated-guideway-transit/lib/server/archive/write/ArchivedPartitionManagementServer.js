"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * (At least at first) archiving should only be performed on a partition
 * that is no longer queried for daily sync entries.
 * Before archiving of a particular date starts, add any required indexes
 * to the AgtRepositoryTransactionBlock and SyncLog tables.
 * Once archiving has finished, drop the archived partitions.
 * Then delete all AgtSharingMessage records that no longer have any SyncLog
 * children.
 */
class ArchivedPartitionManagementServer {
    async indexRTBPartitionToBeArchived(dateOfPartition) {
    }
    async indexSyncLogPartitionToBeArchived(dateOfPartition) {
    }
    async dropArchivedRTBPartition(dateOfPartition) {
    }
    async dropArchivedSyncLogPartition(dateOfPartition) {
    }
    async deleteAgtSharingMessagesWithoutChildSyncLogs( //
    ) {
    }
}
exports.ArchivedPartitionManagementServer = ArchivedPartitionManagementServer;
//# sourceMappingURL=ArchivedPartitionManagementServer.js.map