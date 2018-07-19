import {
	Column,
	DbNumber,
	Id,
	JoinColumn,
	ManyToOne
}                           from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {
	Entity,
	Table
}                           from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
import {
	TerminalPassword,
	TerminalId
}                           from "@airport/arrivals-n-departures";
import {IDatabase}          from "@airport/holding-pattern";
import {DatabaseSyncStatus} from "@airport/ground-control";
import {SharingNode}        from "./SharingNode";

@Entity()
@Table({name: "SHARING_NODE_DATABASE"})
export class SharingNodeDatabase {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SHARING_NODE_ID", referencedColumnName: "ID"
	})
	sharingNode: SharingNode;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "DATABASE_ID", referencedColumnName: "ID"
	})
	database: IDatabase;

	@Column({name: "AGT_DATABASE_ID"})
	agtDatabaseId: TerminalId;

	@Column({name: "AGT_DATABASE_HASH"})
	agtDatabaseHash: TerminalPassword;

	@DbNumber()
	@Column({name: "DATABASE_SYNC_STATUS"})
	databaseSyncStatus: DatabaseSyncStatus;

}