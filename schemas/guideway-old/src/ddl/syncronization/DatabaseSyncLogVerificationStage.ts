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
import {Database} from "../user/Database";
import {DatabaseSyncLog} from "./DatabaseSyncLog";

export type DatabaseSyncLogVerificationStageRunId = number;
export type DatabaseSyncLogVerificationStageServerId = number;

/**
 * Temporary staging table that verifies database sync records.
 */
@Entity()
@Table({name: "DATABASE_SYNC_LOG_VERIFICATION_STAGE"})
export class DatabaseSyncLogVerificationStage {

	@Id()
	@Column({name: "SERVER_ID"})
	@DbNumber()
	serverId: DatabaseSyncLogVerificationStageServerId;

	@Id()
	@Column({name: "VERIFICATION_RUN_ID"})
	@DbNumber()
	runId: DatabaseSyncLogVerificationStageRunId;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "SHARD_ID"})
	// The shard to which this verification stage belongs
	shard: Shard;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "DATABASE_SYNC_LOG_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "DATABASE_SYNC_LOG_ID", referencedColumnName: "ID"}
	])
	databaseSyncLog: DatabaseSyncLog;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "DATABASE_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "DATABASE_ID", referencedColumnName: "ID"}
	])
	database: Database;

}