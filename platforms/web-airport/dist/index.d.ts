import { Application as Application$1 } from '@airport/airspace/lib/to_be_generated/runtime-index';
import { Repository as Repository$1 } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IUserAccountInfo as IUserAccountInfo$1 } from '@airport/terminal-map';

declare class AIRportApi {
    getAllApplications(): Promise<Application$1[]>;
    getAllRepositories(): Promise<Repository$1[]>;
    signUp(action: string | undefined, userAccountInfo: IUserAccountInfo$1): Promise<void>;
}

declare function initFramework(): Promise<void>;

declare type Application = Application;
declare type IUserAccountInfo = IUserAccountInfo;
declare type Repository = Repository;
declare const airportApi: AIRportApi;

export { Application, IUserAccountInfo, Repository, airportApi, initFramework };
