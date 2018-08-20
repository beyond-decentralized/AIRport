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
const traffic_pattern_1 = require("@airport/traffic-pattern");
const RepositoryTransactionBlock_1 = require("./RepositoryTransactionBlock");
let RepoTransBlockMissingSchema = class RepoTransBlockMissingSchema {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID" }),
    __metadata("design:type", RepositoryTransactionBlock_1.RepositoryTransactionBlock)
], RepoTransBlockMissingSchema.prototype, "repositoryTransactionBlock", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SCHEMA_INDEX", referencedColumnName: "INDEX" }),
    __metadata("design:type", traffic_pattern_1.Schema)
], RepoTransBlockMissingSchema.prototype, "schema", void 0);
RepoTransBlockMissingSchema = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "REPO_TRANS_BLOCK_SCHEMAS_TO_UPGRADE" })
], RepoTransBlockMissingSchema);
exports.RepoTransBlockMissingSchema = RepoTransBlockMissingSchema;
//# sourceMappingURL=RepositoryTransactionBlockMissingSchema.js.map