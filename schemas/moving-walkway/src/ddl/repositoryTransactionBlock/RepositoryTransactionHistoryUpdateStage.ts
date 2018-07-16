import {
	Column,
	Entity,
	Id,
	Table
} from "@airport/air-control";
import {
	RepositoryTransactionHistoryBlockId,
	RepositoryTransactionHistoryId
} from "@airport/holding-pattern";

@Entity()
@Table({name: "REPOSITORY_TRANSACTION_HISTORY_UPDATE_STAGE"})
export class RepositoryTransactionHistoryUpdateStage {

	@Id()
	@Column({name: "REPOSITORY_TRANSACTION_HISTORY_ID"})
	repositoryTransactionHistoryId: RepositoryTransactionHistoryId;

	@Column({name: "BLOCK_ID"})
	blockId: RepositoryTransactionHistoryBlockId;

}