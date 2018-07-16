import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IUser, UserEId, UserEOptionalId, UserESelect, QUserQId, QUserQRelation } from '../quser';
import { ISecurityQuestion, SecurityQuestionEId, SecurityQuestionEOptionalId, SecurityQuestionESelect, QSecurityQuestionQId, QSecurityQuestionQRelation } from './qsecurityquestion';
export interface ISecurityAnswer {
    user?: IUser;
    securityQuestion?: ISecurityQuestion;
    answer?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SecurityAnswerESelect extends IEntitySelectProperties, SecurityAnswerEOptionalId, SecurityAnswerEUpdateProperties {
    user?: UserESelect;
    securityQuestion?: SecurityQuestionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SecurityAnswerEId extends IEntityIdProperties {
    user: UserEId;
    securityQuestion: SecurityQuestionEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SecurityAnswerEOptionalId {
    user?: UserEOptionalId;
    securityQuestion?: SecurityQuestionEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SecurityAnswerEUpdateProperties extends IEntityUpdateProperties {
    answer?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SecurityAnswerEUpdateColumns extends IEntityUpdateColumns {
    ANSWER?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SecurityAnswerECreateProperties extends SecurityAnswerEId, SecurityAnswerEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SecurityAnswerECreateColumns extends SecurityAnswerEId, SecurityAnswerEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSecurityAnswer extends QEntity {
    user: QUserQRelation;
    securityQuestion: QSecurityQuestionQRelation;
    answer: IQStringField;
}
export interface QSecurityAnswerQId {
    user: QUserQId;
    securityQuestion: QSecurityQuestionQId;
}
export interface QSecurityAnswerQRelation extends QRelation<QSecurityAnswer>, QSecurityAnswerQId {
}
