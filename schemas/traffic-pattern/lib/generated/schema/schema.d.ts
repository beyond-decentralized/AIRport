import { IDomain } from '@airport/territory';
import { ISchemaVersion } from './schemaversion';
export interface ISchema {
    index: number;
    scope?: string;
    name?: string;
    packageName?: string;
    status?: number;
    domain?: IDomain;
    versions?: ISchemaVersion[];
    currentVersion?: ISchemaVersion;
}
//# sourceMappingURL=schema.d.ts.map