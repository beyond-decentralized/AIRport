var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Id } from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import { Entity, Table } from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
let SharingNodeRepoTransBlockStage = class SharingNodeRepoTransBlockStage {
};
__decorate([
    Id(),
    Column({ name: "SHARING_NODE_ID" })
], SharingNodeRepoTransBlockStage.prototype, "sharingNodeId", void 0);
__decorate([
    Id(),
    Column({ name: "REPOSITORY_TRANSACTION_BLOCK_ID" }),
    DbNumber()
], SharingNodeRepoTransBlockStage.prototype, "repositoryTransactionBlockId", void 0);
__decorate([
    Column({ name: "SYNC_STATUS" }),
    DbString()
], SharingNodeRepoTransBlockStage.prototype, "syncStatus", void 0);
SharingNodeRepoTransBlockStage = __decorate([
    Entity(),
    Table({ name: "SHARING_NODE_REPO_TRANS_BLOCK_STAGE" })
], SharingNodeRepoTransBlockStage);
export { SharingNodeRepoTransBlockStage };
//# sourceMappingURL=SharingNodeRepoTransBlockStage.js.map