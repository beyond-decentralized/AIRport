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
import { ActorRecordId } from '@airport/ground-control';
import { ApplicationColumn, ApplicationEntity, ApplicationVersion } from '@airport/airspace/dist/app/bundle';
import { Actor, Repository } from '@airport/holding-pattern/dist/app/bundle';

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
	applicationVersion: ApplicationVersion

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({
		name: 'APPLICATION_ENTITY_LID',
		referencedColumnName: 'APPLICATION_ENTITY_LID'
	})
	entity: ApplicationEntity

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	repository: Repository

	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_LID',
		referencedColumnName: 'ACTOR_LID'
	})
	actor: Actor

	@Column({ name: 'ACTOR_RECORD_ID' })
	@DbNumber()
	_actorRecordId: ActorRecordId

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({
		name: 'APPLICATION_COLUMN_LID',
		referencedColumnName: 'APPLICATION_COLUMN_LID'
	})
	column: ApplicationColumn


	@Column({ name: 'UPDATED_VALUE' })
	updatedValue: any

}
