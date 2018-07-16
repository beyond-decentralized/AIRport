import { IActorApplication } from "../../generated/infrastructure/qactorapplication";
import { IRepositoryApplication } from "../../generated/repository/qrepositoryapplication";
export declare type ApplicationId = number;
export declare type ApplicationHost = string;
export declare type ApplicationPort = number;
export declare class Application {
    id: ApplicationId;
    host: ApplicationHost;
    port: ApplicationPort;
    actorApplications: IActorApplication[];
    repositoryApplications: IRepositoryApplication[];
}
