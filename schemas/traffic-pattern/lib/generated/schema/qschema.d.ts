import { IQNumberField, IQOneToManyRelation, IQStringField } from '@airport/air-control';
import { IVersionedSchemaObject, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { IDomain, DomainEOptionalId, DomainESelect, QDomainQRelation } from '@airport/territory';
import { ISchemaVersion, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersion, QSchemaVersionQRelation } from './qschemaversion';
export interface ISchema extends IVersionedSchemaObject {
    index?: number;
    scope?: string;
    name?: string;
    status?: number;
    domain?: IDomain;
    versions?: ISchemaVersion[];
    currentVersion?: ISchemaVersion;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaESelect extends VersionedSchemaObjectESelect, SchemaEOptionalId {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    status?: number | IQNumberField;
    domain?: DomainESelect;
    versions?: SchemaVersionESelect;
    currentVersion?: SchemaVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEId extends VersionedSchemaObjectEId {
    index: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEOptionalId {
    index?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    status?: number | IQNumberField;
    domain?: DomainEOptionalId;
    currentVersion?: SchemaVersionEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    SCOPE?: string | IQStringField;
    SCHEMA_NAME?: string | IQStringField;
    STATUS?: number | IQNumberField;
    DOMAIN_ID?: number | IQNumberField;
    CURRENT_VERSION_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaECreateProperties extends Partial<SchemaEId>, SchemaEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaECreateColumns extends SchemaEId, SchemaEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchema extends QVersionedSchemaObject {
    index: IQNumberField;
    scope: IQStringField;
    name: IQStringField;
    status: IQNumberField;
    domain: QDomainQRelation;
    versions: IQOneToManyRelation<QSchemaVersion>;
    currentVersion: QSchemaVersionQRelation;
}
export interface QSchemaQId extends QVersionedSchemaObjectQId {
    index: IQNumberField;
}
export interface QSchemaQRelation extends QVersionedSchemaObjectQRelation<QSchema>, QSchemaQId {
}
