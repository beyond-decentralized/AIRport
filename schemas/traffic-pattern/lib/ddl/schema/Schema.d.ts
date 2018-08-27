import { SchemaIndex, SchemaName } from '@airport/ground-control';
import { Domain } from '@airport/territory';
import { SchemaStatus } from './SchemaStatus';
import { SchemaVersion } from './SchemaVersion';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare type SchemaScope = 'private' | 'public' | null;
export declare class Schema extends VersionedSchemaObject {
    index: SchemaIndex;
    domain: Domain;
    scope: SchemaScope;
    name: SchemaName;
    status: SchemaStatus;
    versions: SchemaVersion[];
    currentVersion: SchemaVersion;
}
