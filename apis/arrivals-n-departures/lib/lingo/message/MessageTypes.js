export var MessageToTMContentType;
(function (MessageToTMContentType) {
    MessageToTMContentType["REPOSITORY_TRANSACTION_BLOCK"] = "REPOSITORY_TRANSACTION_BLOCK";
    MessageToTMContentType["SYNC_NOTIFICATION"] = "SYNC_NOTIFICATION";
    // SYNC_ACK = 'SYNC_ACK',
    MessageToTMContentType["ALIVE_ACK"] = "ALIVE_ACK";
})(MessageToTMContentType || (MessageToTMContentType = {}));
export var RepoTransBlockSyncOutcomeType;
(function (RepoTransBlockSyncOutcomeType) {
    RepoTransBlockSyncOutcomeType["BLOCK_IS_LOCAL"] = "BLOCK_IS_LOCAL";
    RepoTransBlockSyncOutcomeType["SYNC_TO_TM_SUCCESSFUL"] = "SYNC_TO_TM_SUCCESSFUL";
    RepoTransBlockSyncOutcomeType["SYNC_TO_TM_READY_FOR_PROCESSING"] = "SYNC_TO_TM_READY_FOR_PROCESSING";
    RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_SCHEMA_CHANGES"] = "SYNC_TO_TM_NEEDS_SCHEMA_CHANGES";
    RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_ADDITIONAL_DATA"] = "SYNC_TO_TM_NEEDS_ADDITIONAL_DATA";
    RepoTransBlockSyncOutcomeType["SYNC_TO_TM_INVALID_DATA"] = "SYNC_TO_TM_INVALID_DATA";
    RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_DATA_UPGRADES"] = "SYNC_TO_TM_NEEDS_DATA_UPGRADES";
})(RepoTransBlockSyncOutcomeType || (RepoTransBlockSyncOutcomeType = {}));
export var SharingNodeRepoTransBlockSyncStatus;
(function (SharingNodeRepoTransBlockSyncStatus) {
    SharingNodeRepoTransBlockSyncStatus["TM_STATUS_RTB_SYNCHRONIZING"] = "TM_STATUS_RTB_SYNCHRONIZING";
    // SYNCHRONIZED = 'SYNCHRONIZED',
    SharingNodeRepoTransBlockSyncStatus["TM_STATUS_REQUESTING_RTB_SYNC_STATUS"] = "TM_STATUS_REQUESTING_RTB_SYNC_STATUS";
    SharingNodeRepoTransBlockSyncStatus["TM_STATUS_RTB_RESYNC_REQUESTED"] = "TM_STATUS_RTB_RESYNC_REQUESTED";
    SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_ALREADY_SYNCED"] = "AGT_STATUS_RTB_ALREADY_SYNCED";
    SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_SUCCESSFUL"] = "AGT_STATUS_RTB_SYNC_SUCCESSFUL";
    SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_DENIED_DATABASE_NOT_FOUND"] = "AGT_STATUS_RTB_SYNC_DENIED_DATABASE_NOT_FOUND";
    SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_DENIED_REPOSITORY_NOT_FOUND"] = "AGT_STATUS_RTB_SYNC_DENIED_REPOSITORY_NOT_FOUND";
    SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_DENIED_NO_WRITE_PERMISSION"] = "AGT_STATUS_RTB_SYNC_DENIED_NO_WRITE_PERMISSION";
})(SharingNodeRepoTransBlockSyncStatus || (SharingNodeRepoTransBlockSyncStatus = {}));
export var MessageFromTMContentType;
(function (MessageFromTMContentType) {
    MessageFromTMContentType["CONNECTION_REQUEST"] = "CONNECTION_REQUEST";
    MessageFromTMContentType["SYNC_VERIFICATIONS"] = "SYNC_VERIFICATIONS";
    MessageFromTMContentType["DATA_TRANSFER"] = "DATA_TRANSFER";
})(MessageFromTMContentType || (MessageFromTMContentType = {}));
//# sourceMappingURL=MessageTypes.js.map