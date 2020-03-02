"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let Schema = class Schema {
    constructor() {
        this.versions = [];
    }
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    air_control_1.Column({ name: 'SCHEMA_INDEX', nullable: false })
], Schema.prototype, "index", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'DOMAIN_ID', referencedColumnName: 'ID', nullable: false })
], Schema.prototype, "domain", void 0);
__decorate([
    air_control_1.Column({ name: 'SCOPE', nullable: false }),
    air_control_1.DbString()
], Schema.prototype, "scope", void 0);
__decorate([
    air_control_1.Column({ name: 'SCHEMA_NAME', nullable: false }),
    air_control_1.DbString()
], Schema.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'STATUS', nullable: false }),
    air_control_1.DbNumber()
], Schema.prototype, "status", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'schema' })
], Schema.prototype, "versions", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'CURRENT_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], Schema.prototype, "currentVersion", void 0);
Schema = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMAS'
    })
], Schema);
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map