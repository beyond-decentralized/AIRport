import { IVersionedSchemaObject } from './versionedschemaobject';
import { ISchemaVersion } from './schemaversion';
export interface ISchemaReference extends IVersionedSchemaObject {
    ownSchemaVersion: ISchemaVersion;
    referencedSchemaVersion: ISchemaVersion;
    index?: number;
}
//# sourceMappingURL=schemareference.d.ts.map