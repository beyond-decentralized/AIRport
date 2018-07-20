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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const ground_control_1 = require("@airport/ground-control");
const DirectResonse_1 = require("./DirectResonse");
const InjectionTokens_1 = require("../../../../../apps/terminal/src/InjectionTokens");
/**
 * P2P endpoint to a built-in AGT
 */
let DirectSharingNodeEndpoint = class DirectSharingNodeEndpoint {
    constructor() {
        this.recentConnectionServer = typedi_1.Container.get(ground_control_1.SyncConnectionServerToken);
    }
    async communicateWithAGT(sharingNode, message) {
        return new Promise((resolve, reject) => {
            this.recentConnectionServer.handleInMemoryConnect(message, new DirectResonse_1.DirectResponse((statusCode, data) => {
                if (statusCode !== 200) {
                    reject([statusCode, `Error from AGT: ` + statusCode.toString()]);
                }
                resolve(data);
            }));
        });
    }
};
DirectSharingNodeEndpoint = __decorate([
    typedi_1.Service(InjectionTokens_1.DirectSharingNodeEndpointToken),
    __metadata("design:paramtypes", [])
], DirectSharingNodeEndpoint);
exports.DirectSharingNodeEndpoint = DirectSharingNodeEndpoint;
//# sourceMappingURL=DirectSharingNodeEndpoint.js.map