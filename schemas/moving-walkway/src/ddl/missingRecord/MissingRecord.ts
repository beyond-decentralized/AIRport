import {
	Column,
	DbNumber,
	DbString,
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
	RecordHistoryActorRecordId,
	RepositoryTransactionHistory
} from "@airport/holding-pattern";
import {
	ISchemaEntity,
	ISchemaVersion
} from "@airport/traffic-pattern";
import { MissingRecordStatus } from "./MissingRecordStatus";

export type MissingRecordId = number;

@Entity()
@Table({ name: "MISSING_RECORDS" })
export class MissingRecord {

	@Id()
	id: MissingRecordId;

	@ManyToOne()
	@JoinColumn({ name: "SCHEMA_VERSION_ID", referencedColumnName: "ID" })
	schemaVersion: ISchemaVersion;

	@ManyToOne()
	// FIXME: verify that these records don't make it into serialized
	// repository ledger (and hence, that using local ids is safe)
	@JoinColumn({ name: "SCHEMA_ENTITY_ID", referencedColumnName: 'ID' })
	entity: ISchemaEntity;

	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_ID", referencedColumnName: "ID"
	})
	repository: IRepository;

	@ManyToOne()
	@JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID" })
	actor: IActor;

	@Column({ name: "ACTOR_RECORD_ID" })
	@DbNumber()
	actorRecordId: RecordHistoryActorRecordId;

	@DbString()
	status: MissingRecordStatus;

	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_TRANSACTION_HISTORY_ID",
		referencedColumnName: "ID"
	})
	repositoryTransactionHistory: RepositoryTransactionHistory

}
