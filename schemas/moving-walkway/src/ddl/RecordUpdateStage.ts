import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
} from '@airport/air-control'
import {
	IActor,
	IRepository,
	RecordHistoryActorRecordId
} from '@airport/holding-pattern'
import {
	ISchemaColumn,
	ISchemaEntity,
	ISchemaVersion
} from '@airport/traffic-pattern'

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
	@JoinColumn({name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID'})
	schemaVersion: ISchemaVersion

	@ManyToOne()
	@JoinColumns([
		{name: 'SCHEMA_VERSION_ID'},
		{name: 'TABLE_INDEX'}
	])
	entity: ISchemaEntity

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
	@JoinColumns([
		{name: 'SCHEMA_ENTITY_ID'},
		{name: 'COLUMN_INDEX'}
	])
	column: ISchemaColumn


	@Column({name: 'UPDATED_VALUE'})
	updatedValue: any

}
