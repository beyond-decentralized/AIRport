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
var _a;
const air_control_1 = require("@airport/air-control");
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const terminal_map_1 = require("@airport/terminal-map");
const RepositoryTransactionBlock_1 = require("../repositoryTransactionBlock/RepositoryTransactionBlock");
const DataOrigin_1 = require("../values/DataOrigin");
const SharingNode_1 = require("./SharingNode");
/**
 * Every RepositoryTransactionBlock has an Id at every AGT that syncs
 * it.  This record stores that Id.
 */
let SharingNodeRepoTransBlock = class SharingNodeRepoTransBlock {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", SharingNode_1.SharingNode)
], SharingNodeRepoTransBlock.prototype, "sharingNode", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", RepositoryTransactionBlock_1.RepositoryTransactionBlock)
], SharingNodeRepoTransBlock.prototype, "repositoryTransactionBlock", void 0);
__decorate([
    air_control_1.Column({ name: "SYNC_TIMESTAMP" }),
    air_control_1.DbDate(),
    __metadata("design:type", Object)
], SharingNodeRepoTransBlock.prototype, "syncTimestamp", void 0);
__decorate([
    air_control_1.Column({ name: "SYNC_OUTCOME_TYPE" }),
    ColumnDecorators_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNodeRepoTransBlock.prototype, "syncOutcomeType", void 0);
__decorate([
    ColumnDecorators_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNodeRepoTransBlock.prototype, "origin", void 0);
__decorate([
    ColumnDecorators_1.DbNumber(),
    air_control_1.Column({ name: "BLOCK_SYNC_STATUS" }),
    __metadata("design:type", typeof (_a = typeof terminal_map_1.BlockSyncStatus !== "undefined" && terminal_map_1.BlockSyncStatus) === "function" && _a || Object)
], SharingNodeRepoTransBlock.prototype, "blockSyncStatus", void 0);
SharingNodeRepoTransBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "SHARING_NODE_REPO_TRANS_BLOCKS" })
], SharingNodeRepoTransBlock);
exports.SharingNodeRepoTransBlock = SharingNodeRepoTransBlock;
//# sourceMappingURL=SharingNodeRepoTransBlock.js.map