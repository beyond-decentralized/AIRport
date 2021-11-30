import { RepositoryTransactionHistory } from "@airport/holding-pattern";

export interface MessageToTM {
    syncTimestamp: number
    history: RepositoryTransactionHistory
}
