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
const SchemaVersion_1 = require("./SchemaVersion");
let VersionedSchemaObject = class VersionedSchemaObject {
};
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'DEPRECATED_SINCE_SCHEMA_VERSION_ID', referencedColumnName: 'ID' }),
    __metadata("design:type", SchemaVersion_1.SchemaVersion)
], VersionedSchemaObject.prototype, "deprecatedSinceVersion", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'REMOVED_IN_SCHEMA_VERSION_ID', referencedColumnName: 'ID' }),
    __metadata("design:type", SchemaVersion_1.SchemaVersion)
], VersionedSchemaObject.prototype, "removedInVersion", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SINCE_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", SchemaVersion_1.SchemaVersion)
], VersionedSchemaObject.prototype, "sinceVersion", void 0);
VersionedSchemaObject = __decorate([
    air_control_1.MappedSuperclass()
], VersionedSchemaObject);
exports.VersionedSchemaObject = VersionedSchemaObject;
//# sourceMappingURL=VersionedSchemaObject.js.map