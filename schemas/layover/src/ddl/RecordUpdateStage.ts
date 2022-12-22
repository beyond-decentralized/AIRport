import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import {
	IActor,
	IRepository,
	RecordHistory_ActorRecordId
} from '@airport/holding-pattern/dist/app/bundle'
import {
	IApplicationColumn,
	IApplicationEntity,
	IApplicationVersion
} from '@airport/airspace/dist/app/bundle'

export type RecordUpdateStage_LocalId = number;

/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
@Entity()
@Table({ name: 'RECORD_UPDATE_STAGE' })
export class RecordUpdateStage {

	@Id()
	@GeneratedValue()
	@Column({ name: 'RECORD_UPDATE_STAGE_LID' })
	_localId: RecordUpdateStage_LocalId

	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_VERSION_LID',
		referencedColumnName: 'APPLICATION_VERSION_LID'
	})
	applicationVersion: IApplicationVersion

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({
		name: 'APPLICATION_ENTITY_LID',
		referencedColumnName: 'APPLICATION_ENTITY_LID'
	})
	entity: IApplicationEntity

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	repository: IRepository

	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_LID',
		referencedColumnName: 'ACTOR_LID'
	})
	actor: IActor

	@Column({ name: 'ACTOR_RECORD_ID' })
	@DbNumber()
	_actorRecordId: RecordHistory_ActorRecordId

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({
		name: 'APPLICATION_COLUMN_LID',
		referencedColumnName: 'APPLICATION_COLUMN_LID'
	})
	column: IApplicationColumn


	@Column({ name: 'UPDATED_VALUE' })
	updatedValue: any

}
