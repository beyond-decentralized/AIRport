"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../../tokens");
const lingo_1 = require("../../../lingo/lingo");
class MessageFromTMDeserializer {
    deserialize(serializedMessageFromTM) {
        const protocolVersion = serializedMessageFromTM[0];
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        const contentType = serializedMessageFromTM[1];
        switch (contentType) {
            case lingo_1.MessageFromTMContentType.CONNECTION_REQUEST: {
                throw new Error('Not Implemented');
            }
            case lingo_1.MessageFromTMContentType.SYNC_VERIFICATIONS: {
                throw new Error('Not Implemented');
            }
            case lingo_1.MessageFromTMContentType.DATA_TRANSFER: {
                const serializedDataTransferMFTM = serializedMessageFromTM;
                const serializedTerminalCredentials = serializedDataTransferMFTM[2];
                const repositoryUpdateRequests = serializedDataTransferMFTM[4].map((serializedRepositoryUpdateRequest) => ({
                    agtRepositoryId: serializedRepositoryUpdateRequest[0],
                    tmRepositoryTransactionBlockId: serializedRepositoryUpdateRequest[1],
                    repositoryTransactionBlockContents: serializedRepositoryUpdateRequest[2],
                }));
                // const serializedSyncsToVerify = serializedDataTransferMFTM[6];
                // let syncsToVerify: SyncsToVerify = null;
                // if (serializedSyncsToVerify !== null) {
                // 	throw new Error('Not Implemented');
                // 	// syncsToVerify = {
                // 	// 	sharingMessageIds: serializedSyncsToVerify[0],
                // 	// 	repoTransBlockIds: serializedSyncsToVerify[1],
                // 	// }
                // }
                return {
                    protocolVersion,
                    contentType,
                    terminalCredentials: {
                        terminalId: serializedTerminalCredentials[0],
                        terminalPassword: serializedTerminalCredentials[1]
                    },
                    tmSharingMessageId: serializedDataTransferMFTM[3],
                    repositoryUpdateRequests,
                    terminalSyncAcks: serializedDataTransferMFTM[5]
                    // syncsToVerify
                };
            }
            default: {
                throw new Error('Invalid MessageFromTMContentType: ' + contentType);
            }
        }
    }
}
exports.MessageFromTMDeserializer = MessageFromTMDeserializer;
di_1.DI.set(tokens_1.MESSAGE_FROM_TM_DESERIALIZER, MessageFromTMDeserializer);
//# sourceMappingURL=MessageFromTMDeserializer.js.map