"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moving_walkway_1 = require("@airport/moving-walkway");
const typedi_1 = require("typedi");
let SyncInSharingMessageCreator = SyncInSharingMessageCreator_1 = class SyncInSharingMessageCreator {
    createRecord(sharingNode, syncTimestamp) {
        return {
            sharingNode,
            origin: moving_walkway_1.DataOrigin.REMOTE,
            syncTimestamp
        };
    }
    async saveIncoming(dataMessages) {
        const sharingMessages = [];
        for (const dataMessage of dataMessages) {
            sharingMessages.push({});
        }
    }
};
SyncInSharingMessageCreator = SyncInSharingMessageCreator_1 = __decorate([
    typedi_1.Service(SyncInSharingMessageCreator_1)
], SyncInSharingMessageCreator);
exports.SyncInSharingMessageCreator = SyncInSharingMessageCreator;
var SyncInSharingMessageCreator_1;
//# sourceMappingURL=SyncInSharingMessageCreator.js.map