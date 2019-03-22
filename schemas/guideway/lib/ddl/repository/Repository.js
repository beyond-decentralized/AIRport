"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let Repository = class Repository {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue()
], Repository.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'LAST_UPDATE_DATETIME', nullable: false }),
    air_control_1.DbDate()
], Repository.prototype, "lastUpdateTime", void 0);
__decorate([
    air_control_1.DbString(),
    air_control_1.Column({ name: 'NAME', nullable: false })
], Repository.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'STATUS', nullable: false }),
    air_control_1.DbNumber()
], Repository.prototype, "status", void 0);
__decorate([
    air_control_1.OneToMany()
], Repository.prototype, "terminalRepositories", void 0);
__decorate([
    air_control_1.OneToMany()
], Repository.prototype, "repositoryTransactionBlocks", void 0);
Repository = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'AGT_REPOSITORIES' })
], Repository);
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map