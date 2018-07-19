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
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
const EntityDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators");
const ground_control_1 = require("@airport/ground-control");
const SharingNode_1 = require("./SharingNode");
let SharingNodeDatabase = class SharingNodeDatabase {
};
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", SharingNode_1.SharingNode)
], SharingNodeDatabase.prototype, "sharingNode", void 0);
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({
        name: "DATABASE_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", Object)
], SharingNodeDatabase.prototype, "database", void 0);
__decorate([
    ColumnDecorators_1.Column({ name: "AGT_DATABASE_ID" }),
    __metadata("design:type", Number)
], SharingNodeDatabase.prototype, "agtDatabaseId", void 0);
__decorate([
    ColumnDecorators_1.Column({ name: "AGT_DATABASE_HASH" }),
    __metadata("design:type", String)
], SharingNodeDatabase.prototype, "agtDatabaseHash", void 0);
__decorate([
    ColumnDecorators_1.DbNumber(),
    ColumnDecorators_1.Column({ name: "DATABASE_SYNC_STATUS" }),
    __metadata("design:type", Number)
], SharingNodeDatabase.prototype, "databaseSyncStatus", void 0);
SharingNodeDatabase = __decorate([
    EntityDecorators_1.Entity(),
    EntityDecorators_1.Table({ name: "SHARING_NODE_DATABASE" })
], SharingNodeDatabase);
exports.SharingNodeDatabase = SharingNodeDatabase;
//# sourceMappingURL=SharingNodeDatabase.js.map