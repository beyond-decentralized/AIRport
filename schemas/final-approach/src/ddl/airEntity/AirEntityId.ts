import {
	Column,
	DbNumber,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	MappedSuperclass,
	Transient
} from '@airport/tarmaq-entity'
import { Actor, Repository } from '@airport/holding-pattern'
import { IAirEntityUtils } from '@airport/aviation-communication'
import { ActorRecordId, AirEntity_GUID } from '@airport/ground-control'

/**
 * Created by Papa on 6/8/2024.
 */

@MappedSuperclass()
export abstract class AirEntityId {

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

		this.id = entityId
	}

}
