import { DI } from '@airport/di';
import { MESSAGE_FROM_TM_SERIALIZER } from '../../../tokens';
import { MessageFromTMContentType } from '../../../lingo/lingo';
export class MessageFromTMSerializer {
    serialize(messageFromTM) {
        const protocolVersion = messageFromTM.protocolVersion;
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        const contentType = messageFromTM.contentType;
        switch (contentType) {
            case MessageFromTMContentType.CONNECTION_REQUEST: {
                throw new Error('Not implemented');
            }
            case MessageFromTMContentType.SYNC_VERIFICATIONS: {
                throw new Error('Not implemented');
            }
            case MessageFromTMContentType.DATA_TRANSFER: {
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
                    // serializedSyncsToVerify
                ];
            }
            default: {
                throw new Error('Invalid MessageFromTMContentType: ' + contentType);
            }
        }
    }
}
DI.set(MESSAGE_FROM_TM_SERIALIZER, MessageFromTMSerializer);
//# sourceMappingURL=MessageFromTMSerializer.js.map