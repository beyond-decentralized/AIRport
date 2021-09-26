import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/air-control";
import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { Repository } from "@airport/holding-pattern";
import { SyncPriority } from "@airport/holding-pattern/lib/ddl/repository/SyncPrority";
import { RepositorySyncStatus } from "@airport/ground-control";
import { SharingNode } from "./SharingNode";


export type SharingNodeRepositorySyncPriority = number;

@Entity()
@Table({
	name: "SHARING_NODE_REPOSITORIES",
	primaryKey: ['SHARING_NODE_ID', 'REPOSITORY_ID']
})
export class SharingNodeRepository {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SHARING_NODE_ID", referencedColumnName: "ID"
	})
	sharingNode: SharingNode;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_ID", referencedColumnName: "ID"
	})
	repository: Repository;

	@Column({ name: "AGT_REPOSITORY_ID" })
	@DbNumber()
	agtRepositoryId: AgtRepositoryId;


	@Column({ name: "ADVISED_SYNC_PRIORITY" })
	@DbString()
	advisedSyncPriority: SyncPriority;

	@DbString()
	@Column({ name: "REPOSITORY_SYNC_STATUS" })
	repositorySyncStatus: RepositorySyncStatus;

}