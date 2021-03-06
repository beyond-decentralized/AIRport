import { IDomain } from './domain';
import { IApplicationVersion } from './applicationversion';
import { IApplicationCurrentVersion } from './applicationcurrentversion';
export interface IApplication {
    index: number;
    GUID?: string;
    scope?: string;
    name?: string;
    fullName?: string;
    status?: string;
    signature?: string;
    domain?: IDomain;
    versions?: IApplicationVersion[];
    currentVersion?: IApplicationCurrentVersion[];
}
//# sourceMappingURL=application.d.ts.map