import { PackageName, ApplicationIndex, ApplicationName, ApplicationScope, ApplicationStatus } from '@airport/ground-control';
import { Domain } from './Domain';
import { ApplicationCurrentVersion } from './ApplicationCurrentVersion';
import { ApplicationVersion } from './ApplicationVersion';
export declare class Application {
    index: ApplicationIndex;
    domain: Domain;
    scope: ApplicationScope;
    name: ApplicationName;
    packageName: PackageName;
    status: ApplicationStatus;
    signature: string;
    versions: ApplicationVersion[];
    currentVersion: ApplicationCurrentVersion[];
}
//# sourceMappingURL=Application.d.ts.map