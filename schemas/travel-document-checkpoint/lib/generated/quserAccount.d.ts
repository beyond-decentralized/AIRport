import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { DomainGraph, DomainEOptionalId, DomainESelect, QDomainQRelation } from '@airport/airspace';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from './locality/qcontinent';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from './locality/qcountry';
import { StateGraph, StateEOptionalId, StateESelect, QStateQRelation } from './locality/qstate';
import { MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from './locality/qmetroarea';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserAccountESelect extends IEntitySelectProperties, UserAccountEOptionalId {
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
    domain?: DomainESelect;
    continent?: ContinentESelect;
    country?: CountryESelect;
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserAccountEId extends IEntityIdProperties {
    _localId?: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserAccountEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserAccountEUpdateProperties extends IEntityUpdateProperties {
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
    domain?: DomainEOptionalId;
    continent?: ContinentEOptionalId;
    country?: CountryEOptionalId;
    state?: StateEOptionalId;
    metroArea?: MetroAreaEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserAccountGraph extends UserAccountEOptionalId, IEntityCascadeGraph {
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
    domain?: DomainGraph;
    continent?: ContinentGraph;
    country?: CountryGraph;
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserAccountEUpdateColumns extends IEntityUpdateColumns {
    EMAIL?: string | IQStringField;
    PASSWORD_HASH?: string | IQStringField;
    RANKING?: number | IQNumberField;
    USER_ACCOUNTNAME?: string | IQStringField;
    USER_ACCOUNT_GUID?: string | IQStringField;
    DOMAIN_LID?: number | IQNumberField;
    CONTINENT_ID?: number | IQNumberField;
    COUNTRY_ID?: number | IQNumberField;
    STATE_ID?: number | IQNumberField;
    METRO_AREA_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserAccountECreateProperties extends Partial<UserAccountEId>, UserAccountEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserAccountECreateColumns extends UserAccountEId, UserAccountEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUserAccount extends IQEntity {
    _localId: IQNumberField;
    email: IQStringField;
    passwordHash: IQStringField;
    ranking: IQNumberField;
    username: IQStringField;
    GUID: IQStringField;
    domain: QDomainQRelation;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
}
export interface QUserAccountQId {
    _localId: IQNumberField;
}
export interface QUserAccountQRelation extends IQRelation<QUserAccount>, QUserAccountQId {
}
//# sourceMappingURL=quseraccount.d.ts.map