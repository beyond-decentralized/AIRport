"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const RepositoryEntity_1 = require("../repository/RepositoryEntity");
let ServerImmutableRepositoryEntity = class ServerImmutableRepositoryEntity extends RepositoryEntity_1.RepositoryEntity {
};
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'USER_ACCOUNT_ID' })
], ServerImmutableRepositoryEntity.prototype, "user", void 0);
__decorate([
    air_control_1.Column({ name: 'CREATED_AT' })
], ServerImmutableRepositoryEntity.prototype, "createdAt", void 0);
ServerImmutableRepositoryEntity = __decorate([
    air_control_1.MappedSuperclass()
], ServerImmutableRepositoryEntity);
exports.ServerImmutableRepositoryEntity = ServerImmutableRepositoryEntity;
//# sourceMappingURL=ServerImmutableRepositoryEntity.js.map