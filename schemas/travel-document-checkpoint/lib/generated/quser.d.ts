import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { UserTerminalGraph, UserTerminalESelect, QUserTerminal } from './quserterminal';
import { UserTerminal } from '../ddl/UserTerminal';
import { UserTerminalAgtGraph, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
import { UserTerminalAgt } from '../ddl/UserTerminalAgt';
import { User } from '../ddl/User';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect extends IEntitySelectProperties, UserEOptionalId {
    uniqueId?: string | IQStringField;
    firstName?: string | IQStringField;
    lastName?: string | IQStringField;
    middleName?: string | IQStringField;
    phone?: string | IQStringField;
    userTerminal?: UserTerminalESelect;
    userTerminalAgts?: UserTerminalAgtESelect;
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
    uniqueId?: string | IQStringField;
    firstName?: string | IQStringField;
    lastName?: string | IQStringField;
    middleName?: string | IQStringField;
    phone?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserGraph extends UserEOptionalId, IEntityCascadeGraph {
    uniqueId?: string | IQStringField;
    firstName?: string | IQStringField;
    lastName?: string | IQStringField;
    middleName?: string | IQStringField;
    phone?: string | IQStringField;
    userTerminal?: UserTerminalGraph[];
    userTerminalAgts?: UserTerminalAgtGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns extends IEntityUpdateColumns {
    UNIQUE_IDENTIFIER?: string | IQStringField;
    FIRST_NAME?: string | IQStringField;
    LAST_NAME?: string | IQStringField;
    MIDDLE_NAME?: string | IQStringField;
    PHONE?: string | IQStringField;
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
    uniqueId: IQStringField;
    firstName: IQStringField;
    lastName: IQStringField;
    middleName: IQStringField;
    phone: IQStringField;
    userTerminal: IQOneToManyRelation<UserTerminal, QUserTerminal>;
    userTerminalAgts: IQOneToManyRelation<UserTerminalAgt, QUserTerminalAgt>;
}
export interface QUserQId {
    id: IQNumberField;
}
export interface QUserQRelation extends IQRelation<User, QUser>, QUserQId {
}
//# sourceMappingURL=quser.d.ts.map