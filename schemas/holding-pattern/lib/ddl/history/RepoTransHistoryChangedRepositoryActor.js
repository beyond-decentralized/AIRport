"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
const EntityDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators");
let RepoTransHistoryChangedRepositoryActor = class RepoTransHistoryChangedRepositoryActor {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue()
], RepoTransHistoryChangedRepositoryActor.prototype, "id", void 0);
__decorate([
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({ name: "REPOSITORY_TRANSACTION_HISTORY_ID",
        referencedColumnName: "ID", nullable: false })
], RepoTransHistoryChangedRepositoryActor.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID",
        nullable: false })
], RepoTransHistoryChangedRepositoryActor.prototype, "repository", void 0);
__decorate([
    ColumnDecorators_1.ManyToOne(),
    ColumnDecorators_1.JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID",
        nullable: false })
], RepoTransHistoryChangedRepositoryActor.prototype, "actor", void 0);
__decorate([
    ColumnDecorators_1.Column({ name: "REFERENCE_TYPE",
        nullable: false }),
    ColumnDecorators_1.DbNumber()
], RepoTransHistoryChangedRepositoryActor.prototype, "referenceType", void 0);
RepoTransHistoryChangedRepositoryActor = __decorate([
    air_control_1.Entity(),
    EntityDecorators_1.Table({ name: "REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS" })
], RepoTransHistoryChangedRepositoryActor);
exports.RepoTransHistoryChangedRepositoryActor = RepoTransHistoryChangedRepositoryActor;
//# sourceMappingURL=RepoTransHistoryChangedRepositoryActor.js.map