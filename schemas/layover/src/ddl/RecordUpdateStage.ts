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
import { ActorRecordId, IRecordUpdateStage, RecordUpdateStage_LocalId } from '@airport/ground-control';
import { DdlColumn, DdlEntity, DdlApplicationVersion } from '@airport/airspace/dist/app/bundle';
import { Actor, Repository } from '@airport/holding-pattern/dist/app/bundle';

/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
@Entity()
@Table({ name: 'RECORD_UPDATE_STAGE' })
export class RecordUpdateStage
	implements IRecordUpdateStage {

	@Id()
	@GeneratedValue()
	@Column({ name: 'RECORD_UPDATE_STAGE_LID' })
	@DbNumber()
	_localId: RecordUpdateStage_LocalId

	@Column({ name: 'ACTOR_RECORD_ID' })
	@DbNumber()
	_actorRecordId: ActorRecordId


	@Column({ name: 'UPDATED_VALUE' })
	updatedValue: any

	@ManyToOne()
	@JoinColumn({
		name: 'DB_APPLICATION_VERSION_LID',
		referencedColumnName: 'DB_APPLICATION_VERSION_LID'
	})
	applicationVersion: DdlApplicationVersion

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({
		name: 'DB_ENTITY_LID',
		referencedColumnName: 'DB_ENTITY_LID'
	})
	entity: DdlEntity

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

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({
		name: 'DB_COLUMN_LID',
		referencedColumnName: 'DB_COLUMN_LID'
	})
	column: DdlColumn

}
