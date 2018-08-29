import { SchemaVersion } from './SchemaVersion';
export declare class VersionedSchemaObject {
    deprecatedSinceVersion?: SchemaVersion;
    removedInVersion?: SchemaVersion;
    sinceVersion: SchemaVersion;
}
