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
const RepositoryTransactionBlock_1 = require("../repositoryTransactionBlock/RepositoryTransactionBlock");
const SharingMessage_1 = require("./SharingMessage");
/**
 * A given Repo Trans block can be send via multiple messages (to multiple AGTs).
 */
let SharingMessageRepoTransBlock = class SharingMessageRepoTransBlock {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "SHARING_MESSAGE_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", SharingMessage_1.SharingMessage)
], SharingMessageRepoTransBlock.prototype, "sharingMessage", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", RepositoryTransactionBlock_1.RepositoryTransactionBlock)
], SharingMessageRepoTransBlock.prototype, "repositoryTransactionBlock", void 0);
SharingMessageRepoTransBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "SHARING_MESSAGE_REPO_TRANS_BLOCKS" })
], SharingMessageRepoTransBlock);
exports.SharingMessageRepoTransBlock = SharingMessageRepoTransBlock;
//# sourceMappingURL=SharingMessageRepoTransBlock.js.map