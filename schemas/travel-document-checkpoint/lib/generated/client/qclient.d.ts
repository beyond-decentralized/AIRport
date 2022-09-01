import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from '../locality/qcontinent';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from '../locality/qcountry';
import { StateGraph, StateEOptionalId, StateESelect, QStateQRelation } from '../locality/qstate';
import { MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from '../locality/qmetroarea';
import { ClientTypeGraph, ClientTypeESelect, QClientType } from './qclienttype';
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
    clientTypes?: ClientTypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClientEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ClientEOptionalId {
    _localId?: number | IQNumberField;
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
    clientTypes?: ClientTypeGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ClientEUpdateColumns extends IEntityUpdateColumns {
    CLIENT_DOMAIN?: string | IQStringField;
    CLIENT_GUID?: string | IQStringField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QClient<IQE extends QClient = any> extends IQEntity<IQE | QClient> {
    _localId: IQNumberField;
    domain: IQStringField;
    GUID: IQStringField;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
    clientTypes: IQOneToManyRelation<QClientType>;
}
export interface QClientQId {
    _localId: IQNumberField;
}
export interface QClientQRelation extends IQRelation<QClient>, QClientQId {
}
//# sourceMappingURL=qclient.d.ts.map