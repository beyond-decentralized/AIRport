import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from './qcountry';
import { UserAccountGraph, UserAccountESelect, QUserAccount } from '../quseraccount';
/**
 * SELECT - All fields and relations (optional).
 */
export interface StateESelect extends IEntitySelectProperties, StateEOptionalId {
    abbreviation?: string | IQStringField;
    name?: string | IQStringField;
    country?: CountryESelect;
    metroAreaStates?: StateESelect;
    userAccounts?: UserAccountESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface StateEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface StateEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface StateEUpdateProperties extends IEntityUpdateProperties {
    abbreviation?: string | IQStringField;
    name?: string | IQStringField;
    country?: CountryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface StateGraph extends StateEOptionalId, IEntityCascadeGraph {
    abbreviation?: string | IQStringField;
    name?: string | IQStringField;
    country?: CountryGraph;
    metroAreaStates?: StateGraph[];
    userAccounts?: UserAccountGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface StateEUpdateColumns extends IEntityUpdateColumns {
    ABBREVIATION?: string | IQStringField;
    NAME?: string | IQStringField;
    COUNTRY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface StateECreateProperties extends Partial<StateEId>, StateEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface StateECreateColumns extends StateEId, StateEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QState<IQE extends QState = any> extends IQEntity<IQE | QState> {
    id: IQNumberField;
    abbreviation: IQStringField;
    name: IQStringField;
    country: QCountryQRelation;
    metroAreaStates: IQOneToManyRelation<QState>;
    userAccounts: IQOneToManyRelation<QUserAccount>;
}
export interface QStateQId {
    id: IQNumberField;
}
export interface QStateQRelation extends IQRelation<QState>, QStateQId {
}
//# sourceMappingURL=qstate.d.ts.map