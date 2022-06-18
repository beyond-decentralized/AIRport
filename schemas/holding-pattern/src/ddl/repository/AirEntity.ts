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
} from '@airport/air-traffic-control'
import { Actor } from '../infrastructure/Actor'
import { SystemWideOperationId } from '../common'
import { Repository } from './Repository'

/**
 * Created by Papa on 2/17/2017.
 */
export type AirEntity_ActorRecordId = number
export type AirEntity_SystemWideOperationId = SystemWideOperationId

@MappedSuperclass()
export abstract class AirEntity {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_ID', referencedColumnName: 'ID',
		nullable: false
	})
	repository?: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_ID', referencedColumnName: 'ID',
		nullable: false
	})
	actor?: Actor

	@Id()
	@Column({ name: 'ACTOR_RECORD_ID', nullable: false })
	@GeneratedValue()
	actorRecordId?: AirEntity_ActorRecordId

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
	@Column({ name: 'SYSTEM_WIDE_OPERATION_ID', nullable: false })
	systemWideOperationId?: AirEntity_SystemWideOperationId

	// A record may actually be copied from another repository
	// via a @ManytoOne dependency.  If that is the case
	// the link to the original repository ID is saved
	// here
	@ManyToOne()
	@JoinColumn({
		name: 'ORIGINAL_REPOSITORY_ID', referencedColumnName: 'ID'
	})
	originalRepository?: Repository

	@ManyToOne()
	@JoinColumn({
		name: 'ORIGINAL_ACTOR_ID', referencedColumnName: 'ID'
	})
	originalActor?: Actor

	@Column({ name: 'ORIGINAL_ACTOR_RECORD_ID' })
	originalActorRecordId?: AirEntity_ActorRecordId

	@Transient()
	uuId?: string

	@Transient()
	isNew?: boolean

}
