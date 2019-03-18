import { BatchedMessagesToTM, MessageToTM } from '../../../lingo/message/MessageToTM';
import { SerializedBatchedMessagesToTM, SerializedMessageToTM } from '../../../lingo/message/SerializedMessageToTM';
export interface IMessageToTMDeserializer {
    deserialize(serializedMessageToTM: SerializedBatchedMessagesToTM): BatchedMessagesToTM;
}
export declare class MessageToTMDeserializer implements IMessageToTMDeserializer {
    deserialize(serializedBatchedMessagesToTM: SerializedBatchedMessagesToTM): BatchedMessagesToTM;
    deserializeAMessage(serializedMessageToTM: SerializedMessageToTM): MessageToTM;
    private deserializeSyncOutcomes;
}
