import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/air-control";
import {Shard, ShardId} from "@airport/airport-code";
import {ShardedRecord} from "../ShardedRecord";
import {DatabaseSyncLog} from "../syncronization/DatabaseSyncLog";
import {DatabaseRepository} from "./DatabaseRepository";
import {DatabaseRepositoryVerificationStage} from "./DatabaseRepositoryVerificationStage";
import {User} from "./User";
import {DatabaseVerificationStage} from "./DatabaseVerificationStage";

export type DatabaseId = number;
export type DatabaseHash = string;
export type DatabaseLastPollConnectionDatetime = number;
export type DatabaseLastSeeConnectionDatetime = number;
export type DatabaseOriginalShardId = ShardId;

/**
 * Represents the client-side database.  For a given shard, this table will contain all databases
 * that are currently on that shard and all databases that were at some point on that shard.
 * The CURRENT_SHARD_ID is used to keep track of on which shard a given database is now.
 *
 * NOTE: SHARDS is a reference table that is loaded (had has the same data) on all shards.
 */
@Entity()
@Table({name: "DATABASES"})
export class Database extends ShardedRecord {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: DatabaseId;

	@DbString()
	hash: DatabaseHash;

	@Column({name: "LAST_POLL_CONNECTION_DATETIME"})
	@DbNumber()
	lastPollConnectionDatetime: DatabaseLastPollConnectionDatetime;

	@Column({name: "LAST_SSE_CONNECTION_DATETIME"})
	@DbNumber()
	lastSseConnectionDatetime: DatabaseLastSeeConnectionDatetime;

	@ManyToOne()
	@JoinColumn({name: "CURRENT_SHARD_ID", referencedColumnName: "SHARD_ID"})
	currentShard: Shard;

	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "ORIGINAL_SHARD_ID"},
		{name: "USER_ID", referencedColumnName: 'ID'}
	])
	user: User;

	@OneToMany()
	databaseRepositories: DatabaseRepository[];

	@OneToMany()
	databaseSyncLogs: DatabaseSyncLog[];

	@OneToMany()
	verificationStage: DatabaseVerificationStage[];

	@OneToMany()
	repositoryVerificationStage: DatabaseRepositoryVerificationStage[];

}