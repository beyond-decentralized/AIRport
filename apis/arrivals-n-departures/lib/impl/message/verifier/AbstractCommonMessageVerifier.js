export class AbstractCommonMessageVerifier {
    verifyMessageHeader(message, messageTypeIndex, MessageError, index) {
        if (!(message instanceof Array)) {
            return index ? [MessageError.MESSAGE_IS_NOT_ARRAY, typeof message]
                : [MessageError.MESSAGE_IS_NOT_ARRAY, typeof message, index];
        }
        const messageType = message[messageTypeIndex];
        if (typeof messageType !== 'number') {
            return index ? [MessageError.MESSAGE_TYPE_IS_NOT_NUMBER, typeof messageType]
                : [MessageError.MESSAGE_TYPE_IS_NOT_NUMBER, typeof message, index];
        }
    }
    verifyMessageProtocol(protocolVersion, MessageError) {
        if (protocolVersion !== 0) {
            return [MessageError.PROTOCOL_VERSION_NOT_SUPPORTED, protocolVersion];
        }
    }
}
//# sourceMappingURL=AbstractCommonMessageVerifier.js.map