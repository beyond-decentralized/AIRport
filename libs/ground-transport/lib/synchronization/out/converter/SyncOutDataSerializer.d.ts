import { IApplicationVersion } from "@airport/airspace";
import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Application_LocalId } from "@airport/ground-control";
import { Actor_LocalId, IActorDao, IRecordHistory, IRepository, IRepositoryDao, IRepositoryTransactionHistory, Repository_LocalId } from "@airport/holding-pattern/lib/to_be_generated/runtime-index";
import { User_LocalId } from "@airport/travel-document-checkpoint";
export interface ISyncOutDataSerializer {
    serialize(repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<{
        historiesToSend: IRepositoryTransactionHistory[];
        messages: RepositorySynchronizationMessage[];
    }>;
}
export interface IWithId {
    _localId: number;
}
export interface IWithRecordHistory extends IWithId {
    recordHistory: IRecordHistory;
}
export interface IWithIndex {
    index: number;
}
export declare const WITH_ID: IWithId;
export declare const WITH_RECORD_HISTORY: IWithRecordHistory;
export declare const WITH_INDEX: IWithIndex;
export interface InMessageLookupStructures {
    actorInMessageIndexesById: Map<Actor_LocalId, number>;
    applicationVersionInMessageIndexesById: Map<Actor_LocalId, number>;
    applicationVersions: IApplicationVersion[];
    lastInMessageActorIndex: number;
    lastInMessageApplicationVersionIndex: number;
    lastInMessageRepositoryIndex: number;
    messageRepository: IRepository;
    repositoryInMessageIndexesById: Map<Repository_LocalId, number>;
}
export interface InMessageApplicationLookup {
    inMessageIndexesById: Map<Application_LocalId, number>;
    lastInMessageIndex: number;
}
export interface InMessageUserLookup {
    inMessageIndexesById: Map<User_LocalId, number>;
    lastInMessageIndex: number;
}
export declare class SyncOutDataSerializer implements ISyncOutDataSerializer {
    actorDao: IActorDao;
    repositoryDao: IRepositoryDao;
    serialize(repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<{
        historiesToSend: IRepositoryTransactionHistory[];
        messages: RepositorySynchronizationMessage[];
    }>;
    serializeMessage(repositoryTransactionHistory: IRepositoryTransactionHistory): Promise<RepositorySynchronizationMessage>;
    private serializeActorsUsersAndTerminals;
    private serializeTerminals;
    private serializeUsers;
    private addUserToMessage;
    private getUserInMessageIndex;
    private serializeRepositories;
    private serializeApplicationsAndVersions;
    private serializeApplication;
    private serializeRepositoryTransactionHistory;
    private serializeHistoryRepository;
    private serializeOperationHistory;
    private serializeRecordHistory;
    private getActorInMessageIndex;
    private getActorInMessageIndexById;
    private serializeNewValue;
    private serializeOldValue;
    private serializeValue;
    private getSerializedRepositoryId;
    private serializeRepository;
}
//# sourceMappingURL=SyncOutDataSerializer.d.ts.map