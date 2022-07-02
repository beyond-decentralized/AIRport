import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation } from '../quser';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from '../locality/qcontinent';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from '../locality/qcountry';
import { TerminalTypeGraph, TerminalTypeESelect, QTerminalType } from './qterminaltype';
import { StateGraph, StateEOptionalId, StateESelect, QStateQRelation } from '../locality/qstate';
import { MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from '../locality/qmetroarea';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect extends IEntitySelectProperties, TerminalEOptionalId {
    GUID?: string | IQStringField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserESelect;
    continent?: ContinentESelect;
    country?: CountryESelect;
    terminalTypes?: TerminalTypeESelect;
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalEUpdateProperties extends IEntityUpdateProperties {
    GUID?: string | IQStringField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserEOptionalId;
    continent?: ContinentEOptionalId;
    country?: CountryEOptionalId;
    state?: StateEOptionalId;
    metroArea?: MetroAreaEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalGraph extends TerminalEOptionalId, IEntityCascadeGraph {
    GUID?: string | IQStringField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserGraph;
    continent?: ContinentGraph;
    country?: CountryGraph;
    terminalTypes?: TerminalTypeGraph[];
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns extends IEntityUpdateColumns {
    GUID?: string | IQStringField;
    IS_LOCAL?: boolean | IQBooleanField;
    OWNER_USER_ID?: number | IQNumberField;
    CONTINENT_ID?: number | IQNumberField;
    COUNTRY_ID?: number | IQNumberField;
    STATE_ID?: number | IQNumberField;
    METRO_AREA_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalECreateProperties extends Partial<TerminalEId>, TerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalECreateColumns extends TerminalEId, TerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminal extends IQEntity {
    id: IQNumberField;
    GUID: IQStringField;
    isLocal: IQBooleanField;
    owner: QUserQRelation;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    terminalTypes: IQOneToManyRelation<QTerminalType>;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
}
export interface QTerminalQId {
    id: IQNumberField;
}
export interface QTerminalQRelation extends IQRelation<QTerminal>, QTerminalQId {
}
//# sourceMappingURL=qterminal.d.ts.map