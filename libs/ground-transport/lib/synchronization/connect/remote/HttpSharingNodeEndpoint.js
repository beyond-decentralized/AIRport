"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const typedi_1 = require("typedi");
const Inject_1 = require("typedi/decorators/Inject");
const InjectionTokens_1 = require("../../../InjectionTokens");
const log = InjectionTokens_1.TerminalLogger.add('HttpSharingNodeEndpoint');
/**
 * P2P endpoint to a built-in AGT
 */
let HttpSharingNodeEndpoint = class HttpSharingNodeEndpoint {
    constructor(messageFromTMSerializer, messageToTMDeserializer, messageToTMVerifier) {
        this.messageFromTMSerializer = messageFromTMSerializer;
        this.messageToTMDeserializer = messageToTMDeserializer;
        this.messageToTMVerifier = messageToTMVerifier;
        this.xhr = new XMLHttpRequest();
    }
    communicateWithAGT(sharingNode, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedMessageFromTM = this.messageFromTMSerializer.serialize(message);
            return new Promise((resolve, reject) => {
                this.xhr.open('PUT', this.agtUrl, true);
                const _self = this;
                this.xhr.onload = function () {
                    const stringBatchedMessagesToTM = this.responseText;
                    try {
                        const serializedBatchedMessagesToTM = JSON.parse(stringBatchedMessagesToTM);
                        const schemaValidationResult = _self.messageToTMVerifier.verifyMessagesBatch(serializedBatchedMessagesToTM);
                        const connectionDataError = schemaValidationResult[0];
                        if (connectionDataError) {
                            log.error(`
	Message to TM validation error:
		Invalid sync message data schema:
				Error Code:    {1}
				Evaluation:    {2}
				Message index: {3}
				Data index:    {4}
				`, connectionDataError, schemaValidationResult[1], schemaValidationResult[2]);
                            reject(new Error('Message to TM validation error:\n\t\tInvalid sync message data schema'));
                        }
                        const batchedMessagesToTM = _self.messageToTMDeserializer.deserialize(serializedBatchedMessagesToTM);
                        resolve(batchedMessagesToTM);
                    }
                    catch (e) {
                        reject(e);
                    }
                };
                this.xhr.send(serializedMessageFromTM);
            });
        });
    }
};
HttpSharingNodeEndpoint = __decorate([
    typedi_1.Service(InjectionTokens_1.HttpSharingNodeEndpointToken),
    __param(0, Inject_1.Inject(arrivals_n_departures_1.MessageFromTMSerializerToken)),
    __param(1, Inject_1.Inject(arrivals_n_departures_1.MessageToTMDeserializerToken)),
    __param(2, Inject_1.Inject(arrivals_n_departures_1.MessageToTMVerifierToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof arrivals_n_departures_1.IMessageFromTMSerializer !== "undefined" && arrivals_n_departures_1.IMessageFromTMSerializer) === "function" ? _a : Object, typeof (_b = typeof arrivals_n_departures_1.IMessageToTMDeserializer !== "undefined" && arrivals_n_departures_1.IMessageToTMDeserializer) === "function" ? _b : Object, typeof (_c = typeof arrivals_n_departures_1.IMessageToTMVerifier !== "undefined" && arrivals_n_departures_1.IMessageToTMVerifier) === "function" ? _c : Object])
], HttpSharingNodeEndpoint);
exports.HttpSharingNodeEndpoint = HttpSharingNodeEndpoint;
//# sourceMappingURL=HttpSharingNodeEndpoint.js.map