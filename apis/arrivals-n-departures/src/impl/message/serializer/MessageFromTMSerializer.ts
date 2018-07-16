import {Service}                      from "typedi";
import {MessageFromTMSerializerToken} from "../../../InjectionTokens";
import {
	DataTransferMessageFromTM,
	MessageFromTM,
	MessageFromTMContentType,
	SerializedDataTransferMessageFromTM,
	SerializedMessageFromTM,
	SerializedRepositoryUpdateRequest
}                                     from "../../../lingo/lingo";

export interface IMessageFromTMSerializer {

	serialize(
		messageFromTM: MessageFromTM
	): SerializedMessageFromTM;

}

@Service(MessageFromTMSerializerToken)
export class MessageFromTMSerializer
	implements IMessageFromTMSerializer {

	serialize(
		messageFromTM: MessageFromTM
	): SerializedMessageFromTM {
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
				const dataTransferMFTM: DataTransferMessageFromTM
					= <DataTransferMessageFromTM> messageFromTM;
				const
					serializedRepositoryUpdateRequests: SerializedRepositoryUpdateRequest[] =
						dataTransferMFTM.repositoryUpdateRequests.map((
							repositoryUpdateRequest
						) => <SerializedRepositoryUpdateRequest>[
							repositoryUpdateRequest.agtRepositoryId,
							repositoryUpdateRequest.tmRepositoryTransactionBlockId,
							repositoryUpdateRequest.repositoryTransactionBlockContents
						]);
				const terminalCredentials = dataTransferMFTM.terminalCredentials;

				// let serializedSyncsToVerify = null;
				// if (dataTransferMFTM.syncsToVerify !== null) {
				// 	throw new Error('Not implemented');
				// }

				return <SerializedDataTransferMessageFromTM>[
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