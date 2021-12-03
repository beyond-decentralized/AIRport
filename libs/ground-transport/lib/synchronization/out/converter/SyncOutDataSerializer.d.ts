import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Actor_Id, IRecordHistory, IRepositoryTransactionHistory, Repository_Id } from "@airport/holding-pattern";
export interface ISyncOutDataSerializer {
    serialize(repositoryTransactionHistories: IRepositoryTransactionHistory[]): RepositorySynchronizationMessage[];
}
export interface IWithId {
    id: number;
}
export interface IWithRecordHistory extends IWithId {
    recordHistory: IRecordHistory;
}
export declare const WITH_ID: IWithId;
export declare const WITH_RECORD_HISTORY: IWithRecordHistory;
export interface InMessageLookupStructures {
    actorIdsByInMessageIndex: Map<number, Actor_Id>;
    actorInMessageIndexesById: Map<Actor_Id, number>;
    lastInMessageActorIndex: number;
    lastInMessageRepositoryIndex: number;
    repositoryIdsByInMessageIndex: Map<number, Repository_Id>;
    repositoryInMessageIndexesById: Map<Repository_Id, number>;
}
export declare class SyncOutDataSerializer implements ISyncOutDataSerializer {
    serialize(repositoryTransactionHistories: IRepositoryTransactionHistory[]): RepositorySynchronizationMessage[];
    serializeMessage(repositoryTransactionHistory: IRepositoryTransactionHistory, message: RepositorySynchronizationMessage): void;
    private serializeNewValue;
    private serializeOldValue;
    private serializeValue;
    private serializeRepository;
}
//# sourceMappingURL=SyncOutDataSerializer.d.ts.map