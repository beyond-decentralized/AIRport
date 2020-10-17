import { SchemaReferenceIndex } from '@airport/ground-control';
import { SchemaVersion } from './SchemaVersion';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare class SchemaReference extends VersionedSchemaObject {
    ownSchemaVersion: SchemaVersion;
    referencedSchemaVersion: SchemaVersion;
    index: SchemaReferenceIndex;
}
//# sourceMappingURL=SchemaReference.d.ts.map