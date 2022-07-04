import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from './locality/qcontinent';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from './locality/qcountry';
import { StateGraph, StateEOptionalId, StateESelect, QStateQRelation } from './locality/qstate';
import { MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from './locality/qmetroarea';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect extends IEntitySelectProperties, UserEOptionalId {
    origin?: string | IQStringField;
    originId?: string | IQStringField;
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentESelect;
    country?: CountryESelect;
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserEId extends IEntityIdProperties {
    _localId?: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserEUpdateProperties extends IEntityUpdateProperties {
    origin?: string | IQStringField;
    originId?: string | IQStringField;
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentEOptionalId;
    country?: CountryEOptionalId;
    state?: StateEOptionalId;
    metroArea?: MetroAreaEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserGraph extends UserEOptionalId, IEntityCascadeGraph {
    origin?: string | IQStringField;
    originId?: string | IQStringField;
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentGraph;
    country?: CountryGraph;
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns extends IEntityUpdateColumns {
    ORIGIN?: string | IQStringField;
    ORIGIN_LID?: string | IQStringField;
    EMAIL?: string | IQStringField;
    PASSWORD_HASH?: string | IQStringField;
    RANKING?: number | IQNumberField;
    USERNAME?: string | IQStringField;
    USER_GUID?: string | IQStringField;
    CONTINENT_ID?: number | IQNumberField;
    COUNTRY_ID?: number | IQNumberField;
    STATE_ID?: number | IQNumberField;
    METRO_AREA_ID?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUser extends IQEntity {
    _localId: IQNumberField;
    origin: IQStringField;
    originId: IQStringField;
    email: IQStringField;
    passwordHash: IQStringField;
    ranking: IQNumberField;
    username: IQStringField;
    GUID: IQStringField;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
}
export interface QUserQId {
    _localId: IQNumberField;
}
export interface QUserQRelation extends IQRelation<QUser>, QUserQId {
}
//# sourceMappingURL=quser.d.ts.map