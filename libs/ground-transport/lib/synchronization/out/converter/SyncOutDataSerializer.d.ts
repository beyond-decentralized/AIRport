import { IApplicationVersion } from "@airport/airspace";
import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Application_Id } from "@airport/ground-control";
import { Actor_Id, IActorDao, IRecordHistory, IRepository, IRepositoryDao, IRepositoryTransactionHistory, Repository_Id } from "@airport/holding-pattern";
import { User_Id } from "@airport/travel-document-checkpoint-runtime";
export interface ISyncOutDataSerializer {
    serialize(repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<{
        historiesToSend: IRepositoryTransactionHistory[];
        messages: RepositorySynchronizationMessage[];
    }>;
}
export interface IWithId {
    id: number;
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
    actorInMessageIndexesById: Map<Actor_Id, number>;
    applicationVersionInMessageIndexesById: Map<Actor_Id, number>;
    applicationVersions: IApplicationVersion[];
    lastInMessageActorIndex: number;
    lastInMessageApplicationVersionIndex: number;
    lastInMessageRepositoryIndex: number;
    messageRepository: IRepository;
    repositoryInMessageIndexesById: Map<Repository_Id, number>;
}
export interface InMessageApplicationLookup {
    inMessageIndexesById: Map<Application_Id, number>;
    lastInMessageIndex: number;
}
export interface InMessageUserLookup {
    inMessageIndexesById: Map<User_Id, number>;
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