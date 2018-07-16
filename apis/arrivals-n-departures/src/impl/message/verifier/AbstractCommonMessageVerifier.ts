import {
	MessageFromTMContentType,
	MessageFromTMError,
	MessageToTMContentType,
	MessageToTMError,
	SerializedMessageFromTM,
	SerializedMessageToTM,
	TmToAgtProtocolVersion
} from "../../../lingo/lingo";

export abstract class AbstractCommonMessageVerifier {

	protected verifyMessageHeader(
		message: SerializedMessageFromTM | SerializedMessageToTM,
		messageTypeIndex: 0 | 1,
		MessageError: typeof MessageFromTMError | typeof MessageToTMError,
		index?: number
	): [MessageFromTMError | MessageToTMError, any] |
		[MessageFromTMError | MessageToTMError, any, any] | void {
		if (!(message instanceof Array)) {
			return index ? [MessageError.MESSAGE_IS_NOT_ARRAY, typeof message]
				: [MessageError.MESSAGE_IS_NOT_ARRAY, typeof message, index];
		}

		const messageType: MessageFromTMContentType | MessageToTMContentType
			= <number>message[messageTypeIndex];
		if (typeof messageType !== 'number') {
			return index ? [MessageError.MESSAGE_TYPE_IS_NOT_NUMBER, typeof messageType]
				: [MessageError.MESSAGE_TYPE_IS_NOT_NUMBER, typeof message, index];
		}
	}

	protected verifyMessageProtocol(
		protocolVersion: TmToAgtProtocolVersion,
		MessageError: typeof MessageFromTMError | typeof MessageToTMError
	): [MessageFromTMError | MessageToTMError, any] | void {
		if (protocolVersion !== 0) {
			return [MessageError.PROTOCOL_VERSION_NOT_SUPPORTED, protocolVersion];
		}
	}

}