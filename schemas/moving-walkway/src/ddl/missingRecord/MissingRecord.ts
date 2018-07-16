import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
}                            from "@airport/air-control";
import {
	IActor,
	IRepository,
	RecordHistoryActorRecordId
}                            from "@airport/holding-pattern";
import {
	ISchema,
	ISchemaEntity
}                            from "@airport/traffic-pattern";
import {MissingRecordStatus} from "./MissingRecordStatus";

export type MissingRecordId = number;

@Entity()
@Table({name: "MISSING_RECORDS"})
export class MissingRecord {

	@Id()
	id: MissingRecordId;

	@ManyToOne()
	@JoinColumn({name: "SCHEMA_INDEX", referencedColumnName: "INDEX"})
	schema: ISchema;

	@ManyToOne()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "ENTITY_INDEX", referencedColumnName: "INDEX"}
	])
	entity: ISchemaEntity;

	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_ID", referencedColumnName: "ID"
	})
	repository: IRepository;

	@ManyToOne()
	@JoinColumn({name: "ACTOR_ID", referencedColumnName: "ID"})
	actor: IActor;

	@Column({name: "ACTOR_RECORD_ID"})
	@DbNumber()
	actorRecordId: RecordHistoryActorRecordId;

	@DbNumber()
	status: MissingRecordStatus;

}