import { PackageName, SchemaIndex, SchemaName, SchemaScope, SchemaStatus } from '@airport/ground-control';
import type { JsonSchemaWithLastIds } from '@airport/security-check';
import { Domain } from './Domain';
import { SchemaCurrentVersion } from './SchemaCurrentVersion';
import { SchemaVersion } from './SchemaVersion';
export declare class Schema {
    index: SchemaIndex;
    domain: Domain;
    scope: SchemaScope;
    name: SchemaName;
    packageName: PackageName;
    status: SchemaStatus;
    signature: string;
    versions: SchemaVersion[];
    currentVersion: SchemaCurrentVersion[];
    jsonSchema: JsonSchemaWithLastIds;
}
//# sourceMappingURL=Schema.d.ts.map