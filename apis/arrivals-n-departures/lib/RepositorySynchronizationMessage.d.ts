import { IActor, IRepository, IRepositoryTransactionHistory } from "@airport/holding-pattern";
import { ITerminal, IUser } from "@airport/travel-document-checkpoint";
import { IApplication, IApplicationVersion } from "@airport/airspace";
export interface RepositorySynchronizationMessage {
    actors: IActor[];
    applicationVersions: IApplicationVersion[];
    applications: IApplication[];
    history: IRepositoryTransactionHistory;
    referencedRepositories: IRepository[];
    syncTimestamp?: number;
    users: IUser[];
    terminals: ITerminal[];
}
export interface RepositorySynchronizationWriteRequest {
    messages: RepositorySynchronizationMessage[];
    repositoryUuId: string;
}
export interface RepositorySynchronizationWriteResponse {
    syncTimestamp: number;
}
export interface RepositorySynchronizationReadRequest {
    repositoryUuId: string;
    syncTimestamp?: number;
}
export interface RepositorySynchronizationReadResponse {
    messages: RepositorySynchronizationMessage[];
    repositoryUuId: string;
    syncTimestamp: number;
}
//# sourceMappingURL=RepositorySynchronizationMessage.d.ts.map