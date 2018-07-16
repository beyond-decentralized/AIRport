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
let MessageFromTMSerializer = class MessageFromTMSerializer {
    serialize(messageFromTM) {
        const protocolVersion = messageFromTM.protocolVersion;
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        const contentType = messageFromTM.contentType;
        switch (contentType) {
            case lingo_1.MessageFromTMContentType.CONNECTION_REQUEST: {
                throw new Error('Not implemented');
            }
            case lingo_1.MessageFromTMContentType.SYNC_VERIFICATIONS: {
                throw new Error('Not implemented');
            }
            case lingo_1.MessageFromTMContentType.DATA_TRANSFER: {
                const dataTransferMFTM = messageFromTM;
                const serializedRepositoryUpdateRequests = dataTransferMFTM.repositoryUpdateRequests.map((repositoryUpdateRequest) => [
                    repositoryUpdateRequest.agtRepositoryId,
                    repositoryUpdateRequest.tmRepositoryTransactionBlockId,
                    repositoryUpdateRequest.repositoryTransactionBlockContents
                ]);
                const terminalCredentials = dataTransferMFTM.terminalCredentials;
                // let serializedSyncsToVerify = null;
                // if (dataTransferMFTM.syncsToVerify !== null) {
                // 	throw new Error('Not implemented');
                // }
                return [
                    protocolVersion,
                    contentType,
                    [
                        terminalCredentials.terminalId,
                        terminalCredentials.terminalPassword
                    ],
                    dataTransferMFTM.tmSharingMessageId,
                    serializedRepositoryUpdateRequests,
                    dataTransferMFTM.terminalSyncAcks,
                ];
            }
            default: {
                throw new Error('Invalid MessageFromTMContentType: ' + contentType);
            }
        }
    }
};
MessageFromTMSerializer = __decorate([
    typedi_1.Service(InjectionTokens_1.MessageFromTMSerializerToken)
], MessageFromTMSerializer);
exports.MessageFromTMSerializer = MessageFromTMSerializer;
//# sourceMappingURL=MessageFromTMSerializer.js.map