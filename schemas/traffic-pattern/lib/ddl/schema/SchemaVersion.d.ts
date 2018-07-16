import { SchemaVersionId, SchemaVersionMajor, SchemaVersionMinor, SchemaVersionPatch, SchemaVersionString } from "@airport/air-control";
import { ISchema } from "../../generated/schema/qschema";
import { ISchemaEntity } from "../../generated/schema/qschemaentity";
import { ISchemaReference } from "../../generated/schema/qschemareference";
import { ISchemaVersion } from "../../generated/schema/qschemaversion";
export declare class SchemaVersion implements ISchemaVersion {
    id: SchemaVersionId;
    versionString: SchemaVersionString;
    majorVersion: SchemaVersionMajor;
    minorVersion: SchemaVersionMinor;
    patchVersion: SchemaVersionPatch;
    schema: ISchema;
    entities: ISchemaEntity[];
    references: ISchemaReference[];
    referencedBy: ISchemaReference[];
}
