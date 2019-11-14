import { RepositoryApplication } from '../repository/RepositoryApplication';
import { ActorApplication } from './ActorApplication';
export declare type ApplicationId = number;
export declare type ApplicationHost = string;
export declare type ApplicationPort = number;
export declare class Application {
    id: ApplicationId;
    host: ApplicationHost;
    port: ApplicationPort;
    actorApplications: ActorApplication[];
    repositoryApplications: RepositoryApplication[];
}
