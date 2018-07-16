import {
	Column,
	DbBoolean,
	DbNumber,
	Entity,
	Id,
	JoinColumns,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/air-control";
import {IServer} from "../../generated/server/qserver";
import {ShardedRecord} from "../ShardedRecord";
import {Repository} from "../repository/Repository";
import {Database} from "../user/Database";
import {User} from "../user/User";
import {ArchivingStatus} from "./ArchivingStatus";
import {SyncLog} from "./SyncLog";
import {ShardId} from "@airport/airport-code";
import {ServerId} from "../../";

export type SyncRecordArchivingServerId = ServerId;
export type SyncRecordArchivingStatus = ArchivingStatus;
export type SyncRecordId = number;
export type SyncRecordAddDatetime = number;
export type SyncRecordIsRealtime = boolean;
export type SyncRecordTransactionData = string;
export type SyncRecordShardId = ShardId;
export type SyncRecordOriginalShardId = ShardId;

@Entity()
@Table({name: "SYNC_RECORDS"})
// TODO: partition by add date for efficient dropping of records
export class SyncRecord extends ShardedRecord {

	@Id()
	id: SyncRecordId;

	// NOTE: this would be a cross-shard join
	// Useful in case we need LEFT JOINS to find out which repositories are no different
	// Shards
	// NOTE: There must be no foreign key between Repository and SyncRecord
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_CURRENT_SHARD_ID", referencedColumnName: "SHARD_ID"},
		{name: "REPOSITORY_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "REPOSITORY_ID", referencedColumnName: 'ID'}
	])
	repository: Repository;

	@ManyToOne()
	@JoinColumns([
		// SyncRecord is guaranteed to be on the same shard as the Database
		{name: "SHARD_ID"},
		{name: "DATABASE_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "DATABASE_ID", referencedColumnName: 'ID'}
	])
	database: Database;

	@ManyToOne()
	@JoinColumns([
		// SyncRecord is guaranteed to be on the same shard as the User
		// TODO: think though scenarios where a database may not be on the same shard as it's user
		// ?Should that be possible?
		{name: "SHARD_ID"},
		{name: "USER_ORIGINAL_SHARD_ID", referencedColumnName: "ORIGINAL_SHARD_ID"},
		{name: "USER_ID", referencedColumnName: 'ID'}
	])
	user: User;

	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "ARCHIVING_SERVER_ID", referencedColumnName: "ID"}
	])
	archivingServer: IServer;

	@Column({name: "ARCHIVING_STATUS"})
	@DbNumber()
	archivingStatus: SyncRecordArchivingStatus;

	@OneToMany()
	syncLogs: SyncLog[];

	@Column({name: "ADD_DATETIME"})
	addDatetime: SyncRecordAddDatetime;

	@Column({name: "IS_REALTIME"})
	@DbBoolean()
	isRealtime: SyncRecordIsRealtime;

	@Column({name: "TRANSACTION_DATA"})
	transactionData: SyncRecordTransactionData;

}