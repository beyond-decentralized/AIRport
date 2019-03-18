import {DI}                           from '@airport/di'
import {MESSAGE_FROM_TM_DESERIALIZER} from '../../../diTokens'
import {
	DataTransferMessageFromTM,
	MessageFromTM,
	MessageFromTMContentType,
	SerializedDataTransferMessageFromTM,
	SerializedMessageFromTM,
	SerializedRepositoryUpdateRequest
}                                     from '../../../lingo/lingo'

export interface IMessageFromTMDeserializer {

	deserialize(
		serializedMessageFromTM: SerializedMessageFromTM
	): MessageFromTM;

}

export class MessageFromTMDeserializer
	implements IMessageFromTMDeserializer {

	deserialize(
		serializedMessageFromTM: SerializedMessageFromTM
	): MessageFromTM {
		const protocolVersion = serializedMessageFromTM[0]
		if (protocolVersion !== 0) {
			throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`)
		}
		const contentType = serializedMessageFromTM[1]
		switch (contentType) {
			case MessageFromTMContentType.CONNECTION_REQUEST: {
				throw new Error('Not Implemented')
			}
			case MessageFromTMContentType.SYNC_VERIFICATIONS: {
				throw new Error('Not Implemented')
			}
			case MessageFromTMContentType.DATA_TRANSFER: {
				const serializedDataTransferMFTM: SerializedDataTransferMessageFromTM
					                                  = <SerializedDataTransferMessageFromTM>serializedMessageFromTM
				const serializedTerminalCredentials = serializedDataTransferMFTM[2]
				const repositoryUpdateRequests      = serializedDataTransferMFTM[4].map((
					serializedRepositoryUpdateRequest: SerializedRepositoryUpdateRequest
				) => ({
					agtRepositoryId: serializedRepositoryUpdateRequest[0],
					tmRepositoryTransactionBlockId: serializedRepositoryUpdateRequest[1],
					repositoryTransactionBlockContents: serializedRepositoryUpdateRequest[2],
				}))
				// const serializedSyncsToVerify = serializedDataTransferMFTM[6];
				// let syncsToVerify: SyncsToVerify = null;
				// if (serializedSyncsToVerify !== null) {
				// 	throw new Error('Not Implemented');
				// 	// syncsToVerify = {
				// 	// 	sharingMessageIds: serializedSyncsToVerify[0],
				// 	// 	repoTransBlockIds: serializedSyncsToVerify[1],
				// 	// }
				// }
				return <DataTransferMessageFromTM>{
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
				}
			}
			default: {
				throw new Error('Invalid MessageFromTMContentType: ' + contentType)
			}
		}
	}

}

DI.set(MESSAGE_FROM_TM_DESERIALIZER, MessageFromTMDeserializer)