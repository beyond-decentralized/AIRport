import { IRepositoryTransactionHistory } from "../../generated/history/qrepositorytransactionhistory";
import { IActor } from "../../generated/infrastructure/qactor";
import { IRepository } from "../../generated/repository/qrepository";
import { RepoTransHistoryChangedReferenceType } from "./RepoTransHistoryChangedReferenceType";
export declare type RepoTransHistoryChangedRepositoryActorId = number;
export declare class RepoTransHistoryChangedRepositoryActor {
    id: RepoTransHistoryChangedRepositoryActorId;
    repositoryTransactionHistory: IRepositoryTransactionHistory;
    repository: IRepository;
    actor: IActor;
    referenceType: RepoTransHistoryChangedReferenceType;
}
