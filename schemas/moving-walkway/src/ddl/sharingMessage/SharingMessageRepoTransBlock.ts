import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                                   from "@airport/air-control";
import {RepositoryTransactionBlock} from "../repositoryTransactionBlock/RepositoryTransactionBlock";
import {SharingMessage}             from "./SharingMessage";

/**
 * A given Repo Trans block can be send via multiple messages (to multiple AGTs).
 */
@Entity()
@Table({name: "SHARING_MESSAGE_REPO_TRANS_BLOCKS"})
export class SharingMessageRepoTransBlock {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SHARING_MESSAGE_ID", referencedColumnName: "ID"
	})
	sharingMessage: SharingMessage;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID"
	})
	repositoryTransactionBlock: RepositoryTransactionBlock;

}