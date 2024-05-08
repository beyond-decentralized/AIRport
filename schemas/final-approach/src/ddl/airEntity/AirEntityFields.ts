import {
	Column,
	DbDate,
	DbNumber,
	MappedSuperclass,
	Transient
} from '@airport/tarmaq-entity'
import { UserAccount } from '@airport/travel-document-checkpoint'
import { AirEntity_GUID, AirEntity_ToBeCopied, CreatedAt, IAirEntity, SystemWideOperationId } from '@airport/ground-control'
import { AirEntityId } from './AirEntityId'

/**
 * Created by Papa on 6/8/2024.
 */

@MappedSuperclass()
export abstract class AirEntityFields
	extends AirEntityId
	implements IAirEntity {

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

	constructor(
		entityId?: AirEntity_GUID
	) {
		super(entityId)

		delete this.isNew
		Object.defineProperty(this, 'isNew', {
			get() {
				return !!this._actorRecordId
			}
		})
		delete this.createdBy
		Object.defineProperty(this, 'createdBy', {
			get() {
				return this.actor.userAccount
			}
		})
	}

}
