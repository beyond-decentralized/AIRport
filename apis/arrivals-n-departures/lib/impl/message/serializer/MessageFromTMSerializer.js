"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../../tokens");
const lingo_1 = require("../../../lingo/lingo");
class MessageFromTMSerializer {
    serialize(messageFromTM) {
        const protocolVersion = messageFromTM.protocolVersion;
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        const contentType = messageFromTM.contentType;
        switch (contentType) {
            case lingo_1.MessageFromTMContentType.CONNECTION_REQUEST: {
                throw new Error('Not implemented');
            }
            case lingo_1.MessageFromTMContentType.SYNC_VERIFICATIONS: {
                throw new Error('Not implemented');
            }
            case lingo_1.MessageFromTMContentType.DATA_TRANSFER: {
                const dataTransferMFTM = messageFromTM;
                const serializedRepositoryUpdateRequests = dataTransferMFTM.repositoryUpdateRequests.map((repositoryUpdateRequest) => [
                    repositoryUpdateRequest.agtRepositoryId,
                    repositoryUpdateRequest.tmRepositoryTransactionBlockId,
                    repositoryUpdateRequest.repositoryTransactionBlockContents
                ]);
                const terminalCredentials = dataTransferMFTM.terminalCredentials;
                // let serializedSyncsToVerify = null;
                // if (dataTransferMFTM.syncsToVerify !== null) {
                // 	throw new Error('Not implemented');
                // }
                return [
                    protocolVersion,
                    contentType,
                    [
                        terminalCredentials.terminalId,
                        terminalCredentials.terminalPassword
                    ],
                    dataTransferMFTM.tmSharingMessageId,
                    serializedRepositoryUpdateRequests,
                    dataTransferMFTM.terminalSyncAcks,
                ];
            }
            default: {
                throw new Error('Invalid MessageFromTMContentType: ' + contentType);
            }
        }
    }
}
exports.MessageFromTMSerializer = MessageFromTMSerializer;
di_1.DI.set(tokens_1.MESSAGE_FROM_TM_SERIALIZER, MessageFromTMSerializer);
//# sourceMappingURL=MessageFromTMSerializer.js.map