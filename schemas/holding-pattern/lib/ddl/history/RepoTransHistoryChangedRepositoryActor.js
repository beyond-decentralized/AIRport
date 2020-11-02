var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, GeneratedValue, Id } from '@airport/air-control';
import { Column, DbNumber, JoinColumn, ManyToOne } from '@airport/air-control';
import { Table } from '@airport/air-control';
let RepoTransHistoryChangedRepositoryActor = class RepoTransHistoryChangedRepositoryActor {
};
__decorate([
    Id(),
    GeneratedValue()
], RepoTransHistoryChangedRepositoryActor.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_TRANSACTION_HISTORY_ID',
        referencedColumnName: 'ID', nullable: false
    })
], RepoTransHistoryChangedRepositoryActor.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_ID', referencedColumnName: 'ID',
        nullable: false
    })
], RepoTransHistoryChangedRepositoryActor.prototype, "repository", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ACTOR_ID', referencedColumnName: 'ID',
        nullable: false
    })
], RepoTransHistoryChangedRepositoryActor.prototype, "actor", void 0);
__decorate([
    Column({
        name: 'REFERENCE_TYPE',
        nullable: false
    }),
    DbNumber()
], RepoTransHistoryChangedRepositoryActor.prototype, "referenceType", void 0);
RepoTransHistoryChangedRepositoryActor = __decorate([
    Entity(),
    Table({ name: 'REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS' })
], RepoTransHistoryChangedRepositoryActor);
export { RepoTransHistoryChangedRepositoryActor };
//# sourceMappingURL=RepoTransHistoryChangedRepositoryActor.js.map