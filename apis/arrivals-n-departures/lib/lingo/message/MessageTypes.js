"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageToTMContentType;
(function (MessageToTMContentType) {
    MessageToTMContentType[MessageToTMContentType["REPOSITORY_TRANSACTION_BLOCK"] = 0] = "REPOSITORY_TRANSACTION_BLOCK";
    MessageToTMContentType[MessageToTMContentType["SYNC_NOTIFICATION"] = 1] = "SYNC_NOTIFICATION";
    // SYNC_ACK,
    MessageToTMContentType[MessageToTMContentType["ALIVE_ACK"] = 2] = "ALIVE_ACK";
})(MessageToTMContentType = exports.MessageToTMContentType || (exports.MessageToTMContentType = {}));
var RepoTransBlockSyncOutcomeType;
(function (RepoTransBlockSyncOutcomeType) {
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["BLOCK_IS_LOCAL"] = 0] = "BLOCK_IS_LOCAL";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_SUCCESSFUL"] = 1] = "SYNC_TO_TM_SUCCESSFUL";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_READY_FOR_PROCESSING"] = 2] = "SYNC_TO_TM_READY_FOR_PROCESSING";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_SCHEMA_CHANGES"] = 3] = "SYNC_TO_TM_NEEDS_SCHEMA_CHANGES";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_ADDITIONAL_DATA"] = 4] = "SYNC_TO_TM_NEEDS_ADDITIONAL_DATA";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_INVALID_DATA"] = 5] = "SYNC_TO_TM_INVALID_DATA";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_DATA_UPGRADES"] = 6] = "SYNC_TO_TM_NEEDS_DATA_UPGRADES";
})(RepoTransBlockSyncOutcomeType = exports.RepoTransBlockSyncOutcomeType || (exports.RepoTransBlockSyncOutcomeType = {}));
var SharingNodeRepoTransBlockSyncStatus;
(function (SharingNodeRepoTransBlockSyncStatus) {
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["TM_STATUS_RTB_SYNCHRONIZING"] = 0] = "TM_STATUS_RTB_SYNCHRONIZING";
    // SYNCHRONIZED,
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["TM_STATUS_REQUESTING_RTB_SYNC_STATUS"] = 1] = "TM_STATUS_REQUESTING_RTB_SYNC_STATUS";
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["TM_STATUS_RTB_RESYNC_REQUESTED"] = 2] = "TM_STATUS_RTB_RESYNC_REQUESTED";
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_ALREADY_SYNCED"] = 3] = "AGT_STATUS_RTB_ALREADY_SYNCED";
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_SUCCESSFUL"] = 4] = "AGT_STATUS_RTB_SYNC_SUCCESSFUL";
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_DENIED_DATABASE_NOT_FOUND"] = 5] = "AGT_STATUS_RTB_SYNC_DENIED_DATABASE_NOT_FOUND";
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_DENIED_REPOSITORY_NOT_FOUND"] = 6] = "AGT_STATUS_RTB_SYNC_DENIED_REPOSITORY_NOT_FOUND";
    SharingNodeRepoTransBlockSyncStatus[SharingNodeRepoTransBlockSyncStatus["AGT_STATUS_RTB_SYNC_DENIED_NO_WRITE_PERMISSION"] = 7] = "AGT_STATUS_RTB_SYNC_DENIED_NO_WRITE_PERMISSION";
})(SharingNodeRepoTransBlockSyncStatus = exports.SharingNodeRepoTransBlockSyncStatus || (exports.SharingNodeRepoTransBlockSyncStatus = {}));
var MessageFromTMContentType;
(function (MessageFromTMContentType) {
    MessageFromTMContentType[MessageFromTMContentType["CONNECTION_REQUEST"] = 0] = "CONNECTION_REQUEST";
    MessageFromTMContentType[MessageFromTMContentType["SYNC_VERIFICATIONS"] = 1] = "SYNC_VERIFICATIONS";
    MessageFromTMContentType[MessageFromTMContentType["DATA_TRANSFER"] = 2] = "DATA_TRANSFER";
})(MessageFromTMContentType = exports.MessageFromTMContentType || (exports.MessageFromTMContentType = {}));
//# sourceMappingURL=MessageTypes.js.map