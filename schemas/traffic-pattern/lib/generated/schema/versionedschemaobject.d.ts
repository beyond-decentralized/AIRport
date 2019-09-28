import { ISchemaVersion } from './schemaversion';
export interface IVersionedSchemaObject {
    deprecatedSinceVersion?: ISchemaVersion;
    removedInVersion?: ISchemaVersion;
    sinceVersion?: ISchemaVersion;
}
