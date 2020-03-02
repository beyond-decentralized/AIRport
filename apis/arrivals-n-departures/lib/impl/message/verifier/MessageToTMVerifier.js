"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../../tokens");
const lingo_1 = require("../../../lingo/lingo");
const AbstractCommonMessageVerifier_1 = require("./AbstractCommonMessageVerifier");
class MessageToTMVerifier extends AbstractCommonMessageVerifier_1.AbstractCommonMessageVerifier {
    verifyMessagesBatch(batchedMessages) {
        if (!(batchedMessages instanceof Array)) {
            return [lingo_1.MessageToTMError.MESSAGES_BATCH_IS_NOT_ARRAY, typeof batchedMessages];
        }
        if (batchedMessages.length !== 4) {
            return [lingo_1.MessageToTMError.WRONG_MESSAGES_BATCH_LENGTH, batchedMessages.length];
        }
        let error = this.verifyBatchHeader(batchedMessages);
        if (error) {
            return error;
        }
        const messages = batchedMessages[3];
        if (!(messages instanceof Array)) {
            return [lingo_1.MessageToTMError.MESSAGES_IS_NOT_ARRAY, typeof batchedMessages];
        }
        // It is OK for a reply not to have any data in it
        // if (!messages.length) {
        // 	return [MessageToTMError.NO_MESSAGES_IN_ARRAY, messages.length];
        // }
        messages.some((message, index) => {
            error = this.verifyMessage(message, index);
            return !!error;
        });
        if (error) {
            return error;
        }
        return [lingo_1.MessageToTMError.NO_DATA_ERROR, null];
    }
    verifyBatchHeader(batchedMessages) {
        let error = this.verifyMessageProtocol(batchedMessages[0], lingo_1.MessageToTMError);
        if (error) {
            return error;
        }
        const targetTerminalIds = batchedMessages[1];
        if (!(targetTerminalIds instanceof Array)) {
            return [lingo_1.MessageToTMError.TARGET_AGT_DATABASE_IDS_IS_NOT_ARRAY, typeof batchedMessages];
        }
        targetTerminalIds.some((targetTerminalId, index) => {
            if (typeof targetTerminalId !== 'number') {
                error = [lingo_1.MessageToTMError.TARGET_AGT_DATABASE_ID_IS_NOT_NUMBER,
                    typeof targetTerminalId, index];
                return true;
            }
            if (targetTerminalId < 1) {
                error = [lingo_1.MessageToTMError.TARGET_AGT_DATABASE_ID_IS_INVALID_NUMBER,
                    targetTerminalId, index];
                return true;
            }
        });
        const agtSharingMessageId = batchedMessages[2];
        if (typeof agtSharingMessageId !== 'number') {
            return [lingo_1.MessageToTMError.AGT_DATABASE_SYNC_LOG_ID_IS_NOT_NUMBER,
                typeof agtSharingMessageId];
        }
        if (agtSharingMessageId < 1) {
            return [lingo_1.MessageToTMError.AGT_DATABASE_SYNC_LOG_ID_IS_INVALID_NUMBER,
                agtSharingMessageId];
        }
        return error;
    }
    verifyMessage(message, index) {
        const error = this.verifyMessageHeader(message, 0, lingo_1.MessageToTMError, index);
        if (error) {
            return error;
        }
        const contentType = message[0];
        switch (contentType) {
            case lingo_1.MessageToTMContentType.SYNC_NOTIFICATION:
                return this.verifySyncNotificationMessage(message, index);
            case lingo_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK:
                return this.verifyRepoTransBlockMessage(message, index);
            case lingo_1.MessageToTMContentType.ALIVE_ACK:
                // FIXME: implement
                return [lingo_1.MessageToTMError.UNSUPPORTED_CONTENT_TYPE, contentType, index];
            default:
                return [lingo_1.MessageToTMError.WRONG_CONTENT_TYPE, contentType, index];
        }
    }
    verifySyncNotificationMessage(message, index) {
        if (typeof message[1] !== 'number') {
            return [lingo_1.MessageToTMError.TM_SHARING_MESSAGE_ID_IS_NOT_NUMBER, typeof message[1], index];
        }
        // if (typeof message[2] !== 'number') {
        // 	return [MessageToTMError.AGT_DATABASE_SYNC_LOG_ID_IS_NOT_NUMBER, typeof
        // message[2], index]; } if (typeof message[2] !== 'number') { return
        // [MessageToTMError.AGT_SYNC_RECORD_ADD_DATETIME_IS_NOT_NUMBER, typeof message[2],
        // index]; }
        let error;
        message[2].some((syncOutcome, syncOutcomeIndex) => {
            if (typeof syncOutcome[0] !== 'number') {
                error = [lingo_1.MessageToTMError.TM_REPOSITORY_TRANSACTION_BLOCK_ID_IS_NOT_NUMBER,
                    typeof syncOutcome[0], index, syncOutcomeIndex];
                return true;
            }
            if (typeof syncOutcome[1] !== 'number') {
                error = [lingo_1.MessageToTMError.AGT_SYNC_RECORD_ID_IS_NOT_NUMBER,
                    typeof syncOutcome[1], index, syncOutcomeIndex];
                return true;
            }
            switch (syncOutcome[2]) {
                case lingo_1.SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_ALREADY_SYNCED:
                case lingo_1.SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_DENIED_NO_WRITE_PERMISSION:
                case lingo_1.SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_DENIED_DATABASE_NOT_FOUND:
                case lingo_1.SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_DENIED_REPOSITORY_NOT_FOUND:
                case lingo_1.SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_SUCCESSFUL:
                    break;
                default:
                    error = [lingo_1.MessageToTMError.WRONG_REPO_TRANS_BLOCK_SYNC_OUTCOME_TYPE,
                        typeof syncOutcome[1], index, syncOutcomeIndex];
                    return true;
            }
        });
        return error; // may be void
    }
    verifyRepoTransBlockMessage(message, index) {
        if (typeof message[1] !== 'number') {
            return [lingo_1.MessageToTMError.AGT_SYNC_RECORD_ID_IS_NOT_NUMBER, typeof message[1], index];
        }
        if (typeof message[2] !== 'number') {
            return [lingo_1.MessageToTMError.AGT_DATABASE_ID_IS_NOT_NUMBER, typeof message[2], index];
        }
        if (typeof message[3] !== 'number') {
            return [lingo_1.MessageToTMError.AGT_REPOSITORY_ID_IS_NOT_NUMBER, typeof message[3], index];
        }
        if (typeof message[4] !== 'number') {
            return [lingo_1.MessageToTMError.AGT_SYNC_RECORD_ADD_DATETIME_IS_NOT_NUMBER,
                message[4], index];
        }
        if (typeof message[5] !== 'string') {
            return [lingo_1.MessageToTMError.AGT_SYNC_RECORD_REPOSITORY_TRANSACTION_BLOCK_IS_NOT_STRING,
                message[5], index];
        }
    }
}
exports.MessageToTMVerifier = MessageToTMVerifier;
di_1.DI.set(tokens_1.MESSAGE_TO_TM_VERIFIER, MessageToTMVerifier);
//# sourceMappingURL=MessageToTMVerifier.js.map