import { MessageFromTMError, SerializedDataTransferMessageFromTM, SerializedMessageFromTM, SerializedSyncVerificationMessageFromTM } from '../../../lingo/lingo';
import { AbstractCommonMessageVerifier } from './AbstractCommonMessageVerifier';
export interface IMessageFromTMVerifier {
    verifyMessage(message: SerializedMessageFromTM, maxAllRepoChangesLength: number, maxSingleRepoChangeLength: number): [MessageFromTMError, any] | [MessageFromTMError, any, any];
}
export declare class MessageFromTMVerifier extends AbstractCommonMessageVerifier implements IMessageFromTMVerifier {
    verifyMessage(message: SerializedMessageFromTM, maxAllRepoChangesLength: number, maxSingleRepoChangeLength: number): [MessageFromTMError, any] | [MessageFromTMError, any, any];
    verifyDataTransferMessage(serializedataTransferMessage: SerializedDataTransferMessageFromTM, maxAllRepoTransBlocksLength: number, maxSingleRepoTransBlockLength: number): [MessageFromTMError, any] | [MessageFromTMError, any, any];
    verifySyncVerificationMessage(syncVerificationMessage: SerializedSyncVerificationMessageFromTM): [MessageFromTMError, any] | [MessageFromTMError, any, any];
}
