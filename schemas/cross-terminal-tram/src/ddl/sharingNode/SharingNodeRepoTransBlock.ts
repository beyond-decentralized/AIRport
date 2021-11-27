import {
	Column,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/air-control";
import { DbString } from "@airport/air-control";
import {
	SharingNodeRepoTransBlockSyncStatus
} from "@airport/arrivals-n-departures";
import { RepositoryTransactionBlock } from "../repositoryTransactionBlock/RepositoryTransactionBlock";
import { SharingNode } from "./SharingNode";

/**
 * Every RepositoryTransactionBlock has an Id at every AGT that syncs
 * it.  This record stores that Id.
 */
@Entity()
@Table({ name: "SHARING_NODE_REPO_TRANS_BLOCKS" })
export class SharingNodeRepoTransBlock {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SHARING_NODE_ID", referencedColumnName: "ID"
	})
	sharingNode: SharingNode;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID"
	})
	repositoryTransactionBlock: RepositoryTransactionBlock;

	// @Column({name: "AGT_SYNC_RECORD_ID"})
	// agtSyncRecordId: AgtSyncRecordId;

	// @Column({name: "SYNC_TIMESTAMP"})
	// @DbDate()
	// syncTimestamp: SharingMessageSyncTimestamp;
	//
	// @Column({name: "SYNC_OUTCOME_TYPE"})
	// @DbString()
	// syncOutcomeType: SharingNodeRepoTransBlockSyncOutcomeType;

	// @DbString()
	// origin: DataOrigin;

	@DbString()
	@Column({ name: "SYNC_STATUS" })
	syncStatus: SharingNodeRepoTransBlockSyncStatus;

}