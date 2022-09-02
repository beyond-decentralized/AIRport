import { IUserAccountInfo as IUserAccountInfo$1 } from '@airport/terminal-map';
import { Repository as Repository$2 } from '@airport/holding-pattern';
import { Application as Application$1 } from '@airport/airspace/lib/to_be_generated/runtime-index';
import { Repository as Repository$1 } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';

declare function initFramework(): Promise<void>;

declare class AIRportApi {
    getAllApplications(): Promise<Application$1[]>;
    getAllRepositories(): Promise<Repository$1[]>;
    signUp(action: string | undefined, userAccountInfo: IUserAccountInfo$1): Promise<void>;
}

declare type Application = Application;
declare type IUserAccountInfo = IUserAccountInfo$1;
declare type Repository = Repository$2;
declare const airportApi: AIRportApi;

export { Application, IUserAccountInfo, Repository, airportApi, initFramework };
