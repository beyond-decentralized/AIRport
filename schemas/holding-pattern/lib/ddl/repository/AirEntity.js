var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbDate, DbNumber, GeneratedValue, Id, JoinColumn, ManyToOne, MappedSuperclass, Transient } from '@airport/tarmaq-entity';
import { IOC } from '@airport/direction-indicator';
import { AIR_ENTITY_UTILS } from '@airport/aviation-communication';
let AirEntity = class AirEntity {
    constructor(entityGUID) {
        this.id = entityGUID;
        // Currently TypeScript does not support optional getters/setters
        // this is a workaround
        delete this.id;
        Object.defineProperty(this, 'id', {
            get() {
                return IOC.getSync(AIR_ENTITY_UTILS).encodeId(this);
            },
            set(idString) {
                IOC.getSync(AIR_ENTITY_UTILS).setId(idString, this);
            }
        });
        delete this.isNew;
        Object.defineProperty(this, 'isNew', {
            get() {
                return !!this._actorRecordId;
            }
        });
        delete this.createdBy;
        Object.defineProperty(this, 'createdBy', {
            get() {
                return this.actor.userAccount;
            }
        });
    }
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
], AirEntity.prototype, "repository", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'ACTOR_LID',
        referencedColumnName: 'ACTOR_LID',
        nullable: false
    })
], AirEntity.prototype, "actor", void 0);
__decorate([
    Id(),
    Column({ name: 'ACTOR_RECORD_ID', nullable: false }),
    GeneratedValue()
], AirEntity.prototype, "_actorRecordId", void 0);
__decorate([
    Column({ name: 'AGE_SUITABILITY', nullable: false }),
    DbNumber()
], AirEntity.prototype, "ageSuitability", void 0);
__decorate([
    Column({ name: 'CREATED_AT' }),
    DbDate()
], AirEntity.prototype, "createdAt", void 0);
__decorate([
    Column({ name: 'SYSTEM_WIDE_OPERATION_LID', nullable: false })
], AirEntity.prototype, "systemWideOperationId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ORIGINAL_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID'
    })
], AirEntity.prototype, "originalRepository", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ORIGINAL_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID'
    })
], AirEntity.prototype, "originalActor", void 0);
__decorate([
    Column({ name: 'ORIGINAL_ACTOR_RECORD_ID' })
], AirEntity.prototype, "originalActorRecordId", void 0);
__decorate([
    Transient()
], AirEntity.prototype, "createdBy", void 0);
__decorate([
    Transient()
], AirEntity.prototype, "isNew", void 0);
__decorate([
    Transient()
], AirEntity.prototype, "id", void 0);
AirEntity = __decorate([
    MappedSuperclass()
], AirEntity);
export { AirEntity };
//# sourceMappingURL=AirEntity.js.map