var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let SharingNodeRepository = class SharingNodeRepository {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    })
], SharingNodeRepository.prototype, "sharingNode", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "REPOSITORY_ID", referencedColumnName: "ID"
    })
], SharingNodeRepository.prototype, "repository", void 0);
__decorate([
    Column({ name: "AGT_REPOSITORY_ID" }),
    DbNumber()
], SharingNodeRepository.prototype, "agtRepositoryId", void 0);
__decorate([
    Column({ name: "ADVISED_SYNC_PRIORITY" }),
    DbNumber()
], SharingNodeRepository.prototype, "advisedSyncPriority", void 0);
__decorate([
    DbNumber(),
    Column({ name: "REPOSITORY_SYNC_STATUS" })
], SharingNodeRepository.prototype, "repositorySyncStatus", void 0);
SharingNodeRepository = __decorate([
    Entity(),
    Table({
        name: "SHARING_NODE_REPOSITORIES",
        primaryKey: ['SHARING_NODE_ID', 'REPOSITORY_ID']
    })
], SharingNodeRepository);
export { SharingNodeRepository };
//# sourceMappingURL=SharingNodeRepository.js.map