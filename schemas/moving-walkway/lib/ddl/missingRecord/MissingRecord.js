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
const MissingRecordStatus_1 = require("./MissingRecordStatus");
let MissingRecord = class MissingRecord {
};
__decorate([
    air_control_1.Id(),
    __metadata("design:type", Number)
], MissingRecord.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SCHEMA_INDEX", referencedColumnName: "INDEX" }),
    __metadata("design:type", Object)
], MissingRecord.prototype, "schema", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "SCHEMA_VERSION_ID" },
        { name: "ENTITY_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], MissingRecord.prototype, "entity", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "REPOSITORY_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", Object)
], MissingRecord.prototype, "repository", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], MissingRecord.prototype, "actor", void 0);
__decorate([
    air_control_1.Column({ name: "ACTOR_RECORD_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], MissingRecord.prototype, "actorRecordId", void 0);
__decorate([
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], MissingRecord.prototype, "status", void 0);
MissingRecord = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "MISSING_RECORDS" })
], MissingRecord);
exports.MissingRecord = MissingRecord;
//# sourceMappingURL=MissingRecord.js.map