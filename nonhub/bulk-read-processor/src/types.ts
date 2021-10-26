import {
    BatchUuid,
    RepositoryId,
    SinceTime
} from "@airport/nonhub-types"

export type Data = string
export interface TransactionLog {
    data: Data
    repository_id: string
    timestamp: Date
}

export type TransactionLogEntry = string

export type RequestMap = Map<RepositoryId, SinceTime>
export type ResultToResponseMap = Map<BatchUuid, {
    reply: any
    repositoryIdSet: Set<RepositoryId>
}>
// export type RepositoryToBatchMap = Map<RepositoryId, Set<BatchUuid>>
export type ResultMap = Map<RepositoryId, TransactionLogEntry[]>
