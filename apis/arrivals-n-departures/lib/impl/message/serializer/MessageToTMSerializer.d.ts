import { BatchedMessagesToTM, MessageToTM, SerializedBatchedMessagesToTM, SerializedMessageToTM } from '../../../lingo/lingo';
export interface IMessageToTMSerializer {
    serialize(messagesToTM: BatchedMessagesToTM): SerializedBatchedMessagesToTM;
    serializeAMessage(messageToTM: MessageToTM): SerializedMessageToTM;
}
export declare class MessageToTMSerializer implements IMessageToTMSerializer {
    serialize(batchedMessagesToTM: BatchedMessagesToTM): SerializedBatchedMessagesToTM;
    serializeAMessage(messageToTM: MessageToTM): SerializedMessageToTM;
    private serializeSyncOutcomes;
}
