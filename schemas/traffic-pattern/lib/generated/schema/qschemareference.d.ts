import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISchemaVersion, SchemaVersionEId, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQId, QSchemaVersionQRelation } from './qschemaversion';
export interface ISchemaReference {
    ownSchemaVersion?: ISchemaVersion;
    referencedSchemaVersion?: ISchemaVersion;
    index?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaReferenceESelect extends IEntitySelectProperties, SchemaReferenceEOptionalId, SchemaReferenceEUpdateProperties {
    ownSchemaVersion?: SchemaVersionESelect;
    referencedSchemaVersion?: SchemaVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaReferenceEId extends IEntityIdProperties {
    ownSchemaVersion: SchemaVersionEId;
    referencedSchemaVersion: SchemaVersionEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaReferenceEOptionalId {
    ownSchemaVersion?: SchemaVersionEOptionalId;
    referencedSchemaVersion?: SchemaVersionEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaReferenceEUpdateProperties extends IEntityUpdateProperties {
    index?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaReferenceEUpdateColumns extends IEntityUpdateColumns {
    INDEX?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaReferenceECreateProperties extends SchemaReferenceEId, SchemaReferenceEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaReferenceECreateColumns extends SchemaReferenceEId, SchemaReferenceEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaReference extends QEntity {
    ownSchemaVersion: QSchemaVersionQRelation;
    referencedSchemaVersion: QSchemaVersionQRelation;
    index: IQNumberField;
}
export interface QSchemaReferenceQId {
    ownSchemaVersion: QSchemaVersionQId;
    referencedSchemaVersion: QSchemaVersionQId;
}
export interface QSchemaReferenceQRelation extends QRelation<QSchemaReference>, QSchemaReferenceQId {
}
