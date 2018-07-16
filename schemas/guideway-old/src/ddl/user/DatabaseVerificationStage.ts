import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
} from "@airport/air-control";
import { Shard } from "@airport/airport-code";
import { ServerId } from "../server/Server";
import { Database, DatabaseHash } from "./Database";

export type DatabaseVerificationStageRunId = number;
export type DatabaseVerificationStageServerId = ServerId;

/**
 * Temporary staging table that verifies DatabaseRepository records.
 */
@Entity()
@Table({name: "DATABASE_VERIFICATION_STAGE"})
export class DatabaseVerificationStage {

	@Id()
	@Column({name: "SERVER_ID"})
	@DbNumber()
	serverId: DatabaseVerificationStageServerId;

	@Id()
	@Column({name: "VERIFICATION_RUN_ID"})
	@DbNumber()
	runId: DatabaseVerificationStageRunId;

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

}