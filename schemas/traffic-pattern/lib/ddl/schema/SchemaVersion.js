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
var _a, _b, _c, _d, _e;
const air_control_1 = require("@airport/air-control");
let SchemaVersion = class SchemaVersion {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.DbNumber(),
    __metadata("design:type", typeof (_a = typeof air_control_1.SchemaVersionId !== "undefined" && air_control_1.SchemaVersionId) === "function" && _a || Object)
], SchemaVersion.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: "VERSION_STRING" }),
    __metadata("design:type", typeof (_b = typeof air_control_1.SchemaVersionString !== "undefined" && air_control_1.SchemaVersionString) === "function" && _b || Object)
], SchemaVersion.prototype, "versionString", void 0);
__decorate([
    air_control_1.Column({ name: "MAJOR_VERSION" }),
    air_control_1.DbNumber(),
    __metadata("design:type", typeof (_c = typeof air_control_1.SchemaVersionMajor !== "undefined" && air_control_1.SchemaVersionMajor) === "function" && _c || Object)
], SchemaVersion.prototype, "majorVersion", void 0);
__decorate([
    air_control_1.Column({ name: "MINOR_VERSION" }),
    air_control_1.DbNumber(),
    __metadata("design:type", typeof (_d = typeof air_control_1.SchemaVersionMinor !== "undefined" && air_control_1.SchemaVersionMinor) === "function" && _d || Object)
], SchemaVersion.prototype, "minorVersion", void 0);
__decorate([
    air_control_1.Column({ name: "PATCH_VERSION" }),
    air_control_1.DbNumber(),
    __metadata("design:type", typeof (_e = typeof air_control_1.SchemaVersionPatch !== "undefined" && air_control_1.SchemaVersionPatch) === "function" && _e || Object)
], SchemaVersion.prototype, "patchVersion", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SCHEMA_INDEX", referencedColumnName: "INDEX" }),
    __metadata("design:type", Object)
], SchemaVersion.prototype, "schema", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'schemaVersion' }),
    __metadata("design:type", Array)
], SchemaVersion.prototype, "entities", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'ownSchemaVersion' }),
    __metadata("design:type", Array)
], SchemaVersion.prototype, "references", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'referencedSchemaVersion' }),
    __metadata("design:type", Array)
], SchemaVersion.prototype, "referencedBy", void 0);
SchemaVersion = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "SCHEMA_VERSIONS" })
], SchemaVersion);
exports.SchemaVersion = SchemaVersion;
//# sourceMappingURL=SchemaVersion.js.map