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
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
const SharingMechanism_1 = require("../values/SharingMechanism");
const SharingNodeProtocol_1 = require("../values/SharingNodeProtocol");
let SharingNode = class SharingNode {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNode.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: "SHARING_MECHANISM" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNode.prototype, "sharingMechanism", void 0);
__decorate([
    air_control_1.Column({ name: "IS_ACTIVE" }),
    __metadata("design:type", Boolean)
], SharingNode.prototype, "isActive", void 0);
__decorate([
    air_control_1.Column({ name: "SYNC_FREQUENCY" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNode.prototype, "syncFrequency", void 0);
__decorate([
    air_control_1.Column({ name: "CONNECTION_PROTOCOL" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNode.prototype, "connectionProtocol", void 0);
__decorate([
    air_control_1.Column({ name: "CONNECTION_URL" }),
    __metadata("design:type", String)
], SharingNode.prototype, "connectionUrl", void 0);
__decorate([
    ColumnDecorators_1.OneToMany({ mappedBy: "sharingNode" }),
    __metadata("design:type", Array)
], SharingNode.prototype, "messages", void 0);
__decorate([
    ColumnDecorators_1.OneToMany({ mappedBy: "sharingNode" }),
    __metadata("design:type", Array)
], SharingNode.prototype, "sharingNodeRepoTransBlocks", void 0);
SharingNode = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "SHARING_NODES" })
], SharingNode);
exports.SharingNode = SharingNode;
//# sourceMappingURL=SharingNode.js.map