import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ISecurityAnswer, SecurityAnswerESelect, QSecurityAnswer } from './security/qsecurityanswer';
import { IUserRepository, UserRepositoryESelect, QUserRepository } from './quserrepository';
import { ITerminal, TerminalESelect, QTerminal } from '../terminal/qterminal';
import { IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, QAgtRepositoryTransactionBlock } from '../synchronization/qagtrepositorytransactionblock';
export interface IUser {
    id?: number;
    hash?: string;
    email?: string;
    isInvitation?: boolean;
    securityAnswers?: ISecurityAnswer[];
    userRepositories?: IUserRepository[];
    terminals?: ITerminal[];
    repositoryTransactionBlocks?: IAgtRepositoryTransactionBlock[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect extends IEntitySelectProperties, UserEOptionalId, UserEUpdateProperties {
    securityAnswers?: SecurityAnswerESelect;
    userRepositories?: UserRepositoryESelect;
    terminals?: TerminalESelect;
    repositoryTransactionBlocks?: AgtRepositoryTransactionBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserEUpdateProperties extends IEntityUpdateProperties {
    hash?: string | IQStringField;
    email?: string | IQStringField;
    isInvitation?: boolean | IQBooleanField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns extends IEntityUpdateColumns {
    HASH?: string | IQStringField;
    EMAIL?: string | IQStringField;
    IS_INVITATION?: boolean | IQBooleanField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserECreateProperties extends Partial<UserEId>, UserEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserECreateColumns extends UserEId, UserEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUser extends QEntity {
    id: IQNumberField;
    hash: IQStringField;
    email: IQStringField;
    isInvitation: IQBooleanField;
    securityAnswers: IQOneToManyRelation<QSecurityAnswer>;
    userRepositories: IQOneToManyRelation<QUserRepository>;
    terminals: IQOneToManyRelation<QTerminal>;
    repositoryTransactionBlocks: IQOneToManyRelation<QAgtRepositoryTransactionBlock>;
}
export interface QUserQId {
    id: IQNumberField;
}
export interface QUserQRelation extends QRelation<QUser>, QUserQId {
}
