import {
	Column,
	DbDate,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumns,
	ManyToOne,
	Table
} from "@airport/air-control";
import { IServer } from "../../generated/server/qserver";
import { ShardedRecord } from "../ShardedRecord";
import { SyncType } from "../syncronization/SyncType";

export type ServerSyncLogId = number;
export type ServerSyncLogStartDatetime = Date;
export type ServerSyncLogEndDatetime = Date;
export type ServerSyncLogNumberOfConnections = number;
export type ServerSyncLogNumberOfRecords = number;
export type ServerSyncLogDataCharsTotal = number;

@Entity()
@Table({name: "SERVER_SYNC_LOG"})
export class ServerSyncLog extends ShardedRecord {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: ServerSyncLogId;

	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "ORIGINAL_SHARD_ID"},
		{name: "SERVER_ID", referencedColumnName: "ID"}
	])
	server: IServer;

	@DbNumber()
	type: SyncType;

	@Column({name: "START_DATETIME"})
	@DbDate()
	startDatetime: ServerSyncLogStartDatetime;

	@Column({name: "PROCESSED_DATETIME"})
	@DbDate()
	endDatetime: ServerSyncLogEndDatetime;

	@Column({name: "NUMBER_OF_CONNECTIONS"})
	@DbNumber()
	numberOfConnections: ServerSyncLogNumberOfConnections;

	@Column({name: "NUMBER_OF_SYNC_RECORDS"})
	@DbNumber()
	numberOfRecords: ServerSyncLogNumberOfRecords;

	@Column({name: "DATA_CHARS_TOTAL"})
	@DbNumber()
	dataCharsTotal: ServerSyncLogDataCharsTotal;

}