import { Application_Index, FullApplication_Name, Application_Scope, ApplicationStatus, Application_Name } from '@airport/ground-control';
import { Domain } from './Domain';
import { ApplicationCurrentVersion } from './ApplicationCurrentVersion';
import { ApplicationVersion } from './ApplicationVersion';
export declare class Application {
    index: Application_Index;
    GUID: string;
    scope: Application_Scope;
    name: Application_Name;
    fullName: FullApplication_Name;
    status: ApplicationStatus;
    signature: string;
    domain: Domain;
    versions: ApplicationVersion[];
    currentVersion: ApplicationCurrentVersion[];
}
//# sourceMappingURL=Application.d.ts.map