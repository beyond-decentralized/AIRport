import { JsonSchemaWithLastIds } from '@airport/security-check';
import { IDomain } from '@airport/territory';
import { ISchemaVersion } from './schemaversion';
import { ISchemaCurrentVersion } from './schemacurrentversion';
export interface ISchema {
    index: number;
    scope?: string;
    name?: string;
    packageName?: string;
    status?: number;
    jsonSchema?: JsonSchemaWithLastIds;
    domain?: IDomain;
    versions?: ISchemaVersion[];
    currentVersion?: ISchemaCurrentVersion[];
}
//# sourceMappingURL=schema.d.ts.map