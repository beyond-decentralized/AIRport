export type RepositoryId = string
export type SinceTime = number
export type SearchResults = string
export type TransactionLogs = string
export type UserResponse = string
export type BatchUuid = string

export enum ServerState {
    RUNNING = 'RUNNING',
    SHUTTING_DOWN_REQUESTS = 'SHUTTING_DOWN_REQUESTS',
    SHUTTING_DOWN_SERVER = 'SHUTTING_DOWN_SERVER',
}

export enum ServerError {
    DATABASE = 'DATABASE',
    INVALID = 'INVALID',
    SHUTDOWN = 'SHUTDOWN'
}
