var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-control";
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
    Column({ name: "ID" }),
    GeneratedValue(),
    Id(),
    DbNumber()
], Repository.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "OWNER_ACTOR_ID", referencedColumnName: "ID",
        nullable: false })
], Repository.prototype, "ownerActor", void 0);
__decorate([
    Column({ name: "ORDERED_ID", nullable: false }),
    DbNumber()
], Repository.prototype, "orderedId", void 0);
__decorate([
    Column({ name: "RANDOM_ID", nullable: false }),
    DbNumber()
], Repository.prototype, "randomId", void 0);
__decorate([
    Column({ name: "NAME", nullable: false }),
    DbString()
], Repository.prototype, "name", void 0);
__decorate([
    Column({ name: "REPOSITORY_URL", nullable: false }),
    DbString()
], Repository.prototype, "url", void 0);
__decorate([
    Column({ name: "PLATFORM_CONFIG", nullable: false })
], Repository.prototype, "platformConfig", void 0);
__decorate([
    OneToMany({ mappedBy: 'repository' })
], Repository.prototype, "repositoryActors", void 0);
__decorate([
    OneToMany({ mappedBy: 'repository' })
], Repository.prototype, "repositoryApplications", void 0);
__decorate([
    OneToMany({ mappedBy: 'repository' })
], Repository.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    Column({ name: "SYNC_PRIORITY", nullable: false }),
    DbNumber()
], Repository.prototype, "syncPriority", void 0);
Repository = __decorate([
    Entity(),
    Table({
        name: "REPOSITORY"
    })
], Repository);
export { Repository };
//# sourceMappingURL=Repository.js.map