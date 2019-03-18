"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
let SharingNode = class SharingNode {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber()
], SharingNode.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: "SHARING_MECHANISM" }),
    air_control_1.DbNumber()
], SharingNode.prototype, "sharingMechanism", void 0);
__decorate([
    air_control_1.Column({ name: "IS_ACTIVE" })
], SharingNode.prototype, "isActive", void 0);
__decorate([
    air_control_1.Column({ name: "SYNC_FREQUENCY" }),
    air_control_1.DbNumber()
], SharingNode.prototype, "syncFrequency", void 0);
__decorate([
    air_control_1.Column({ name: "CONNECTION_PROTOCOL" }),
    air_control_1.DbNumber()
], SharingNode.prototype, "connectionProtocol", void 0);
__decorate([
    air_control_1.Column({ name: "CONNECTION_URL" })
], SharingNode.prototype, "connectionUrl", void 0);
__decorate([
    ColumnDecorators_1.OneToMany({ mappedBy: "sharingNode" })
], SharingNode.prototype, "messages", void 0);
__decorate([
    ColumnDecorators_1.OneToMany({ mappedBy: "sharingNode" })
], SharingNode.prototype, "sharingNodeRepoTransBlocks", void 0);
SharingNode = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "SHARING_NODES" })
], SharingNode);
exports.SharingNode = SharingNode;
//# sourceMappingURL=SharingNode.js.map