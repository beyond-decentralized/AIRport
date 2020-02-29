var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
/**
 * A given Repo Trans block can be send via multiple messages (to multiple AGTs).
 */
let SharingMessageRepoTransBlock = class SharingMessageRepoTransBlock {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "SHARING_MESSAGE_ID", referencedColumnName: "ID"
    })
], SharingMessageRepoTransBlock.prototype, "sharingMessage", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID"
    })
], SharingMessageRepoTransBlock.prototype, "repositoryTransactionBlock", void 0);
SharingMessageRepoTransBlock = __decorate([
    Entity(),
    Table({ name: "SHARING_MESSAGE_REPO_TRANS_BLOCKS" })
], SharingMessageRepoTransBlock);
export { SharingMessageRepoTransBlock };
//# sourceMappingURL=SharingMessageRepoTransBlock.js.map