import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IDomain, DomainEOptionalId, DomainESelect, QDomainQRelation } from '@airport/territory';
import { ISchemaVersion, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersion, QSchemaVersionQRelation } from './qschemaversion';
export interface ISchema {
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
export interface SchemaESelect extends IEntitySelectProperties, SchemaEOptionalId, SchemaEUpdateProperties {
    domain?: DomainESelect;
    versions?: SchemaVersionESelect;
    currentVersion?: SchemaVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEId extends IEntityIdProperties {
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
export interface SchemaEUpdateProperties extends IEntityUpdateProperties {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    status?: number | IQNumberField;
    domain?: DomainEOptionalId;
    currentVersion?: SchemaVersionEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEUpdateColumns extends IEntityUpdateColumns {
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
export interface QSchema extends QEntity {
    index: IQNumberField;
    scope: IQStringField;
    name: IQStringField;
    status: IQNumberField;
    domain: QDomainQRelation;
    versions: IQOneToManyRelation<QSchemaVersion>;
    currentVersion: QSchemaVersionQRelation;
}
export interface QSchemaQId {
    index: IQNumberField;
}
export interface QSchemaQRelation extends QRelation<QSchema>, QSchemaQId {
}
