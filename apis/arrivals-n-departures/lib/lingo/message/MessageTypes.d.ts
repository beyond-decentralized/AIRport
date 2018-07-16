export declare type TmToAgtProtocolVersion = 0;
export declare enum MessageToTMContentType {
    REPOSITORY_TRANSACTION_BLOCK = 0,
    SYNC_NOTIFICATION = 1,
    ALIVE_ACK = 2,
}
export declare enum RepoTransBlockSyncOutcomeType {
    SYNC_FROM_TM_ALREADY_SYNCED = 0,
    SYNC_FROM_TM_SUCCESSFUL = 1,
    SYNC_FROM_TM_DENIED_DATABASE_NOT_FOUND = 2,
    SYNC_FROM_TM_DENIED_REPOSITORY_NOT_FOUND = 3,
    SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION = 4,
    SYNC_TO_TM_SUCCESSFUL = 5,
    SYNC_TO_TM_READY_FOR_PROCESSING = 6,
    SYNC_TO_TM_NEEDS_SCHEMA_CHANGES = 7,
    SYNC_TO_TM_NEEDS_ADDITIONAL_DATA = 8,
    SYNC_TO_TM_NEEDS_DATA_UPGRADES = 9,
}
export declare enum MessageFromTMContentType {
    CONNECTION_REQUEST = 0,
    SYNC_VERIFICATIONS = 1,
    DATA_TRANSFER = 2,
}
