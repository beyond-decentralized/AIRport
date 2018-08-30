import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                                      from "@airport/air-control";
import {
	CascadeType
}                                      from "@airport/ground-control";
import {IRepositoryTransactionHistory} from "../../generated/history/qrepositorytransactionhistory";
import {IActor,}                       from "../../generated/infrastructure/qactor";
import {IRepository,}                  from "../../generated/repository/qrepository";
import {IRepositoryActor,}             from "../../generated/repository/qrepositoryactor";
import {IRepositoryApplication,}       from "../../generated/repository/qrepositoryapplication";
import {SyncPriority}                  from "./SyncPrority";

/**
 * Created by Papa on 2/9/2017.
 */

export type RepositoryId = number;
export type RepositoryOrderedId = number;
export type RepositoryRandomId = number;
export type RepositoryName = string;
export type RepositoryUrl = string;

@Entity()
@Table({
	name: "REPOSITORY"
})
export class Repository
	implements IRepository {

	@Column({name: "ID"})
	@GeneratedValue()
	@Id()
	@DbNumber()
	id: RepositoryId;

	@ManyToOne()
	@JoinColumn({name: "OWNER_ACTOR_ID", referencedColumnName: "ID",
		nullable: false})
	ownerActor: IActor;

	@Column({name: "ORDERED_ID", nullable: false})
	@DbNumber()
	orderedId: RepositoryOrderedId;

	@Column({name: "RANDOM_ID", nullable: false})
	@DbNumber()
	randomId: RepositoryRandomId;

	@Column({name: "NAME", nullable: false})
	@DbString()
	name: RepositoryName;

	@Column({name: "REPOSITORY_URL", nullable: false})
	@DbString()
	url: RepositoryUrl;

	// @Column({name: "DISTRIBUTION_STRATEGY"})
	// @DbNumber()
	// distributionStrategy: DistributionStrategy;
	//
	// @Column({name: "REPOSITORY_PLATFORM"})
	// @DbNumber()
	// platform: PlatformType;

	@Column({name: "PLATFORM_CONFIG", nullable: false})
	platformConfig: string;

	/*
	@ManyToOne()
	@JoinColumns([
		{name: "LAST_SYNCED_TRANSACTION_ID", referencedColumnName: "TRANSACTION_ID"},
		{name: "LAST_SYNCED_REPO_TRANSACTION_ID", referencedColumnName: "INDEX"},
		{name: "ID", referencedColumnName: "REPOSITORY_ID"}
	])
	lastSyncedTransaction: IRepositoryTransactionHistory;
*/

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'repository'})
	repositoryActors: IRepositoryActor[] = [];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'repository'})
	repositoryApplications: IRepositoryApplication[] = [];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'repository'})
	repositoryTransactionHistory: IRepositoryTransactionHistory[] = [];

	@Column({name: "SYNC_PRIORITY", nullable: false})
	@DbNumber()
	syncPriority: SyncPriority;

}