import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISharingMessage, SharingMessageEId, SharingMessageEOptionalId, SharingMessageESelect, QSharingMessageQId, QSharingMessageQRelation } from './qsharingmessage';
import { ISchema, SchemaEId, SchemaEOptionalId, SchemaESelect, QSchemaQId, QSchemaQRelation } from '@airport/traffic-pattern';
export interface ISharingMessageSchemasToChange {
    sharingMessage?: ISharingMessage;
    schema?: ISchema;
    status?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingMessageSchemasToChangeESelect extends IEntitySelectProperties, SharingMessageSchemasToChangeEOptionalId, SharingMessageSchemasToChangeEUpdateProperties {
    sharingMessage?: SharingMessageESelect;
    schema?: SchemaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingMessageSchemasToChangeEId extends IEntityIdProperties {
    sharingMessage: SharingMessageEId;
    schema: SchemaEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingMessageSchemasToChangeEOptionalId {
    sharingMessage?: SharingMessageEOptionalId;
    schema?: SchemaEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingMessageSchemasToChangeEUpdateProperties extends IEntityUpdateProperties {
    status?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingMessageSchemasToChangeEUpdateColumns extends IEntityUpdateColumns {
    STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingMessageSchemasToChangeECreateProperties extends SharingMessageSchemasToChangeEId, SharingMessageSchemasToChangeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingMessageSchemasToChangeECreateColumns extends SharingMessageSchemasToChangeEId, SharingMessageSchemasToChangeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingMessageSchemasToChange extends QEntity {
    sharingMessage: QSharingMessageQRelation;
    schema: QSchemaQRelation;
    status: IQNumberField;
}
export interface QSharingMessageSchemasToChangeQId {
    sharingMessage: QSharingMessageQId;
    schema: QSchemaQId;
}
export interface QSharingMessageSchemasToChangeQRelation extends QRelation<QSharingMessageSchemasToChange>, QSharingMessageSchemasToChangeQId {
}
