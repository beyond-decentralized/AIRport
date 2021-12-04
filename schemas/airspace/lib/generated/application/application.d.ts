import { IDomain } from './domain';
import { IApplicationVersion } from './applicationversion';
import { IApplicationCurrentVersion } from './applicationcurrentversion';
export interface IApplication {
    index: number;
    scope?: string;
    name?: string;
    packageName?: string;
    status?: string;
    signature?: string;
    domain?: IDomain;
    versions?: IApplicationVersion[];
    currentVersion?: IApplicationCurrentVersion[];
}
//# sourceMappingURL=application.d.ts.map