import { Application } from '@airport/airspace/lib/to_be_generated/runtime-index';
import { Repository } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IUserAccountInfo } from '@airport/terminal-map';
export declare class AIRportApi {
    getAllApplications(): Promise<Application[]>;
    getAllRepositories(): Promise<Repository[]>;
    signUp(action: string | undefined, userAccountInfo: IUserAccountInfo): Promise<void>;
}
//# sourceMappingURL=AIRportApi.d.ts.map