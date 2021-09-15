import { PackageName, SchemaIndex, SchemaName, SchemaScope, SchemaStatus } from '@airport/ground-control';
import { Domain } from '@airport/territory';
import { SchemaCurrentVersion } from './SchemaCurrentVersion';
import { SchemaVersion } from './SchemaVersion';
export declare class Schema {
    index: SchemaIndex;
    domain: Domain;
    scope: SchemaScope;
    name: SchemaName;
    packageName: PackageName;
    status: SchemaStatus;
    versions: SchemaVersion[];
    currentVersion: SchemaCurrentVersion[];
}
//# sourceMappingURL=Schema.d.ts.map