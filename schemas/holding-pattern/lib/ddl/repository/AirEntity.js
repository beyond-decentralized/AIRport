var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbDate, DbNumber, GeneratedValue, Id, JoinColumn, ManyToOne, MappedSuperclass, Transient } from '@airport/air-traffic-control';
import { IOC } from '@airport/direction-indicator';
import { AIR_ENTITY_UTILS } from '@airport/aviation-communication';
let AirEntity = class AirEntity {
    constructor(entityGUID) {
        this.id = entityGUID;
    }
    /*
     *A transient convenience property to get the username of the
     * UserAccount that created the record.
     */
    get createdBy() {
        return this.actor.user;
    }
    /**
     * A transient property, generated on the entity objects by the
     * QueryResultsDeserializer.doSetPropertyDescriptors.  It's value
     * is:
     *
     * 	true - this entity object has not been saved and does not have an id
     * 	false - this entity object has been saved and has an id
     *
     * It does not check the existence of Id on the object - most of
     * the time existing objects are retrieved without a Id (only with
     * the _localId properties).
     */
    get isNew() {
        return !!this._actorRecordId;
    }
    /**
     * A transient aggregate property, generated on the entity objects by the
     * QueryResultsDeserializer.doSetPropertyDescriptors.  It is
     * composed of:
     *
     * 	{
     * 		actor: {
     * 			GUID
     * 		},
     * 		_actorRecordId,
     * 		repository: {
     * 			GUID
     * 		}
     * 	}
     *
     * Returns:
     *
     * `${repository.GUID}-${actor.GUID}-${_actorRecordId}`
     *
     * Returns null if one of it's member Ids does not exist
     */
    get id() {
        return IOC.getSync(AIR_ENTITY_UTILS).encodeId(this);
    }
    set id(entityGUID) {
        IOC.getSync(AIR_ENTITY_UTILS).setId(entityGUID, this);
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
], AirEntity.prototype, "isNew", null);
AirEntity = __decorate([
    MappedSuperclass()
], AirEntity);
export { AirEntity };
//# sourceMappingURL=AirEntity.js.map