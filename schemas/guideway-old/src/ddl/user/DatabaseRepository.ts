import {
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/air-control";
import { Shard } from "@airport/airport-code";
import { Repository } from "../repository/Repository";
import { ShardedRecord } from "../ShardedRecord";
import { Database } from "./Database";
import { DatabaseRepositoryVerificationStage } from "./DatabaseRepositoryVerificationStage";

/**
 * Lives on the same shard as the Database and records all Repositories that
 * a given database subscribes too.
 */
@Entity()
@Table({name: "DATABASE_REPOSITORIES"})
export class DatabaseRepository extends ShardedRecord {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "DATABASE_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "DATABASE_ID", referencedColumnName: 'ID'}
	])
	database: Database;

	/**
	 * The shard on which a subscribed too repository lives on.
	 */
	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_SHARD_ID", referencedColumnName: "SHARD_ID"})
	repositoryShard: Shard;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_SHARD_ID", referencedColumnName: "SHARD_ID"},
		{name: "REPOSITORY_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "REPOSITORY_ID", referencedColumnName: 'ID'}
	])
	repository: Repository;

}