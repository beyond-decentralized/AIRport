import {
	Column,
	DbNumber,
	Id
}                      from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {
	Entity,
	Table
}                      from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
import {
	SharingNodeRepoTransBlockSyncStatus,
	TmRepositoryTransactionBlockId
}                      from "@airport/arrivals-n-departures";
import {SharingNodeId} from "./SharingNode";

@Entity()
@Table({name: "SHARING_NODE_REPO_TRANS_BLOCK_STAGE"})
export class SharingNodeRepoTransBlockStage {

	@Id()
	@Column({name: "SHARING_NODE_ID"})
	sharingNodeId: SharingNodeId;

	@Id()
	@Column({name: "REPOSITORY_TRANSACTION_BLOCK_ID"})
	@DbNumber()
	repositoryTransactionBlockId: TmRepositoryTransactionBlockId;

	@Column({name: "SYNC_STATUS"})
	@DbNumber()
	syncStatus: SharingNodeRepoTransBlockSyncStatus;

}