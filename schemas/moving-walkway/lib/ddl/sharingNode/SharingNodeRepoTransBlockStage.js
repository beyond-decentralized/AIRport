"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
const EntityDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators");
let SharingNodeRepoTransBlockStage = class SharingNodeRepoTransBlockStage {
};
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.Column({ name: "SHARING_NODE_ID" })
], SharingNodeRepoTransBlockStage.prototype, "sharingNodeId", void 0);
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.Column({ name: "REPOSITORY_TRANSACTION_BLOCK_ID" }),
    ColumnDecorators_1.DbNumber()
], SharingNodeRepoTransBlockStage.prototype, "repositoryTransactionBlockId", void 0);
__decorate([
    ColumnDecorators_1.Column({ name: "SYNC_STATUS" }),
    ColumnDecorators_1.DbNumber()
], SharingNodeRepoTransBlockStage.prototype, "syncStatus", void 0);
SharingNodeRepoTransBlockStage = __decorate([
    EntityDecorators_1.Entity(),
    EntityDecorators_1.Table({ name: "SHARING_NODE_REPO_TRANS_BLOCK_STAGE" })
], SharingNodeRepoTransBlockStage);
exports.SharingNodeRepoTransBlockStage = SharingNodeRepoTransBlockStage;
//# sourceMappingURL=SharingNodeRepoTransBlockStage.js.map