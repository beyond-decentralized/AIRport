import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ISchema, SchemaEOptionalId, SchemaESelect, QSchemaQRelation } from './qschema';
import { ISchemaEntity, SchemaEntityESelect, QSchemaEntity } from './qschemaentity';
import { ISchemaReference, SchemaReferenceESelect, QSchemaReference } from './qschemareference';
export interface ISchemaVersion {
    id?: number;
    versionString?: string;
    majorVersion?: number;
    minorVersion?: number;
    patchVersion?: number;
    schema?: ISchema;
    entities?: ISchemaEntity[];
    references?: ISchemaReference[];
    referencedBy?: ISchemaReference[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaVersionESelect extends IEntitySelectProperties, SchemaVersionEOptionalId, SchemaVersionEUpdateProperties {
    schema?: SchemaESelect;
    entities?: SchemaEntityESelect;
    references?: SchemaReferenceESelect;
    referencedBy?: SchemaReferenceESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaVersionEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaVersionEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaVersionEUpdateProperties extends IEntityUpdateProperties {
    versionString?: string | IQStringField;
    majorVersion?: number | IQNumberField;
    minorVersion?: number | IQNumberField;
    patchVersion?: number | IQNumberField;
    schema?: SchemaEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaVersionEUpdateColumns extends IEntityUpdateColumns {
    VERSION_STRING?: string | IQStringField;
    MAJOR_VERSION?: number | IQNumberField;
    MINOR_VERSION?: number | IQNumberField;
    PATCH_VERSION?: number | IQNumberField;
    SCHEMA_INDEX?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaVersionECreateProperties extends SchemaVersionEId, SchemaVersionEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaVersionECreateColumns extends SchemaVersionEId, SchemaVersionEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaVersion extends QEntity {
    id: IQNumberField;
    versionString: IQStringField;
    majorVersion: IQNumberField;
    minorVersion: IQNumberField;
    patchVersion: IQNumberField;
    schema: QSchemaQRelation;
    entities: IQOneToManyRelation<QSchemaEntity>;
    references: IQOneToManyRelation<QSchemaReference>;
    referencedBy: IQOneToManyRelation<QSchemaReference>;
}
export interface QSchemaVersionQId {
    id: IQNumberField;
}
export interface QSchemaVersionQRelation extends QRelation<QSchemaVersion>, QSchemaVersionQId {
}
