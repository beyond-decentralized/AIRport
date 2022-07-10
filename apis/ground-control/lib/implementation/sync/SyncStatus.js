export var BlockSyncStatus;
(function (BlockSyncStatus) {
    // Sync request has been sent but no reply has come yet
    BlockSyncStatus["SYNCHRONIZING"] = "SYNCHRONIZING";
    // Sync has been acknowledged by the AGT
    BlockSyncStatus["SYNCHRONIZED"] = "SYNCHRONIZED";
    // Sync has not been acked by AGT so, requesting sync status from AGT
    BlockSyncStatus["REQUESTING_SYNC_STATUS"] = "REQUESTING_SYNC_STATUS";
    /*
       Do not re-sync until AGT starts responds with a request for more data.
       NOTE: no need of a separate status, state is maintained on SharingNode level.
     */
    // RESYNC_SUSPENDED = 'RESYNC_SUSPENDED',
    // AGT requested re-sync for this block, send it again
    BlockSyncStatus["RESYNC_REQUESTED"] = "RESYNC_REQUESTED";
})(BlockSyncStatus || (BlockSyncStatus = {}));
export var RepositorySyncStatus;
(function (RepositorySyncStatus) {
    // Actively syncing this repository
    RepositorySyncStatus["ACTIVE"] = "ACTIVE";
    // AGT is not responding, temporarily pending AGT responses
    RepositorySyncStatus["PENDING"] = "PENDING";
    // AGT (or TM) delayed sync of this repository (for a period of time)
    RepositorySyncStatus["DELAYED"] = "DELAYED";
    // AGT (or TM) suspended sync of this repository
    RepositorySyncStatus["SUSPENDED"] = "SUSPENDED";
    // AGT (or TM) temporarily rerouted syncing of this repository to a different AGT
    RepositorySyncStatus["TEMPORARILY_REROUTED"] = "TEMPORARILY_REROUTED";
    // AGT (or TM) permanently rerouted syncing of this repository to a different AGT
    RepositorySyncStatus["PERMANENTLY_REROUTED"] = "PERMANENTLY_REROUTED";
})(RepositorySyncStatus || (RepositorySyncStatus = {}));
export var TerminalSyncStatus;
(function (TerminalSyncStatus) {
    // Terminal is actively syncing
    TerminalSyncStatus["ACTIVE"] = "ACTIVE";
    // Terminal syncing has been suspended
    TerminalSyncStatus["SUSPENDED"] = "SUSPENDED";
})(TerminalSyncStatus || (TerminalSyncStatus = {}));
//# sourceMappingURL=SyncStatus.js.map