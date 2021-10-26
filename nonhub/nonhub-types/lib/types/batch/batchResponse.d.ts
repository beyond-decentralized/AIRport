import { BatchUuid, ServerError, TransactionLogs, UserResponse } from "../common";
export interface BatchResponse<T> {
    batchUuid: BatchUuid;
    error?: ServerError;
    received: boolean;
    results?: {
        [uuid: string]: T;
    };
}
export interface BatchReadResponse extends BatchResponse<TransactionLogs> {
}
export interface BatchUserResponse extends BatchResponse<UserResponse> {
}
export interface BatchWriteResponse extends BatchResponse<boolean> {
}
//# sourceMappingURL=batchResponse.d.ts.map