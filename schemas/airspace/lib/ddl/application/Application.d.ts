import { PackageName, ApplicationIndex, FullApplicationName, ApplicationScope, ApplicationStatus, ApplicationName } from '@airport/ground-control';
import { Domain } from './Domain';
import { ApplicationCurrentVersion } from './ApplicationCurrentVersion';
import { ApplicationVersion } from './ApplicationVersion';
export declare class Application {
    index: ApplicationIndex;
    domain: Domain;
    scope: ApplicationScope;
    name: ApplicationName;
    fullName: FullApplicationName;
    packageName: PackageName;
    status: ApplicationStatus;
    signature: string;
    versions: ApplicationVersion[];
    currentVersion: ApplicationCurrentVersion[];
}
//# sourceMappingURL=Application.d.ts.map