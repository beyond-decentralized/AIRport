import { SchemaVersionId, SchemaVersionInteger, SchemaVersionMajor, SchemaVersionMinor, SchemaVersionPatch, SchemaVersionString } from '@airport/ground-control';
import { Schema } from './Schema';
import { SchemaEntity } from './SchemaEntity';
import { SchemaReference } from './SchemaReference';
export declare class SchemaVersion {
    id: SchemaVersionId;
    integerVersion: SchemaVersionInteger;
    versionString: SchemaVersionString;
    majorVersion: SchemaVersionMajor;
    minorVersion: SchemaVersionMinor;
    patchVersion: SchemaVersionPatch;
    schema: Schema;
    entities: SchemaEntity[];
    references: SchemaReference[];
    referencedBy: SchemaReference[];
    entityMapByName?: {
        [entityName: string]: SchemaEntity;
    };
    referencesMapByName?: {
        [schemaName: string]: SchemaReference;
    };
    referencedByMapByName?: {
        [schemaName: string]: SchemaReference;
    };
}
//# sourceMappingURL=SchemaVersion.d.ts.map