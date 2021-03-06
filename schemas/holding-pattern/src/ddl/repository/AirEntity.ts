import {
	Column,
	DbDate,
	DbNumber,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	MappedSuperclass,
	Transient
} from '@airport/tarmaq-entity'
import { Actor } from '../infrastructure/Actor'
import { SystemWideOperationId } from '../common'
import { Repository } from './Repository'
import { UserAccount } from '@airport/travel-document-checkpoint'
import { IOC } from '@airport/direction-indicator'
import { AIR_ENTITY_UTILS } from '@airport/aviation-communication'

/**
 * Created by Papa on 2/17/2017.
 */
export type AirEntity_ActorRecordId = number
export type AirEntity_SystemWideOperationId = SystemWideOperationId

@MappedSuperclass()
export abstract class AirEntity {

	constructor(
		entityGUID?: string
	) {
		this.id = entityGUID
		// Currently TypeScript does not support optional getters/setters
		// this is a workaround
		delete this.id
		Object.defineProperty(this, 'id', {
			get() {
				return IOC.getSync(AIR_ENTITY_UTILS).encodeId(this)
			},
			set(
				idString: string
			) {
				IOC.getSync(AIR_ENTITY_UTILS).setId(idString, this)
			}
		});
		delete this.isNew
		Object.defineProperty(this, 'isNew', {
			get() {
				return !!this._actorRecordId
			}
		});
		delete this.createdBy
		Object.defineProperty(this, 'createdBy', {
			get() {
				return this.actor.userAccount
			}
		});
	}

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID',
		nullable: false
	})
	repository?: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_LID',
		referencedColumnName: 'ACTOR_LID',
		nullable: false
	})
	actor?: Actor

	@Id()
	@Column({ name: 'ACTOR_RECORD_ID', nullable: false })
	@GeneratedValue()
	_actorRecordId?: AirEntity_ActorRecordId

	@Column({ name: 'AGE_SUITABILITY', nullable: false })
	@DbNumber()
	ageSuitability?: number

	@Column({ name: 'CREATED_AT' })
	@DbDate()
	createdAt?: Date

	// This field is local to the device only, when copied to new device this value is re-created
	// It is needed for bulk updates of repository records, where there is now way to find out
	// what the new field values are (like 'UPDATE ... SET a = (SUBSELECT)'). It is used as
	// a marker to find the new values after the update (and before saving them to history).
	@Column({ name: 'SYSTEM_WIDE_OPERATION_LID', nullable: false })
	systemWideOperationId?: AirEntity_SystemWideOperationId

	// A record may actually be copied from another repository
	// via a @ManytoOne dependency.  If that is the case
	// the link to the original repository ID is saved
	// here
	@ManyToOne()
	@JoinColumn({
		name: 'ORIGINAL_REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	originalRepository?: Repository

	@ManyToOne()
	@JoinColumn({
		name: 'ORIGINAL_ACTOR_LID',
		referencedColumnName: 'ACTOR_LID'
	})
	originalActor?: Actor

	@Column({ name: 'ORIGINAL_ACTOR_RECORD_ID' })
	originalActorRecordId?: AirEntity_ActorRecordId

	/*
	 *A transient convenience property to get the username of the
	 * UserAccountAccount that created the record.
	 */
	@Transient()
	createdBy?: UserAccount

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
	@Transient()
	isNew?: boolean

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
	@Transient()
	id?: string

}
