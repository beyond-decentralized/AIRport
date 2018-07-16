import {Column, Entity, Id, JoinColumn, ManyToOne, Table} from "@airport/air-control";
import {AgtSharingMessage}                                from "./AgtSharingMessage";
import {AgtRepositoryTransactionBlock}                    from "./AgtRepositoryTransactionBlock";

/**
 * A record of syncing a particular record to a particular terminal.
 */
@Entity()
@Table({name: "AGT_SYNC_LOG"})
// TODO: partition by add RepositoryTransactionBlockAddDatetime
export class SyncLog {

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: "AGT_SHARING_MESSAGE_ID", referencedColumnName: 'ID'}
	)
	sharingMessage: AgtSharingMessage;

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: "AGT_REPO_TRANS_BLOCK_ID", referencedColumnName: 'ID'}
	)
	repositoryTransactionBlock: AgtRepositoryTransactionBlock;

	// Needed for partitioning by date
	// @Column({name: "SYNC_RECORD_ADD_DATETIME"})
	// repositoryTransactionBlockAddDatetime: RepositoryTransactionBlockAddDatetime;

}