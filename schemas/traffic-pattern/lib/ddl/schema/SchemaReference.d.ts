import { SchemaReferenceIndex } from '@airport/ground-control';
import { SchemaVersion } from "./SchemaVersion";
export declare class SchemaReference {
    index: SchemaReferenceIndex;
    ownSchemaVersion: SchemaVersion;
    referencedSchemaVersion: SchemaVersion;
}
