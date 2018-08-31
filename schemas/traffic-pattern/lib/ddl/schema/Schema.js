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
const territory_1 = require("@airport/territory");
const SchemaStatus_1 = require("./SchemaStatus");
const SchemaVersion_1 = require("./SchemaVersion");
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
let Schema = class Schema extends VersionedSchemaObject_1.VersionedSchemaObject {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.SequenceGenerator({ allocationSize: 1 }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Schema.prototype, "index", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'DOMAIN_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", territory_1.Domain)
], Schema.prototype, "domain", void 0);
__decorate([
    air_control_1.Column({ name: 'SCOPE', nullable: false }),
    air_control_1.DbString(),
    __metadata("design:type", typeof (_a = typeof SchemaScope !== "undefined" && SchemaScope) === "function" ? _a : Object)
], Schema.prototype, "scope", void 0);
__decorate([
    air_control_1.Column({ name: 'SCHEMA_NAME', nullable: false }),
    air_control_1.DbString(),
    __metadata("design:type", String)
], Schema.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'STATUS', nullable: false }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Schema.prototype, "status", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'schema' }),
    __metadata("design:type", Array)
], Schema.prototype, "versions", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'CURRENT_VERSION_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", SchemaVersion_1.SchemaVersion)
], Schema.prototype, "currentVersion", void 0);
Schema = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMAS'
    })
], Schema);
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map