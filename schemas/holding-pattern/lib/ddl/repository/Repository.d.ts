import { IRepositoryTransactionHistory } from "../../generated/history/qrepositorytransactionhistory";
import { IActor } from "../../generated/infrastructure/qactor";
import { IRepository } from "../../generated/repository/qrepository";
import { IRepositoryActor } from "../../generated/repository/qrepositoryactor";
import { IRepositoryApplication } from "../../generated/repository/qrepositoryapplication";
import { SyncPriority } from "./SyncPrority";
/**
 * Created by Papa on 2/9/2017.
 */
export declare type RepositoryId = number;
export declare type RepositoryOrderedId = number;
export declare type RepositoryRandomId = number;
export declare type RepositoryName = string;
export declare type RepositoryUrl = string;
export declare class Repository implements IRepository {
    id: RepositoryId;
    ownerActor: IActor;
    orderedId: RepositoryOrderedId;
    randomId: RepositoryRandomId;
    name: RepositoryName;
    url: RepositoryUrl;
    platformConfig: string;
    repositoryActors: IRepositoryActor[];
    repositoryApplications: IRepositoryApplication[];
    repositoryTransactionHistory: IRepositoryTransactionHistory[];
    syncPriority: SyncPriority;
}
