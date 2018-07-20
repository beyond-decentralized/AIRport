import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
} from "@airport/air-control";
import {
	IActor,
	IRepository,
	RecordHistoryActorRecordId
} from "@airport/holding-pattern";
import {
	ISchema,
	ISchemaColumn,
	ISchemaEntity
} from "@airport/traffic-pattern";

/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
@Entity()
@Table({name: "RECORD_UPDATE_STAGE"})
export class RecordUpdateStage {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "SCHEMA_INDEX", referencedColumnName: "INDEX"})
	schema: ISchema;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
	])
	entity: ISchemaEntity;

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: IRepository;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "ACTOR_ID", referencedColumnName: "ID"})
	actor: IActor;

	@Id()
	@Column({name: "ACTOR_RECORD_ID"})
	@DbNumber()
	actorRecordId: RecordHistoryActorRecordId;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "TABLE_INDEX"},
		{name: "COLUMN_INDEX", referencedColumnName: "INDEX"}
	])
	column: ISchemaColumn;


	@Column({name: "UPDATED_VALUE"})
	updatedValue: any;

}