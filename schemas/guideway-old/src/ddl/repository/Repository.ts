import {
	Column,
	DbDate,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/air-control";
import {ShardedRecord} from "../ShardedRecord";
import {SyncRecord} from "../syncronization/SyncRecord";
import {RepositoryDatabase} from "./RepositoryDatabase";
import {Shard, ShardId} from "@airport/airport-code";
import {DatabaseRepositoryVerificationStage} from "../user/DatabaseRepositoryVerificationStage";

export type RepositoryId = number
export type RepositoryLastUpdateDatetime = Date;
// Where does the repository reside currently
export type RepositoryCurrentShardId = ShardId;
export type RepositoryOriginalShardId = ShardId;
// The actual shard Id the reference record is in
export type RepositoryShardId = ShardId;

@Entity()
@Table({name: "REPOSITORIES"})
export class Repository extends ShardedRecord {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: RepositoryId;

	@Column({name: "LAST_UPDATE_DATETIME"})
	@DbDate()
	lastUpdateTime: RepositoryLastUpdateDatetime;

	/**
	 * Provided as a join to allow for LEFT JOIN queries to find
	 * repositories currently in the local shard
	 */
	@ManyToOne()
	@JoinColumn({name: "CURRENT_SHARD_ID", referencedColumnName: "SHARD_ID"})
	currentShard: Shard;

	@OneToMany()
	repositoryDatabases: RepositoryDatabase[];

	@OneToMany()
	syncRecords: SyncRecord[];

	@OneToMany()
	databaseVerificationStage: DatabaseRepositoryVerificationStage[];

}