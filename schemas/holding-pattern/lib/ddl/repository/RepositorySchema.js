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
var _a;
const air_control_1 = require("@airport/air-control");
let RepositorySchema = class RepositorySchema {
};
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "REPOSITORY_SCHEMA_ID" }),
    air_control_1.GeneratedValue(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], RepositorySchema.prototype, "id", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], RepositorySchema.prototype, "repository", void 0);
__decorate([
    air_control_1.Column({ name: "SCHEMA_INDEX" }),
    air_control_1.DbNumber(),
    __metadata("design:type", typeof (_a = typeof air_control_1.SchemaIndex !== "undefined" && air_control_1.SchemaIndex) === "function" && _a || Object)
], RepositorySchema.prototype, "schemaIndex", void 0);
RepositorySchema = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: "REPOSITORY_SCHEMAS"
    })
], RepositorySchema);
exports.RepositorySchema = RepositorySchema;
//# sourceMappingURL=RepositorySchema.js.map