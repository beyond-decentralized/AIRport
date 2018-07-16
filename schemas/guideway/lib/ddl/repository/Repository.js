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
const RepositoryStatus_1 = require("./RepositoryStatus");
let Repository = class Repository {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue(),
    __metadata("design:type", Number)
], Repository.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: "LAST_UPDATE_DATETIME" }),
    air_control_1.DbDate(),
    __metadata("design:type", Object)
], Repository.prototype, "lastUpdateTime", void 0);
__decorate([
    air_control_1.DbString(),
    __metadata("design:type", String)
], Repository.prototype, "name", void 0);
__decorate([
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Repository.prototype, "status", void 0);
__decorate([
    air_control_1.OneToMany(),
    __metadata("design:type", Array)
], Repository.prototype, "terminalRepositories", void 0);
__decorate([
    air_control_1.OneToMany(),
    __metadata("design:type", Array)
], Repository.prototype, "repositoryTransactionBlocks", void 0);
Repository = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_REPOSITORIES" })
], Repository);
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map