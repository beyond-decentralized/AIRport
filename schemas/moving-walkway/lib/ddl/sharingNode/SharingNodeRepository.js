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
const holding_pattern_1 = require("@airport/holding-pattern");
const SyncPrority_1 = require("@airport/holding-pattern/lib/ddl/repository/SyncPrority");
const terminal_map_1 = require("@airport/terminal-map");
const SharingNode_1 = require("./SharingNode");
let SharingNodeRepository = class SharingNodeRepository {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", SharingNode_1.SharingNode)
], SharingNodeRepository.prototype, "sharingNode", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: "REPOSITORY_ID", referencedColumnName: "ID"
    }),
    __metadata("design:type", holding_pattern_1.Repository)
], SharingNodeRepository.prototype, "repository", void 0);
__decorate([
    air_control_1.Column({ name: "AGT_REPOSITORY_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNodeRepository.prototype, "agtRepositoryId", void 0);
__decorate([
    air_control_1.Column({ name: "ADVISED_SYNC_PRIORITY" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SharingNodeRepository.prototype, "advisedSyncPriority", void 0);
__decorate([
    air_control_1.DbNumber(),
    air_control_1.Column({ name: "REPOSITORY_SYNC_STATUS" }),
    __metadata("design:type", typeof (_a = typeof terminal_map_1.RepositorySyncStatus !== "undefined" && terminal_map_1.RepositorySyncStatus) === "function" && _a || Object)
], SharingNodeRepository.prototype, "repositorySyncStatus", void 0);
SharingNodeRepository = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: "SHARING_NODE_REPOSITORIES",
        primaryKey: ['SHARING_NODE_ID', 'REPOSITORY_ID']
    })
], SharingNodeRepository);
exports.SharingNodeRepository = SharingNodeRepository;
//# sourceMappingURL=SharingNodeRepository.js.map