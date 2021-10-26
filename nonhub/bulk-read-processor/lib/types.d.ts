import { BatchUuid, RepositoryId, SinceTime } from "@airport/nonhub-types";
export declare type Data = string;
export interface TransactionLog {
    data: Data;
    repository_id: string;
    timestamp: Date;
}
export declare type TransactionLogEntry = string;
export declare type RequestMap = Map<RepositoryId, SinceTime>;
export declare type ResultToResponseMap = Map<BatchUuid, {
    reply: any;
    repositoryIdSet: Set<RepositoryId>;
}>;
export declare type ResultMap = Map<RepositoryId, TransactionLogEntry[]>;
//# sourceMappingURL=types.d.ts.map