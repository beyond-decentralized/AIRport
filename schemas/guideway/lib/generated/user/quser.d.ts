import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { SecurityAnswerGraph, SecurityAnswerESelect, QSecurityAnswer } from './security/qsecurityanswer';
import { SecurityAnswer } from '../../ddl/user/security/SecurityAnswer';
import { UserRepositoryGraph, UserRepositoryESelect, QUserRepository } from './quserrepository';
import { UserRepository } from '../../ddl/user/UserRepository';
import { TerminalGraph, TerminalESelect, QTerminal } from '../terminal/qterminal';
import { Terminal } from '../../ddl/terminal/Terminal';
import { AgtRepositoryTransactionBlockGraph, AgtRepositoryTransactionBlockESelect, QAgtRepositoryTransactionBlock } from '../synchronization/qagtrepositorytransactionblock';
import { AgtRepositoryTransactionBlock } from '../../ddl/synchronization/AgtRepositoryTransactionBlock';
import { User } from '../../ddl/user/User';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect extends IEntitySelectProperties, UserEOptionalId {
    hash?: string | IQStringField;
    email?: string | IQStringField;
    isInvitation?: boolean | IQBooleanField;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserGraph extends UserEOptionalId, IEntityCascadeGraph {
    hash?: string | IQStringField;
    email?: string | IQStringField;
    isInvitation?: boolean | IQBooleanField;
    securityAnswers?: SecurityAnswerGraph[];
    userRepositories?: UserRepositoryGraph[];
    terminals?: TerminalGraph[];
    repositoryTransactionBlocks?: AgtRepositoryTransactionBlockGraph[];
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
export interface QUser extends IQEntity<User> {
    id: IQNumberField;
    hash: IQStringField;
    email: IQStringField;
    isInvitation: IQBooleanField;
    securityAnswers: IQOneToManyRelation<SecurityAnswer, QSecurityAnswer>;
    userRepositories: IQOneToManyRelation<UserRepository, QUserRepository>;
    terminals: IQOneToManyRelation<Terminal, QTerminal>;
    repositoryTransactionBlocks: IQOneToManyRelation<AgtRepositoryTransactionBlock, QAgtRepositoryTransactionBlock>;
}
export interface QUserQId {
    id: IQNumberField;
}
export interface QUserQRelation extends IQRelation<User, QUser>, QUserQId {
}
//# sourceMappingURL=quser.d.ts.map