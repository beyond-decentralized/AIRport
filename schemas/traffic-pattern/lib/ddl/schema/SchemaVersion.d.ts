import { SchemaVersionId, SchemaVersionInteger, SchemaVersionMajor, SchemaVersionMinor, SchemaVersionPatch, SchemaVersionString } from '@airport/ground-control';
import { Schema } from './Schema';
import { SchemaEntity } from './SchemaEntity';
import { SchemaReference } from './SchemaReference';
import { ISchemaEntity } from '../../generated/schema/schemaentity';
import { ISchemaReference } from '../../generated/schema/schemareference';
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
        [entityName: string]: ISchemaEntity;
    };
    referencesMapByName?: {
        [schemaName: string]: ISchemaReference;
    };
    referencedByMapByName?: {
        [schemaName: string]: ISchemaReference;
    };
}
//# sourceMappingURL=SchemaVersion.d.ts.map