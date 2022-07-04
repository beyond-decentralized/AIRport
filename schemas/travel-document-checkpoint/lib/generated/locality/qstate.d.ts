import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from './qcountry';
import { UserGraph, UserESelect, QUser } from '../quser';
/**
 * SELECT - All fields and relations (optional).
 */
export interface StateESelect extends IEntitySelectProperties, StateEOptionalId {
    name?: string | IQStringField;
    country?: CountryESelect;
    metroAreaStates?: StateESelect;
    users?: UserESelect;
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
    name?: string | IQStringField;
    country?: CountryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface StateGraph extends StateEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    country?: CountryGraph;
    metroAreaStates?: StateGraph[];
    users?: UserGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface StateEUpdateColumns extends IEntityUpdateColumns {
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
export interface QState extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    country: QCountryQRelation;
    metroAreaStates: IQOneToManyRelation<QState>;
    users: IQOneToManyRelation<QUser>;
}
export interface QStateQId {
    id: IQNumberField;
}
export interface QStateQRelation extends IQRelation<QState>, QStateQId {
}
//# sourceMappingURL=qstate.d.ts.map