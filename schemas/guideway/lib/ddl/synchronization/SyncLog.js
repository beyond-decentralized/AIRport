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
const air_control_1 = require("@airport/air-control");
const AgtSharingMessage_1 = require("./AgtSharingMessage");
const AgtRepositoryTransactionBlock_1 = require("./AgtRepositoryTransactionBlock");
/**
 * A record of syncing a particular record to a particular terminal.
 */
let SyncLog = 
// TODO: partition by add RepositoryTransactionBlockAddDatetime
class SyncLog {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "AGT_SHARING_MESSAGE_ID", referencedColumnName: 'ID' }),
    __metadata("design:type", AgtSharingMessage_1.AgtSharingMessage)
], SyncLog.prototype, "sharingMessage", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "AGT_REPO_TRANS_BLOCK_ID", referencedColumnName: 'ID' }),
    __metadata("design:type", AgtRepositoryTransactionBlock_1.AgtRepositoryTransactionBlock)
], SyncLog.prototype, "repositoryTransactionBlock", void 0);
SyncLog = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_SYNC_LOG" })
    // TODO: partition by add RepositoryTransactionBlockAddDatetime
], SyncLog);
exports.SyncLog = SyncLog;
//# sourceMappingURL=SyncLog.js.map