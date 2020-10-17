import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { UserEId, UserEOptionalId, UserESelect, QUserQId, QUserQRelation } from '../quser';
import { SecurityQuestionEId, SecurityQuestionEOptionalId, SecurityQuestionESelect, QSecurityQuestionQId, QSecurityQuestionQRelation } from './qsecurityquestion';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SecurityAnswerESelect extends IEntitySelectProperties, SecurityAnswerEOptionalId {
    answer?: string | IQStringField;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SecurityAnswerECascadeGraph extends IEntityCascadeGraph {
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
export interface SecurityAnswerECreateProperties extends Partial<SecurityAnswerEId>, SecurityAnswerEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SecurityAnswerECreateColumns extends SecurityAnswerEId, SecurityAnswerEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSecurityAnswer extends IQEntity {
    user: QUserQRelation;
    securityQuestion: QSecurityQuestionQRelation;
    answer: IQStringField;
}
export interface QSecurityAnswerQId {
    user: QUserQId;
    securityQuestion: QSecurityQuestionQId;
}
export interface QSecurityAnswerQRelation extends IQRelation<QSecurityAnswer>, QSecurityAnswerQId {
}
//# sourceMappingURL=qsecurityanswer.d.ts.map