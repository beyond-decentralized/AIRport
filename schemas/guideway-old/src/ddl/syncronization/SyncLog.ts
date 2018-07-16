import { Column, Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/air-control";
import { ShardedRecord } from "../ShardedRecord";
import { DatabaseSyncLog, DatabaseSyncLogId } from "./DatabaseSyncLog";
import { SyncRecord, SyncRecordAddDatetime, SyncRecordId } from "./SyncRecord";


export type SyncLogSyncRecordAddDatetime = SyncRecordAddDatetime;

export type InsertSyncLog = [
	DatabaseSyncLogId, SyncRecordId, SyncLogSyncRecordAddDatetime
	];

@Entity()
@Table({name: "SYNC_LOG"})
// TODO: partition by add SyncRecordAddDatetime
export class SyncLog extends ShardedRecord {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "DATABASE_SYNC_LOG_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "DATABASE_SYNC_LOG_ID", referencedColumnName: 'ID'}
	])
	databaseSyncLog: DatabaseSyncLog;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "SYNC_RECORD_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "SYNC_RECORD_ID", referencedColumnName: 'ID'}
	])
	syncRecord: SyncRecord;

	// Needed for partitioning by date
	@Column({name: "SYNC_RECORD_ADD_DATETIME"})
	syncRecordAddDatetime: SyncLogSyncRecordAddDatetime;

}