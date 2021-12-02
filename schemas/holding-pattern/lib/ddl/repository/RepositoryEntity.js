var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, GeneratedValue, Id, JoinColumn, ManyToOne, MappedSuperclass } from '@airport/air-control';
let RepositoryEntity = class RepositoryEntity {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_ID', referencedColumnName: 'ID',
        nullable: false
    })
], RepositoryEntity.prototype, "repository", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'ACTOR_ID', referencedColumnName: 'ID',
        nullable: false
    })
], RepositoryEntity.prototype, "actor", void 0);
__decorate([
    Id(),
    Column({ name: 'ACTOR_RECORD_ID', nullable: false }),
    GeneratedValue()
], RepositoryEntity.prototype, "actorRecordId", void 0);
__decorate([
    Column({ name: 'AGE_SUITABILITY', nullable: false }),
    DbNumber()
], RepositoryEntity.prototype, "ageSuitability", void 0);
__decorate([
    Column({ name: 'SYSTEM_WIDE_OPERATION_ID', nullable: false })
], RepositoryEntity.prototype, "systemWideOperationId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ORIGINAL_REPOSITORY_ID', referencedColumnName: 'ID'
    })
], RepositoryEntity.prototype, "originalRepository", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'ORIGINAL_ACTOR_ID', referencedColumnName: 'ID'
    })
], RepositoryEntity.prototype, "originalActor", void 0);
__decorate([
    Id(),
    Column({ name: 'ORIGINAL_ACTOR_RECORD_ID' }),
    GeneratedValue()
], RepositoryEntity.prototype, "originalActorRecordId", void 0);
RepositoryEntity = __decorate([
    MappedSuperclass()
], RepositoryEntity);
export { RepositoryEntity };
//# sourceMappingURL=RepositoryEntity.js.map