import { SchemaVersionId, SchemaVersionInteger, SchemaVersionMajor, SchemaVersionMinor, SchemaVersionPatch, SchemaVersionString } from '@airport/ground-control';
import { ISchemaEntity } from '../../generated/schema/qschemaentity';
import { ISchemaReference } from '../../generated/schema/qschemareference';
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
        [entityName: string]: ISchemaEntity;
    };
    referencesMapByName?: {
        [schemaName: string]: ISchemaReference;
    };
    referencedByMapByName?: {
        [schemaName: string]: ISchemaReference;
    };
}
