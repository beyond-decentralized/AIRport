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
let SharingNodeTerminal = class SharingNodeTerminal {
};
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", SharingNode_1.SharingNode)
], SharingNodeTerminal.prototype, "sharingNode", void 0);
__decorate([
    ColumnDecorators_1.Id(),
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({
        name: "TERMINAL_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", Object)
], SharingNodeTerminal.prototype, "terminal", void 0);
__decorate([
    ColumnDecorators_1.Column({ name: "AGT_TERMINAL_ID" }),
    __metadata("design:type", Number)
], SharingNodeTerminal.prototype, "agtTerminalId", void 0);
__decorate([
    ColumnDecorators_1.Column({ name: "TERMINAL_PASSWORD" }),
    __metadata("design:type", String)
], SharingNodeTerminal.prototype, "agtTerminalPassword", void 0);
__decorate([
    ColumnDecorators_1.DbNumber(),
    ColumnDecorators_1.Column({ name: "TERMINAL_SYNC_STATUS" }),
    __metadata("design:type", Number)
], SharingNodeTerminal.prototype, "terminalSyncStatus", void 0);
SharingNodeTerminal = __decorate([
    EntityDecorators_1.Entity(),
    EntityDecorators_1.Table({ name: "SHARING_NODE_TERMINAL" })
], SharingNodeTerminal);
exports.SharingNodeTerminal = SharingNodeTerminal;
//# sourceMappingURL=SharingNodeTerminal.js.map