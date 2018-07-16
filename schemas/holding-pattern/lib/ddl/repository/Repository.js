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
const SyncPrority_1 = require("./SyncPrority");
let Repository = class Repository {
    constructor() {
        /*
        @ManyToOne()
        @JoinColumns([
            {name: "LAST_SYNCED_TRANSACTION_ID", referencedColumnName: "TRANSACTION_ID"},
            {name: "LAST_SYNCED_REPO_TRANSACTION_ID", referencedColumnName: "INDEX"},
            {name: "ID", referencedColumnName: "REPOSITORY_ID"}
        ])
        lastSyncedTransaction: IRepositoryTransactionHistory;
    */
        this.repositoryActors = [];
        this.repositoryApplications = [];
        this.repositoryTransactionHistory = [];
    }
};
__decorate([
    air_control_1.Column({ name: "ID" }),
    air_control_1.GeneratedValue(),
    air_control_1.Id(),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Repository.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "OWNER_ACTOR_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], Repository.prototype, "ownerActor", void 0);
__decorate([
    air_control_1.Column({ name: "ORDERED_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Repository.prototype, "orderedId", void 0);
__decorate([
    air_control_1.Column({ name: "RANDOM_ID" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Repository.prototype, "randomId", void 0);
__decorate([
    air_control_1.Column({ name: "NAME" }),
    air_control_1.DbString(),
    __metadata("design:type", String)
], Repository.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: "REPOSITORY_URL" }),
    air_control_1.DbString(),
    __metadata("design:type", String)
], Repository.prototype, "url", void 0);
__decorate([
    air_control_1.Column({ name: "PLATFORM_CONFIG" }),
    __metadata("design:type", String)
], Repository.prototype, "platformConfig", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: CascadeType.ALL, mappedBy: 'repository' }),
    __metadata("design:type", Array)
], Repository.prototype, "repositoryActors", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: CascadeType.ALL, mappedBy: 'repository' }),
    __metadata("design:type", Array)
], Repository.prototype, "repositoryApplications", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: CascadeType.ALL, mappedBy: 'repository' }),
    __metadata("design:type", Array)
], Repository.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    air_control_1.Column({ name: "SYNC_PRIORITY" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], Repository.prototype, "syncPriority", void 0);
Repository = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: "REPOSITORY"
    })
], Repository);
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map