import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {
	IActor,
	IRepository,
	RecordHistoryActorRecordId
} from '@airport/holding-pattern'
import {
	IApplicationColumn,
	IApplicationEntity,
	IApplicationVersion
} from '@airport/airspace'

export type RecordUpdateStageId = number;

/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
@Entity()
@Table({name: 'RECORD_UPDATE_STAGE'})
export class RecordUpdateStage {

	@Id()
	@GeneratedValue()
	id: RecordUpdateStageId

	@ManyToOne()
	@JoinColumn({name: 'APPLICATION_VERSION_ID', referencedColumnName: 'ID'})
	applicationVersion: IApplicationVersion

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({name: 'APPLICATION_ENTITY_ID', referencedColumnName: 'ID'})
	entity: IApplicationEntity

	@ManyToOne()
	@JoinColumn({name: 'REPOSITORY_ID', referencedColumnName: 'ID'})
	repository: IRepository

	@ManyToOne()
	@JoinColumn({name: 'ACTOR_ID', referencedColumnName: 'ID'})
	actor: IActor

	@Column({name: 'ACTOR_RECORD_ID'})
	@DbNumber()
	actorRecordId: RecordHistoryActorRecordId

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({name: 'APPLICATION_COLUMN_ID', referencedColumnName: 'ID'})
	column: IApplicationColumn


	@Column({name: 'UPDATED_VALUE'})
	updatedValue: any

}
