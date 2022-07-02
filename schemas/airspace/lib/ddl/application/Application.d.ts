import { ApplicationIndex, FullApplicationName, ApplicationScope, ApplicationStatus, ApplicationName } from '@airport/ground-control';
import { Domain } from './Domain';
import { ApplicationCurrentVersion } from './ApplicationCurrentVersion';
import { ApplicationVersion } from './ApplicationVersion';
export declare class Application {
    index: ApplicationIndex;
    GUID: string;
    scope: ApplicationScope;
    name: ApplicationName;
    fullName: FullApplicationName;
    status: ApplicationStatus;
    signature: string;
    domain: Domain;
    versions: ApplicationVersion[];
    currentVersion: ApplicationCurrentVersion[];
}
//# sourceMappingURL=Application.d.ts.map