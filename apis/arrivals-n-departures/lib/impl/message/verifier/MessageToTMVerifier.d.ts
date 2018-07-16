import { MessageToTMError, SerializedBatchedMessagesToTM, SerializedMessageToTM, SerializedRepoTransBlockMessageToTM, SerializedSyncNotificationMessageToTM } from "../../../lingo/lingo";
import { AbstractCommonMessageVerifier } from "./AbstractCommonMessageVerifier";
export interface IMessageToTMVerifier {
    verifyMessagesBatch(batchedMessages: SerializedBatchedMessagesToTM): [MessageToTMError, any] | [MessageToTMError, any, any] | [MessageToTMError, any, any, any];
}
export declare class MessageToTMVerifier extends AbstractCommonMessageVerifier implements IMessageToTMVerifier {
    verifyMessagesBatch(batchedMessages: SerializedBatchedMessagesToTM): [MessageToTMError, any] | [MessageToTMError, any, any] | [MessageToTMError, any, any, any];
    verifyBatchHeader(batchedMessages: SerializedBatchedMessagesToTM): [MessageToTMError, any] | [MessageToTMError, any, any];
    verifyMessage(message: SerializedMessageToTM, index: number): [MessageToTMError, any, any] | [MessageToTMError, any, any, any] | void;
    verifySyncNotificationMessage(message: SerializedSyncNotificationMessageToTM, index: number): [MessageToTMError, any, any] | [MessageToTMError, any, any, any] | void;
    verifyRepoTransBlockMessage(message: SerializedRepoTransBlockMessageToTM, index: number): [MessageToTMError, any, any] | void;
}
