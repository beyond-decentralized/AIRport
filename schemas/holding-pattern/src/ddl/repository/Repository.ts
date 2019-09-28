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
}                     from "@airport/air-control";
import {
	CascadeType
}                     from "@airport/ground-control";
import {
	Actor
} from '../infrastructure/Actor'
import {
	RepositoryActor
} from '../repository/RepositoryActor'
import {
	RepositoryApplication
} from '../repository/RepositoryApplication'
import {
	RepositoryTransactionHistory
} from '../history/RepositoryTransactionHistory'
import {SyncPriority} from "./SyncPrority";

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
export class Repository {

	@Column({name: "ID"})
	@GeneratedValue()
	@Id()
	@DbNumber()
	id: RepositoryId;

	@ManyToOne()
	@JoinColumn({name: "OWNER_ACTOR_ID", referencedColumnName: "ID",
		nullable: false})
	ownerActor: Actor;

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
	repositoryActors: RepositoryActor[] = [];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'repository'})
	repositoryApplications: RepositoryApplication[] = [];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'repository'})
	repositoryTransactionHistory: RepositoryTransactionHistory[] = [];

	@Column({name: "SYNC_PRIORITY", nullable: false})
	@DbNumber()
	syncPriority: SyncPriority;

}