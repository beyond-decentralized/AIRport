import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
} from '@airport/air-control'
import {
	CascadeType,
}                                               from "@airport/ground-control";
import {IOperationHistory}                     from "../../generated/history/qoperationhistory";
import {IRepositoryTransactionHistory}         from "../../generated/history/qrepositorytransactionhistory";
import {ITransactionHistory}                    from "../../generated/history/qtransactionhistory";
import {IActor}                                from "../../generated/infrastructure/qactor";
import {IRepository}                           from "../../generated/repository/qrepository";
import {RepositoryTransactionType}              from "./RepositoryTransactionType";
import {RepoTransHistoryChangedRepositoryActor} from "./RepoTransHistoryChangedRepositoryActor";

/**
 * Created by Papa on 9/15/2016.
 */

export type RepositoryTransactionHistoryId = number;
export type RepositoryTransactionHistoryRemoteId = number;
export type RepositoryTransactionHistorySaveTimestamp = Date;
export type RepositoryTransactionHistoryBlockId = number;

@Entity()
@Table({name: "REPOSITORY_TRANSACTION_HISTORY"})
export class RepositoryTransactionHistory
	implements IRepositoryTransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({allocationSize: 200})
	id: RepositoryTransactionHistoryId;

	@Column({name: "REMOTE_ID", nullable: false})
	remoteId: RepositoryTransactionHistoryRemoteId;

	@ManyToOne()
	@JoinColumn({name: "TRANSACTION_HISTORY_ID",
		referencedColumnName: "ID", nullable: false})
	transactionHistory: ITransactionHistory;

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID",
		referencedColumnName: "ID", nullable: false})
	repository: IRepository;

	@OneToMany({mappedBy: "repositoryTransactionHistory"})
	changedRepositoryActors: RepoTransHistoryChangedRepositoryActor[];

	@ManyToOne()
	@JoinColumn({name: "ACTOR_ID", referencedColumnName: "ID",
		nullable: false})
	actor: IActor;

	@Column({name: "SAVE_TIMESTAMP", nullable: false})
	saveTimestamp: RepositoryTransactionHistorySaveTimestamp;

	@Column({name: "REPOSITORY_TRANSACTION_TYPE", nullable: false})
	@DbNumber()
	repositoryTransactionType: RepositoryTransactionType = RepositoryTransactionType.LOCAL;

	@Column({name: "REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID",
		nullable: false})
	blockId: RepositoryTransactionHistoryBlockId;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'repositoryTransactionHistory'})
	operationHistory: IOperationHistory[] = [];


	constructor(
		data?: IRepositoryTransactionHistory
	) {
		if (!data) {
			return;
		}

		this.id = data.id;
		this.transactionHistory = data.transactionHistory;
		this.repository = data.repository;
		this.actor = data.actor;
		this.saveTimestamp = data.saveTimestamp;
		this.operationHistory = data.operationHistory;
	}


}