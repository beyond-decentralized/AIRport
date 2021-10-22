import { IDomain } from './domain';
import { IApplicationPackage } from './applicationpackage';
export interface IApplication {
    id: number;
    name?: string;
    signature?: string;
    domain?: IDomain;
    applicationPackages?: IApplicationPackage[];
}
//# sourceMappingURL=application.d.ts.map