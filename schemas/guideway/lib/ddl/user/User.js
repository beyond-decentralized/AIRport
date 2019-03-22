"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let User = class User {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue()
], User.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'HASH', nullable: false }),
    air_control_1.DbString()
], User.prototype, "hash", void 0);
__decorate([
    air_control_1.Column({ name: 'EMAIL', nullable: false })
], User.prototype, "email", void 0);
__decorate([
    air_control_1.Column({ name: "IS_INVITATION", nullable: false }),
    air_control_1.DbBoolean()
], User.prototype, "isInvitation", void 0);
__decorate([
    air_control_1.OneToMany()
], User.prototype, "securityAnswers", void 0);
__decorate([
    air_control_1.OneToMany()
], User.prototype, "userRepositories", void 0);
__decorate([
    air_control_1.OneToMany()
], User.prototype, "terminals", void 0);
__decorate([
    air_control_1.OneToMany()
], User.prototype, "repositoryTransactionBlocks", void 0);
User = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_USERS" })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map