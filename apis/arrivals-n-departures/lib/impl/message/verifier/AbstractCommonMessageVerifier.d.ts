import { MessageFromTMError, MessageToTMError, SerializedMessageFromTM, SerializedMessageToTM, TmToAgtProtocolVersion } from "../../../lingo/lingo";
export declare abstract class AbstractCommonMessageVerifier {
    protected verifyMessageHeader(message: SerializedMessageFromTM | SerializedMessageToTM, messageTypeIndex: 0 | 1, MessageError: typeof MessageFromTMError | typeof MessageToTMError, index?: number): [MessageFromTMError | MessageToTMError, any] | [MessageFromTMError | MessageToTMError, any, any] | void;
    protected verifyMessageProtocol(protocolVersion: TmToAgtProtocolVersion, MessageError: typeof MessageFromTMError | typeof MessageToTMError): [MessageFromTMError | MessageToTMError, any] | void;
}
