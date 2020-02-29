var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, Table } from "@airport/air-control";
import { OneToMany } from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
let SharingNode = class SharingNode {
};
__decorate([
    Id(),
    DbNumber()
], SharingNode.prototype, "id", void 0);
__decorate([
    Column({ name: "SHARING_MECHANISM" }),
    DbNumber()
], SharingNode.prototype, "sharingMechanism", void 0);
__decorate([
    Column({ name: "IS_ACTIVE" })
], SharingNode.prototype, "isActive", void 0);
__decorate([
    Column({ name: "SYNC_FREQUENCY" }),
    DbNumber()
], SharingNode.prototype, "syncFrequency", void 0);
__decorate([
    Column({ name: "CONNECTION_PROTOCOL" }),
    DbNumber()
], SharingNode.prototype, "connectionProtocol", void 0);
__decorate([
    Column({ name: "CONNECTION_URL" })
], SharingNode.prototype, "connectionUrl", void 0);
__decorate([
    OneToMany({ mappedBy: "sharingNode" })
], SharingNode.prototype, "messages", void 0);
__decorate([
    OneToMany({ mappedBy: "sharingNode" })
], SharingNode.prototype, "sharingNodeRepoTransBlocks", void 0);
SharingNode = __decorate([
    Entity(),
    Table({ name: "SHARING_NODES" })
], SharingNode);
export { SharingNode };
//# sourceMappingURL=SharingNode.js.map