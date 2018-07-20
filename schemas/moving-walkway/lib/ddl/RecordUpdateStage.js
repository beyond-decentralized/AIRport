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
/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
let RecordUpdateStage = class RecordUpdateStage {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SCHEMA_INDEX", referencedColumnName: "INDEX" }),
    __metadata("design:type", Object)
], RecordUpdateStage.prototype, "schema", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "SCHEMA_VERSION_ID" },
        { name: "TABLE_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], RecordUpdateStage.prototype, "entity", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], RecordUpdateStage.prototype, "repository", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], RecordUpdateStage.prototype, "actor", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "ACTOR_RECORD_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], RecordUpdateStage.prototype, "actorRecordId", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "SCHEMA_VERSION_ID" },
        { name: "TABLE_INDEX" },
        { name: "COLUMN_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], RecordUpdateStage.prototype, "column", void 0);
__decorate([
    air_control_1.Column({ name: "UPDATED_VALUE" }),
    __metadata("design:type", Object)
], RecordUpdateStage.prototype, "updatedValue", void 0);
RecordUpdateStage = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "RECORD_UPDATE_STAGE" })
], RecordUpdateStage);
exports.RecordUpdateStage = RecordUpdateStage;
//# sourceMappingURL=RecordUpdateStage.js.map