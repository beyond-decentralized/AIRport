import { DI } from '@airport/di';
import { MESSAGE_FROM_TM_VERIFIER } from '../../../tokens';
import { MessageFromTMContentType, MessageFromTMError, } from '../../../lingo/lingo';
import { AbstractCommonMessageVerifier } from './AbstractCommonMessageVerifier';
export class MessageFromTMVerifier extends AbstractCommonMessageVerifier {
    verifyMessage(message, maxAllRepoChangesLength, maxSingleRepoChangeLength) {
        let error = this.verifyMessageHeader(message, 1, MessageFromTMError);
        if (error) {
            return error;
        }
        error = this.verifyMessageProtocol(message[0], MessageFromTMError);
        if (error) {
            return error;
        }
        const messageType = message[1];
        switch (messageType) {
            case MessageFromTMContentType.DATA_TRANSFER:
                return this.verifyDataTransferMessage(message, maxAllRepoChangesLength, maxSingleRepoChangeLength);
            case MessageFromTMContentType.SYNC_VERIFICATIONS:
                return this.verifySyncVerificationMessage(message);
            case MessageFromTMContentType.CONNECTION_REQUEST:
                // Message contains only the header
                return;
            default:
                return [MessageFromTMError.UNSUPPORTED_CONTENT_TYPE, messageType];
        }
    }
    verifyDataTransferMessage(serializedataTransferMessage, maxAllRepoTransBlocksLength, maxSingleRepoTransBlockLength) {
        if (serializedataTransferMessage.length !== 6) {
            return [MessageFromTMError.WRONG_MESSAGE_LENGTH, serializedataTransferMessage.length];
        }
        const serializedTerminalCredentials = serializedataTransferMessage[2];
        if (!(serializedTerminalCredentials instanceof Array)) {
            return [MessageFromTMError.DATABASE_INFO_IS_NOT_ARRAY, typeof serializedTerminalCredentials];
        }
        if (serializedTerminalCredentials.length != 2) {
            return [MessageFromTMError.WRONG_DATABASE_INFO_LENGTH, serializedTerminalCredentials.length];
        }
        const agtTerminalId = serializedTerminalCredentials[0];
        if (typeof agtTerminalId !== 'number') {
            return [MessageFromTMError.TERMINAL_ID_TYPE_IS_NOT_NUMBER, typeof agtTerminalId];
        }
        if (agtTerminalId < 1) {
            return [MessageFromTMError.TERMINAL_ID_TYPE_IS_INVALID_NUMBER, agtTerminalId];
        }
        const terminalPassword = serializedTerminalCredentials[1];
        if (typeof terminalPassword !== 'string') {
            return [MessageFromTMError.TERMINAL_PASSWORD_TYPE_IS_NOT_STRING, typeof terminalPassword];
        }
        // Sha-512
        if (terminalPassword.length !== 128) {
            return [MessageFromTMError.WRONG_AGT_TERMINAL_PASSWORD_LENGTH, terminalPassword.length];
        }
        const tmSharingMessageId = serializedataTransferMessage[3];
        if (typeof tmSharingMessageId !== 'number') {
            return [MessageFromTMError.TM_SHARING_MESSAGE_ID_IS_NOT_NUMBER, typeof tmSharingMessageId];
        }
        if (tmSharingMessageId < 1) {
            return [MessageFromTMError.TM_SHARING_MESSAGE_ID_IS_INVALID_NUMBER, tmSharingMessageId];
        }
        const repositoryUpdateRequests = serializedataTransferMessage[4];
        if (!(repositoryUpdateRequests instanceof Array)) {
            return [MessageFromTMError.REPOSITORY_UPDATE_REQUESTS_IS_NOT_ARRAY,
                typeof repositoryUpdateRequests];
        }
        // TODO: if needed implement max number of RepositoryUpdateRequests
        // if(repositoryUpdateRequests.length > 100)
        let connectionRepoDataLength = 0;
        let error;
        repositoryUpdateRequests.some((repositoryUpdateRequest, index) => {
            if (!(repositoryUpdateRequest instanceof Array)) {
                error = [MessageFromTMError.A_REPOSITORY_UPDATE_REQUEST_IS_NOT_ARRAY,
                    typeof repositoryUpdateRequest, index];
                return true;
            }
            if (repositoryUpdateRequest.length !== 3) {
                error = [MessageFromTMError.WRONG_REPOSITORY_UPDATE_REQUEST_LENGTH,
                    repositoryUpdateRequest.length, index];
                return true;
            }
            const agtRepositoryId = repositoryUpdateRequest[0];
            if (typeof agtRepositoryId !== 'number') {
                error = [MessageFromTMError.AGT_REPOSITORY_ID_IS_NOT_NUMBER,
                    typeof agtRepositoryId, index];
                return true;
            }
            if (agtRepositoryId < 1) {
                error = [MessageFromTMError.AGT_REPOSITORY_ID_IS_INVALID_NUMBER,
                    agtRepositoryId, index];
                return true;
            }
            if (typeof repositoryUpdateRequest[1] !== 'number') {
                error = [MessageFromTMError.TM_REPOSITORY_TRANSACTION_BLOCK_ID_IS_NOT_NUMBER,
                    typeof repositoryUpdateRequest[1], index];
                return true;
            }
            const transactionData = repositoryUpdateRequest[2];
            if (typeof transactionData !== 'string') {
                error = [MessageFromTMError.AGT_REPOSITORY_TRANSACTION_BLOCK_CONTENTS_NOT_STRING,
                    typeof transactionData, index];
                return true;
            }
            if (transactionData.length > maxSingleRepoTransBlockLength) {
                error = [MessageFromTMError.AGT_REPOSITORY_TRANSACTION_BLOCK_CONTENTS_TOO_LONG,
                    transactionData.length, index];
                return true;
            }
            connectionRepoDataLength += transactionData.length;
        });
        if (error) {
            return error;
        }
        if (connectionRepoDataLength > maxAllRepoTransBlocksLength) {
            return [
                MessageFromTMError.SUM_OF_REPOSITORY_TRANSACTION_BLOCK_CONTENTS_IS_TOO_LONG,
                connectionRepoDataLength
            ];
        }
        const agtSharingMessageIds = serializedataTransferMessage[5];
        if (!(agtSharingMessageIds instanceof Array)) {
            return [MessageFromTMError.AGT_SHARING_MESSAGE_IDS_IS_NOT_ARRAY,
                typeof agtSharingMessageIds];
        }
        // TODO: if needed implement max number of TerminalSyncLogIds
        // || terminalSharingMessageIds.length > 100
        agtSharingMessageIds.some(agtSharingMessageId => {
            if (typeof agtSharingMessageId !== 'number') {
                error = [MessageFromTMError.AGT_SHARING_MESSAGE_ID_IS_NOT_NUMBER,
                    typeof agtSharingMessageId];
                return true;
            }
            if (agtSharingMessageId < 1) {
                error = [MessageFromTMError.AGT_SHARING_MESSAGE_ID_IS_INVALID_NUMBER,
                    agtSharingMessageId];
            }
        });
        if (error) {
            return error;
        }
        return [MessageFromTMError.NO_DATA_ERROR, null];
    }
    verifySyncVerificationMessage(syncVerificationMessage) {
        const serializedSyncsToVerify = syncVerificationMessage[3];
        if (!(serializedSyncsToVerify instanceof Array)) {
            return [MessageFromTMError.SERIALIZED_SYNCS_TO_VERIFY_IS_NOT_ARRAY,
                typeof serializedSyncsToVerify];
        }
        if (!(serializedSyncsToVerify.length !== 1)) {
            return [MessageFromTMError.SERIALIZED_SYNCS_TO_VERIFY_LENGTH_IS_NOT_1,
                serializedSyncsToVerify.length];
        }
        const sharingMessagesToVerify = serializedSyncsToVerify[0];
        if (!(sharingMessagesToVerify instanceof Array)) {
            return [MessageFromTMError.SHARING_MESSAGES_TO_VERIFY_IS_NOT_ARRAY,
                typeof sharingMessagesToVerify];
        }
        // if (!(sharingMessagesToVerify.length !== 0)) {
        // 	return [MessageFromTMError.SHARING_MESSAGES_TO_VERIFY_NOT_SUPPORTED,
        // 		sharingMessagesToVerify.length];
        // }
        let error;
        sharingMessagesToVerify.some((tmSharingMessageId, index) => {
            if (typeof tmSharingMessageId !== 'number') {
                error = [MessageFromTMError.SHARING_MESSAGE_ID_TO_VERIFY_IS_NOT_NUMBER,
                    typeof tmSharingMessageId, index];
                return true;
            }
            if (tmSharingMessageId < 1) {
                error = [MessageFromTMError.SHARING_MESSAGE_ID_TO_VERIFY_IS_INVALID_NUMBER,
                    tmSharingMessageId, index];
                return true;
            }
        });
        if (error) {
            return error;
        }
        return [MessageFromTMError.NO_DATA_ERROR, null];
        // const repoTransBlocksToVerify = serializedSyncsToVerify[1];
        // if (!(repoTransBlocksToVerify instanceof Array)) {
        // 	return [MessageFromTMError.SHARING_MESSAGES_TO_VERIFY_IS_NOT_ARRAY,
        // 		typeof repoTransBlocksToVerify];
        // }
        //
        // if (!(repoTransBlocksToVerify.length !== 0)) {
        // 	return [MessageFromTMError.SHARING_MESSAGES_TO_VERIFY_NOT_SUPPORTED,
        // 		repoTransBlocksToVerify.length];
        // }
    }
}
DI.set(MESSAGE_FROM_TM_VERIFIER, MessageFromTMVerifier);
//# sourceMappingURL=MessageFromTMVerifier.js.map