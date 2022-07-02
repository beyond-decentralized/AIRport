import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from './locality/qcontinent';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from './locality/qcountry';
import { StateGraph, StateEOptionalId, StateESelect, QStateQRelation } from './locality/qstate';
import { MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from './locality/qmetroarea';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ClientESelect extends IEntitySelectProperties, ClientEOptionalId {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentESelect;
    country?: CountryESelect;
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClientEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ClientEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ClientEUpdateProperties extends IEntityUpdateProperties {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentEOptionalId;
    country?: CountryEOptionalId;
    state?: StateEOptionalId;
    metroArea?: MetroAreaEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ClientGraph extends ClientEOptionalId, IEntityCascadeGraph {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentGraph;
    country?: CountryGraph;
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ClientEUpdateColumns extends IEntityUpdateColumns {
    DOMAIN?: string | IQStringField;
    GUID?: string | IQStringField;
    CONTINENT_ID?: number | IQNumberField;
    COUNTRY_ID?: number | IQNumberField;
    STATE_ID?: number | IQNumberField;
    METRO_AREA_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ClientECreateProperties extends Partial<ClientEId>, ClientEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ClientECreateColumns extends ClientEId, ClientEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QClient extends IQEntity {
    id: IQNumberField;
    domain: IQStringField;
    GUID: IQStringField;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
}
export interface QClientQId {
    id: IQNumberField;
}
export interface QClientQRelation extends IQRelation<QClient>, QClientQId {
}
//# sourceMappingURL=qclient.d.ts.map