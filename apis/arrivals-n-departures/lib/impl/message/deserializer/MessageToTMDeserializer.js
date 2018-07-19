"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../InjectionTokens");
const MessageTypes_1 = require("../../../lingo/message/MessageTypes");
let MessageToTMDeserializer = class MessageToTMDeserializer {
    deserialize(serializedBatchedMessagesToTM) {
        const protocolVersion = serializedBatchedMessagesToTM[0];
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        const serializedMessagesToTM = serializedBatchedMessagesToTM[3];
        const agtSharingMessageId = serializedBatchedMessagesToTM[2];
        return {
            protocolVersion,
            targetAgtTerminalIds: serializedBatchedMessagesToTM[1],
            agtSharingMessageId,
            messages: serializedMessagesToTM.map(this.deserializeAMessage)
        };
    }
    deserializeAMessage(serializedMessageToTM) {
        const contentType = serializedMessageToTM[0];
        switch (contentType) {
            case MessageTypes_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
                return {
                    contentType,
                    // agtRepositoryTransactionBlockId: serializedMessageToTM[1],
                    // sourceTerminalId: serializedMessageToTM[2],
                    // agtRepositoryId: serializedMessageToTM[3],
                    // addDatetime: serializedMessageToTM[4],
                    repositoryTransactionBlock: serializedMessageToTM[1]
                };
            }
            case MessageTypes_1.MessageToTMContentType.SYNC_NOTIFICATION: {
                const syncOutcomes = this.deserializeSyncOutcomes(serializedMessageToTM[2]);
                return {
                    contentType,
                    tmSharingMessageId: serializedMessageToTM[1],
                    // terminalSyncLogId: serializedMessageToTM[2],
                    // agtRepositoryTransactionBlockAddDatetime: serializedMessageToTM[2],
                    syncOutcomes
                };
            }
            // case MessageToTMContentType.SYNC_ACK: {
            // 	const syncOutcomes: RepoTransBlockSyncOutcome[] = this.deserializeSyncOutcomes(
            // 		(<SerializedSyncNotificationMessageToTM>serializedMessageToTM)[4]);
            // 	return <SyncAcknowledgementMessageToTM>{
            // 		contentType,
            // 		tmSharingMessageIds: serializedMessageToTM[1]
            // 	}
            // }
            default: {
                throw new Error('Invalid MessageToTMContentType: ' + contentType);
            }
        }
    }
    deserializeSyncOutcomes(serializedRepoTransBlockSyncOutcome) {
        return serializedRepoTransBlockSyncOutcome.map((serializedSyncOutcome) => ({
            tmRepositoryTransactionBlockId: serializedSyncOutcome[0],
            agtRepositoryTransactionBlockId: serializedSyncOutcome[1],
            syncOutcomeType: serializedSyncOutcome[2],
        }));
    }
};
MessageToTMDeserializer = __decorate([
    typedi_1.Service(InjectionTokens_1.MessageToTMDeserializerToken)
], MessageToTMDeserializer);
exports.MessageToTMDeserializer = MessageToTMDeserializer;
//# sourceMappingURL=MessageToTMDeserializer.js.map