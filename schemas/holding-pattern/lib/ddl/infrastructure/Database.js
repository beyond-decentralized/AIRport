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
let Database = class Database {
    constructor() {
        this.isLocal = false;
    }
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Database.prototype, "id", void 0);
__decorate([
    air_control_1.DbString(),
    __metadata("design:type", String)
], Database.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: "SECOND_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Database.prototype, "secondId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "OWNER_USER_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], Database.prototype, "owner", void 0);
__decorate([
    air_control_1.Column({ name: "IS_LOCAL" }),
    air_control_1.DbBoolean(),
    __metadata("design:type", Boolean)
], Database.prototype, "isLocal", void 0);
Database = __decorate([
    air_control_1.Entity()
], Database);
exports.Database = Database;
//# sourceMappingURL=Database.js.map