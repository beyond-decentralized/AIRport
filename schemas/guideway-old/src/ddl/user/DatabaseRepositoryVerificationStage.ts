import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
} from "@airport/air-control";
import {Shard} from "@airport/airport-code";
import {ServerId} from "../server/Server";
import {Database} from "./Database";
import {DatabaseRepository} from "./DatabaseRepository";
import {Repository} from "../../";
import {RepositoryDatabase} from "../repository/RepositoryDatabase";

export type DatabaseRepositoryVerificationStageRunId = number;
export type DatabaseRepositoryVerificationStageServerId = ServerId;

/**
 * Temporary staging table that verifies DatabaseRepository records.
 */
@Entity()
@Table({name: "DATABASE_REPOSITORY_VERIFICATION_STAGE"})
export class DatabaseRepositoryVerificationStage {

	@Id()
	@Column({name: "SERVER_ID"})
	@DbNumber()
	serverId: DatabaseRepositoryVerificationStageServerId;

	@Id()
	@Column({name: "VERIFICATION_RUN_ID"})
	@DbNumber()
	runId: DatabaseRepositoryVerificationStageRunId;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "SHARD_ID"})
		// The shard to which this verification stage belongs
	shard: Shard;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "DATABASE_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "DATABASE_ID", referencedColumnName: "ID"}
	])
	database: Database;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "REPOSITORY_ID", referencedColumnName: "ID"}
	])
	repository: Repository;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "DATABASE_ORIGINAL_SHARD_ID"},
		{name: "DATABASE_ID"},
		{name: "REPOSITORY_ORIGINAL_SHARD_ID"},
		{name: "REPOSITORY_ID"}
	])
	databaseRepository: DatabaseRepository;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_ORIGINAL_SHARD_ID"},
		{name: "REPOSITORY_ID"},
		{name: "DATABASE_ORIGINAL_SHARD_ID"},
		{name: "DATABASE_ID"},
	])
	repositoryDatabase: RepositoryDatabase;

}