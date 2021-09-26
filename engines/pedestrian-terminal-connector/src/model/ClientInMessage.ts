import {
	DatabaseHash,
	DatabaseId,
	DatabaseKey,
	DatabaseOriginalShardId,
	DatabaseSyncLogId,
	DatabaseSyncLogOriginalShardId,
	InsertDatabaseSyncLog,
	InsertDatabaseSyncLogVerificationStage,
	InsertSyncRecord,
	RepositoryId,
	RepositoryOriginalShardId,
	SyncRecordAddDatetime,
	SyncRecordTransactionData,
} from "@airport/guideway";
import {ConnectionDataCallback} from "./ClientOutMessage";
import {ShardId} from "@airport/airport-code";

export type DatabaseInfo = [DatabaseOriginalShardId, DatabaseId, DatabaseHash];
export type DatabaseSyncAck = [DatabaseSyncLogOriginalShardId, DatabaseSyncLogId];
export type RepositoryUpdateRequest = [RepositoryOriginalShardId, RepositoryId, SyncRecordTransactionData];
export type DatabaseAdditionsToRepositories = null; // FIXME: implement
export type DetectedSyncDiscrepancies = null; // FIXME: implement

export type ClientInMessage = [
	ClientInOperation,
	DatabaseInfo,
	RepositoryUpdateRequest[],
	DatabaseSyncAck[],
	DatabaseAdditionsToRepositories[],
	DetectedSyncDiscrepancies[]
	];

export enum ClientInOperation {
	CONNECT = 'CONNECT',
	ADD_DATA = 'ADD_DATA'
}

export type VerifiedClientPollMessages = [
	InsertDatabaseSyncLogVerificationStage[],
	Map<ShardId, InsertSyncRecord[]>,
	InsertDatabaseSyncLog[],
	Set<DatabaseKey>,
	Map<DatabaseKey, ConnectionDataCallback>,
	SyncRecordAddDatetime
	];

export type VerifiedClientSseMessages = [
	DatabaseId[],
	Map<DatabaseId, ConnectionDataCallback>
	];

export type LoginClaimReceptionTime = number;
export type PendingLoginClaim = [ClientInMessage, ConnectionDataCallback, LoginClaimReceptionTime];


