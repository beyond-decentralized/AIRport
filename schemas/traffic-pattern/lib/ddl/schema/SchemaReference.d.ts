import { SchemaReferenceIndex } from '@airport/ground-control';
import { SchemaVersion } from "./SchemaVersion";
export declare class SchemaReference {
    ownSchemaVersion: SchemaVersion;
    referencedSchemaVersion: SchemaVersion;
    index: SchemaReferenceIndex;
}
