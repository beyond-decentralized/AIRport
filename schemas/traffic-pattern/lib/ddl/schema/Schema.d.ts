import { SchemaIndex, SchemaName, SchemaScope, SchemaStatus } from '@airport/ground-control';
import { Domain } from '@airport/territory';
import { SchemaVersion } from './SchemaVersion';
export declare class Schema {
    index: SchemaIndex;
    domain: Domain;
    scope: SchemaScope;
    name: SchemaName;
    status: SchemaStatus;
    versions: SchemaVersion[];
    currentVersion: SchemaVersion;
}
//# sourceMappingURL=schema.d.ts.map