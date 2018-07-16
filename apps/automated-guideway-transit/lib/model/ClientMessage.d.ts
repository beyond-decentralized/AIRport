import { DatabaseHash, DatabaseId, DatabaseSyncLogId, RepositoryId, SyncRecordTransactionData } from "@airport/guideway";
import { ConnectionDataCallback } from "./Constaints";
export declare type DatabaseInfo = [DatabaseId, DatabaseHash];
export declare type DatabaseSyncAck = DatabaseSyncLogId;
export declare type TMTransactionDataId = number;
export declare type RepositoryUpdateRequest = [RepositoryId, TMTransactionDataId, SyncRecordTransactionData];
export declare type DatabaseAdditionsToRepositories = null;
export declare type DetectedSyncDiscrepancies = null;
export declare type ClientInMessage = [ClientInOperation, DatabaseInfo, RepositoryUpdateRequest[], DatabaseSyncAck[]];
export declare enum ClientInOperation {
    CONNECT = 0,
    ADD_DATA = 1,
}
export declare type VerifiedClientPollMessages = [Set<DatabaseId>, Set<RepositoryId>, Set<DatabaseSyncLogId>, Map<DatabaseId, RecentConnectionClaim>];
export declare type VerifiedClientSseMessages = [DatabaseId[], Map<DatabaseId, ConnectionDataCallback>];
export declare type LoginClaimReceptionTime = number;
export declare type RecentConnectionClaim = [ClientInMessage, ConnectionDataCallback, LoginClaimReceptionTime];
