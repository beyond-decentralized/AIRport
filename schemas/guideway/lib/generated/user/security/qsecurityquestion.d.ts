import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
export interface ISecurityQuestion {
    id?: number;
    question?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SecurityQuestionESelect extends IEntitySelectProperties, SecurityQuestionEOptionalId, SecurityQuestionEUpdateProperties {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SecurityQuestionEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SecurityQuestionEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SecurityQuestionEUpdateProperties extends IEntityUpdateProperties {
    question?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SecurityQuestionEUpdateColumns extends IEntityUpdateColumns {
    QUESTION?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SecurityQuestionECreateProperties extends Partial<SecurityQuestionEId>, SecurityQuestionEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SecurityQuestionECreateColumns extends SecurityQuestionEId, SecurityQuestionEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSecurityQuestion extends QEntity {
    id: IQNumberField;
    question: IQStringField;
}
export interface QSecurityQuestionQId {
    id: IQNumberField;
}
export interface QSecurityQuestionQRelation extends QRelation<QSecurityQuestion>, QSecurityQuestionQId {
}
