"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockSyncStatus;
(function (BlockSyncStatus) {
    // Sync request has been sent but no reply has come yet
    BlockSyncStatus[BlockSyncStatus["SYNCHRONIZING"] = 0] = "SYNCHRONIZING";
    // Sync has been acknowledged by the AGT
    BlockSyncStatus[BlockSyncStatus["SYNCHRONIZED"] = 1] = "SYNCHRONIZED";
    // Sync has not been acked by AGT so, requesting sync status from AGT
    BlockSyncStatus[BlockSyncStatus["REQUESTING_SYNC_STATUS"] = 2] = "REQUESTING_SYNC_STATUS";
    /*
       Do not re-sync until AGT starts responds with a request for more data.
       NOTE: no need of a separate status, state is maintained on SharingNode level.
     */
    // RESYNC_SUSPENDED,
    // AGT requested re-sync for this block, send it again
    BlockSyncStatus[BlockSyncStatus["RESYNC_REQUESTED"] = 3] = "RESYNC_REQUESTED";
})(BlockSyncStatus = exports.BlockSyncStatus || (exports.BlockSyncStatus = {}));
var RepositorySyncStatus;
(function (RepositorySyncStatus) {
    // Actively syncing this repository
    RepositorySyncStatus[RepositorySyncStatus["ACTIVE"] = 0] = "ACTIVE";
    // AGT is not responding, temporarily pending AGT responses
    RepositorySyncStatus[RepositorySyncStatus["PENDING"] = 1] = "PENDING";
    // AGT (or TM) delayed sync of this repository (for a period of time)
    RepositorySyncStatus[RepositorySyncStatus["DELAYED"] = 2] = "DELAYED";
    // AGT (or TM) suspended sync of this repository
    RepositorySyncStatus[RepositorySyncStatus["SUSPENDED"] = 3] = "SUSPENDED";
    // AGT (or TM) temporarily rerouted syncing of this repository to a different AGT
    RepositorySyncStatus[RepositorySyncStatus["TEMPORARILY_REROUTED"] = 4] = "TEMPORARILY_REROUTED";
    // AGT (or TM) permanently rerouted syncing of this repository to a different AGT
    RepositorySyncStatus[RepositorySyncStatus["PERMANENTLY_REROUTED"] = 5] = "PERMANENTLY_REROUTED";
})(RepositorySyncStatus = exports.RepositorySyncStatus || (exports.RepositorySyncStatus = {}));
var TerminalSyncStatus;
(function (TerminalSyncStatus) {
    // Terminal is actively syncing
    TerminalSyncStatus[TerminalSyncStatus["ACTIVE"] = 0] = "ACTIVE";
    // Terminal syncing has been suspended
    TerminalSyncStatus[TerminalSyncStatus["SUSPENDED"] = 1] = "SUSPENDED";
})(TerminalSyncStatus = exports.TerminalSyncStatus || (exports.TerminalSyncStatus = {}));
//# sourceMappingURL=SyncStatus.js.map