"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var SyncInSharingMessageCreator_1;
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
    saveIncoming(dataMessages) {
        return __awaiter(this, void 0, void 0, function* () {
            const sharingMessages = [];
            for (const dataMessage of dataMessages) {
                sharingMessages.push({});
            }
        });
    }
};
SyncInSharingMessageCreator = SyncInSharingMessageCreator_1 = __decorate([
    typedi_1.Service(SyncInSharingMessageCreator_1)
], SyncInSharingMessageCreator);
exports.SyncInSharingMessageCreator = SyncInSharingMessageCreator;
//# sourceMappingURL=SyncInSharingMessageCreator.js.map