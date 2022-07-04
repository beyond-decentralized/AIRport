import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation } from '../quser';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from '../locality/qcontinent';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from '../locality/qcountry';
import { StateGraph, StateEOptionalId, StateESelect, QStateQRelation } from '../locality/qstate';
import { MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from '../locality/qmetroarea';
import { TerminalTypeGraph, TerminalTypeESelect, QTerminalType } from './qterminaltype';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect extends IEntitySelectProperties, TerminalEOptionalId {
    GUID?: string | IQStringField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserESelect;
    continent?: ContinentESelect;
    country?: CountryESelect;
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
    terminalTypes?: TerminalTypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalEOptionalId {
    _localId?: number | IQNumberField;
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
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
    terminalTypes?: TerminalTypeGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns extends IEntityUpdateColumns {
    GUID?: string | IQStringField;
    IS_LOCAL?: boolean | IQBooleanField;
    OWNER_USER_LID?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QTerminal extends IQEntity {
    _localId: IQNumberField;
    GUID: IQStringField;
    isLocal: IQBooleanField;
    owner: QUserQRelation;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
    terminalTypes: IQOneToManyRelation<QTerminalType>;
}
export interface QTerminalQId {
    _localId: IQNumberField;
}
export interface QTerminalQRelation extends IQRelation<QTerminal>, QTerminalQId {
}
//# sourceMappingURL=qterminal.d.ts.map