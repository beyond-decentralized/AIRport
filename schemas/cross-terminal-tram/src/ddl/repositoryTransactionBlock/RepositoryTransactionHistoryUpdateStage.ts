import {
	Column,
	DbNumber,
	Entity,
	Id,
	Table
} from '@airport/air-control'
import {
	RepositoryTransactionHistory_BlockId,
	RepositoryTransactionHistory_Id
} from "@airport/holding-pattern";

@Entity()
@Table({name: "REPOSITORY_TRANSACTION_HISTORY_UPDATE_STAGE"})
export class RepositoryTransactionHistoryUpdateStage {

	@Id()
	@Column({name: "REPOSITORY_TRANSACTION_HISTORY_ID"})
	@DbNumber()
	repositoryTransactionHistoryId: RepositoryTransactionHistory_Id;

	@Column({name: "BLOCK_ID"})
	@DbNumber()
	blockId: RepositoryTransactionHistory_BlockId;

}