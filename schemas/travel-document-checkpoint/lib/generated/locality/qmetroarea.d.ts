import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from './qcountry';
import { StateGraph, StateESelect, QState } from './qstate';
import { UserGraph, UserESelect, QUser } from '../quser';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MetroAreaESelect extends IEntitySelectProperties, MetroAreaEOptionalId {
    name?: string | IQStringField;
    country?: CountryESelect;
    metroAreaStates?: StateESelect;
    users?: UserESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MetroAreaEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface MetroAreaEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MetroAreaEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
    country?: CountryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MetroAreaGraph extends MetroAreaEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    country?: CountryGraph;
    metroAreaStates?: StateGraph[];
    users?: UserGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MetroAreaEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    COUNTRY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MetroAreaECreateProperties extends Partial<MetroAreaEId>, MetroAreaEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MetroAreaECreateColumns extends MetroAreaEId, MetroAreaEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMetroArea extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    country: QCountryQRelation;
    metroAreaStates: IQOneToManyRelation<QState>;
    users: IQOneToManyRelation<QUser>;
}
export interface QMetroAreaQId {
    id: IQNumberField;
}
export interface QMetroAreaQRelation extends IQRelation<QMetroArea>, QMetroAreaQId {
}
//# sourceMappingURL=qmetroarea.d.ts.map