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
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_FROM_TM_ALREADY_SYNCED"] = 0] = "SYNC_FROM_TM_ALREADY_SYNCED";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_FROM_TM_SUCCESSFUL"] = 1] = "SYNC_FROM_TM_SUCCESSFUL";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_FROM_TM_DENIED_DATABASE_NOT_FOUND"] = 2] = "SYNC_FROM_TM_DENIED_DATABASE_NOT_FOUND";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_FROM_TM_DENIED_REPOSITORY_NOT_FOUND"] = 3] = "SYNC_FROM_TM_DENIED_REPOSITORY_NOT_FOUND";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION"] = 4] = "SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_SUCCESSFUL"] = 5] = "SYNC_TO_TM_SUCCESSFUL";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_READY_FOR_PROCESSING"] = 6] = "SYNC_TO_TM_READY_FOR_PROCESSING";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_SCHEMA_CHANGES"] = 7] = "SYNC_TO_TM_NEEDS_SCHEMA_CHANGES";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_ADDITIONAL_DATA"] = 8] = "SYNC_TO_TM_NEEDS_ADDITIONAL_DATA";
    RepoTransBlockSyncOutcomeType[RepoTransBlockSyncOutcomeType["SYNC_TO_TM_NEEDS_DATA_UPGRADES"] = 9] = "SYNC_TO_TM_NEEDS_DATA_UPGRADES";
})(RepoTransBlockSyncOutcomeType = exports.RepoTransBlockSyncOutcomeType || (exports.RepoTransBlockSyncOutcomeType = {}));
var MessageFromTMContentType;
(function (MessageFromTMContentType) {
    MessageFromTMContentType[MessageFromTMContentType["CONNECTION_REQUEST"] = 0] = "CONNECTION_REQUEST";
    MessageFromTMContentType[MessageFromTMContentType["SYNC_VERIFICATIONS"] = 1] = "SYNC_VERIFICATIONS";
    MessageFromTMContentType[MessageFromTMContentType["DATA_TRANSFER"] = 2] = "DATA_TRANSFER";
})(MessageFromTMContentType = exports.MessageFromTMContentType || (exports.MessageFromTMContentType = {}));
//# sourceMappingURL=MessageTypes.js.map