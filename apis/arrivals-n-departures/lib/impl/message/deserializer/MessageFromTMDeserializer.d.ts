import { MessageFromTM, SerializedMessageFromTM } from '../../../lingo/lingo';
export interface IMessageFromTMDeserializer {
    deserialize(serializedMessageFromTM: SerializedMessageFromTM): MessageFromTM;
}
export declare class MessageFromTMDeserializer implements IMessageFromTMDeserializer {
    deserialize(serializedMessageFromTM: SerializedMessageFromTM): MessageFromTM;
}
