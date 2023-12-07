import {
	Column,
	DbBoolean,
	DbDate,
	DbNumber,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	MappedSuperclass,
	Transient
} from '@airport/tarmaq-entity'
import { UserAccount } from '@airport/travel-document-checkpoint/dist/app/bundle'
import { IAirEntityUtils } from '@airport/aviation-communication'
import { ActorRecordId, AgeSuitability, AirEntity_Copied, AirEntity_GUID, AirEntity_ToBeCopied, CreatedAt, IAirEntity, SystemWideOperationId } from '@airport/ground-control'
import { Actor } from './Actor'
import { Repository } from '../repository/Repository'

/**
 * Created by Papa on 2/17/2017.
 */

// Used withint the framework because it imports from '@airport/travel-document-checkpoint/dist/app/bundle'
@MappedSuperclass()
export abstract class InternalAirEntity
	implements IAirEntity {

	constructor(
		entityId?: AirEntity_GUID
	) {
		// Currently TypeScript does not support optional getters/setters
		// this is a workaround
		delete this.id
		Object.defineProperty(this, 'id', {
			get() {
				return (globalThis.IOC.getSync(globalThis.AIR_ENTITY_UTILS) as IAirEntityUtils).encodeId(this)
			},
			set(
				idString: string
			) {
				(globalThis.IOC.getSync(globalThis.AIR_ENTITY_UTILS) as IAirEntityUtils).setId(idString, this)
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

		this.id = entityId
	}

	@Id()
	@Column({ name: 'ACTOR_RECORD_ID', nullable: false })
	@GeneratedValue()
	@DbNumber()
	_actorRecordId?: ActorRecordId

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_LID',
		referencedColumnName: 'ACTOR_LID',
		nullable: false
	})
	actor?: Actor

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID',
		nullable: false
	})
	repository: Repository

	@Column({ name: 'AGE_SUITABILITY', nullable: false })
	@DbNumber()
	ageSuitability: AgeSuitability = 0

	@Column({ name: 'COPIED', nullable: false })
	@DbBoolean()
	copied?: AirEntity_Copied = false

	@Column({ name: 'CREATED_AT', nullable: false })
	@DbDate()
	createdAt: CreatedAt = new Date()

	// This field is local to the device only, when copied to new device this value is re-created
	// It is needed for bulk updates of repository records, where there is now way to find out
	// what the new field values are (like 'UPDATE ... SET a = (SUBSELECT)'). It is used as
	// a marker to find the new values after the update (and before saving them to history).
	@Column({ name: 'SYSTEM_WIDE_OPERATION_LID', nullable: false })
	@DbNumber()
	systemWideOperationId?: SystemWideOperationId

	/*
	 * Set at record creation time if a copy needs to be made (of a record
	 * in another repository)
	 */
	@Transient()
	toBeCopied?: AirEntity_ToBeCopied = false

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
	id?: AirEntity_GUID

}
