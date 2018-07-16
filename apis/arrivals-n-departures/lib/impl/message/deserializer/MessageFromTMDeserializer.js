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
let MessageFromTMDeserializer = class MessageFromTMDeserializer {
    deserialize(serializedMessageFromTM) {
        const protocolVersion = serializedMessageFromTM[0];
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        const contentType = serializedMessageFromTM[1];
        switch (contentType) {
            case lingo_1.MessageFromTMContentType.CONNECTION_REQUEST: {
                throw new Error('Not Implemented');
            }
            case lingo_1.MessageFromTMContentType.SYNC_VERIFICATIONS: {
                throw new Error('Not Implemented');
            }
            case lingo_1.MessageFromTMContentType.DATA_TRANSFER: {
                const serializedDataTransferMFTM = serializedMessageFromTM;
                const serializedTerminalCredentials = serializedDataTransferMFTM[2];
                const repositoryUpdateRequests = serializedDataTransferMFTM[4].map((serializedRepositoryUpdateRequest) => ({
                    agtRepositoryId: serializedRepositoryUpdateRequest[0],
                    tmRepositoryTransactionBlockId: serializedRepositoryUpdateRequest[1],
                    repositoryTransactionBlockContents: serializedRepositoryUpdateRequest[2],
                }));
                // const serializedSyncsToVerify = serializedDataTransferMFTM[6];
                // let syncsToVerify: SyncsToVerify = null;
                // if (serializedSyncsToVerify !== null) {
                // 	throw new Error('Not Implemented');
                // 	// syncsToVerify = {
                // 	// 	sharingMessageIds: serializedSyncsToVerify[0],
                // 	// 	repoTransBlockIds: serializedSyncsToVerify[1],
                // 	// }
                // }
                return {
                    protocolVersion,
                    contentType,
                    terminalCredentials: {
                        terminalId: serializedTerminalCredentials[0],
                        terminalPassword: serializedTerminalCredentials[1]
                    },
                    tmSharingMessageId: serializedDataTransferMFTM[3],
                    repositoryUpdateRequests,
                    terminalSyncAcks: serializedDataTransferMFTM[5]
                    // syncsToVerify
                };
            }
            default: {
                throw new Error('Invalid MessageFromTMContentType: ' + contentType);
            }
        }
    }
};
MessageFromTMDeserializer = __decorate([
    typedi_1.Service(InjectionTokens_1.MessageFromTMDeserializerToken)
], MessageFromTMDeserializer);
exports.MessageFromTMDeserializer = MessageFromTMDeserializer;
//# sourceMappingURL=MessageFromTMDeserializer.js.map