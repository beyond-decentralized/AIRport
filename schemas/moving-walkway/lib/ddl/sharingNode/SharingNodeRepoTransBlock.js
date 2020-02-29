var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
import { DbNumber } from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
/**
 * Every RepositoryTransactionBlock has an Id at every AGT that syncs
 * it.  This record stores that Id.
 */
let SharingNodeRepoTransBlock = class SharingNodeRepoTransBlock {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    })
], SharingNodeRepoTransBlock.prototype, "sharingNode", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID"
    })
], SharingNodeRepoTransBlock.prototype, "repositoryTransactionBlock", void 0);
__decorate([
    DbNumber(),
    Column({ name: "SYNC_STATUS" })
], SharingNodeRepoTransBlock.prototype, "syncStatus", void 0);
SharingNodeRepoTransBlock = __decorate([
    Entity(),
    Table({ name: "SHARING_NODE_REPO_TRANS_BLOCKS" })
], SharingNodeRepoTransBlock);
export { SharingNodeRepoTransBlock };
//# sourceMappingURL=SharingNodeRepoTransBlock.js.map