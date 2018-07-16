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
const lingo_1 = require("../../../lingo/lingo");
let MessageToTMSerializer = class MessageToTMSerializer {
    serialize(batchedMessagesToTM) {
        const protocolVersion = batchedMessagesToTM.protocolVersion;
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        return [0,
            batchedMessagesToTM.targetAgtTerminalIds,
            batchedMessagesToTM.agtSharingMessageId,
            batchedMessagesToTM.messages.map(this.serializeAMessage)
        ];
    }
    serializeAMessage(messageToTM) {
        switch (messageToTM.contentType) {
            case lingo_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
                return [
                    messageToTM.contentType,
                    // messageToTM.agtRepositoryTransactionBlockId,
                    // messageToTM.sourceTerminalId,
                    // messageToTM.agtRepositoryId,
                    // messageToTM.addDatetime,
                    // messageToTM.tmRepositoryTransactionBlockId,
                    messageToTM.repositoryTransactionBlock
                ];
            }
            case lingo_1.MessageToTMContentType.SYNC_NOTIFICATION: {
                const serializedSyncOutcomes = this.serializeSyncOutcomes(messageToTM.syncOutcomes);
                return [
                    messageToTM.contentType,
                    messageToTM.tmSharingMessageId,
                    // messageToTM.terminalSyncLogId,
                    // messageToTM.agtRepositoryTransactionBlockAddDatetime,
                    serializedSyncOutcomes
                ];
            }
            // case MessageToTMContentType.SYNC_ACK: {
            // 	const serializedSyncOutcomes = this.serializeSyncOutcomes(
            // 		messageToTM.syncOutcomes);
            // 	return <SerializedSyncAcknowledgementMessageToTM>[
            // 		messageToTM.contentType,
            // 		serializedSyncOutcomes
            // 	];
            // }
            case lingo_1.MessageToTMContentType.ALIVE_ACK: {
                return [
                    messageToTM.contentType
                ];
            }
            default: {
                throw new Error('Unknown MessageToTMContentType: ' +
                    messageToTM.contentType);
            }
        }
    }
    serializeSyncOutcomes(syncOutcomes) {
        return syncOutcomes.map((syncOutcome) => [
            syncOutcome.tmRepositoryTransactionBlockId,
            // syncOutcome.agtRepositoryTransactionBlockId,
            syncOutcome.syncOutcomeType
        ]);
    }
};
MessageToTMSerializer = __decorate([
    typedi_1.Service(InjectionTokens_1.MessageToTMSerializerToken)
], MessageToTMSerializer);
exports.MessageToTMSerializer = MessageToTMSerializer;
//# sourceMappingURL=MessageToTMSerializer.js.map