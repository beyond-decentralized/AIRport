import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from './qcountry';
import { UserTerminalGraph, UserTerminalESelect, QUserTerminal } from './quserterminal';
import { UserTerminal } from '../ddl/UserTerminal';
import { UserTerminalAgtGraph, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
import { UserTerminalAgt } from '../ddl/UserTerminalAgt';
import { User } from '../ddl/User';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect extends IEntitySelectProperties, UserEOptionalId {
    privateId?: string | IQStringField;
    publicId?: string | IQStringField;
    email?: string | IQStringField;
    username?: string | IQStringField;
    country?: CountryESelect;
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
    privateId?: string | IQStringField;
    publicId?: string | IQStringField;
    email?: string | IQStringField;
    username?: string | IQStringField;
    country?: CountryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserGraph extends UserEOptionalId, IEntityCascadeGraph {
    privateId?: string | IQStringField;
    publicId?: string | IQStringField;
    email?: string | IQStringField;
    username?: string | IQStringField;
    country?: CountryGraph;
    userTerminal?: UserTerminalGraph[];
    userTerminalAgts?: UserTerminalAgtGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns extends IEntityUpdateColumns {
    PRIVATE_ID?: string | IQStringField;
    PUBLIC_ID?: string | IQStringField;
    USERNAME?: string | IQStringField;
    EMAIL?: string | IQStringField;
    COUNTRY_ID?: number | IQNumberField;
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
    privateId: IQStringField;
    publicId: IQStringField;
    email: IQStringField;
    username: IQStringField;
    country: QCountryQRelation;
    userTerminal: IQOneToManyRelation<UserTerminal, QUserTerminal>;
    userTerminalAgts: IQOneToManyRelation<UserTerminalAgt, QUserTerminalAgt>;
}
export interface QUserQId {
    id: IQNumberField;
}
export interface QUserQRelation extends IQRelation<User, QUser>, QUserQId {
}
//# sourceMappingURL=quser.d.ts.map