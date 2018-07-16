import {
	Entity,
	GeneratedValue,
	Id
}                                             from "@airport/air-control";
import {
	Column,
	DbNumber,
	JoinColumn,
	ManyToOne
}                                             from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {Table}                                from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
import {IRepositoryTransactionHistory}        from "../../generated/history/qrepositorytransactionhistory";
import {IActor}                               from "../../generated/infrastructure/qactor";
import {IRepository}                          from "../../generated/repository/qrepository";
import {RepoTransHistoryChangedReferenceType} from "./RepoTransHistoryChangedReferenceType";

export type RepoTransHistoryChangedRepositoryActorId = number;

@Entity()
@Table({name: "REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS"})
export class RepoTransHistoryChangedRepositoryActor {

	@Id()
	@GeneratedValue()
	id: RepoTransHistoryChangedRepositoryActorId;

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_TRANSACTION_HISTORY_ID", referencedColumnName: "ID"})
	repositoryTransactionHistory: IRepositoryTransactionHistory;

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: IRepository;

	@ManyToOne()
	@JoinColumn({name: "ACTOR_ID", referencedColumnName: "ID"})
	actor: IActor;

	@Column({name: "REFERENCE_TYPE"})
	@DbNumber()
	referenceType: RepoTransHistoryChangedReferenceType;

}