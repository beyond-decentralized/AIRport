import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from '../locality/qcontinent';
import { CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation } from '../locality/qcountry';
import { StateGraph, StateEOptionalId, StateESelect, QStateQRelation } from '../locality/qstate';
import { MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from '../locality/qmetroarea';
import { DatabaseTypeGraph, DatabaseTypeESelect, QDatabaseType } from './qdatabasetype';
/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseESelect extends IEntitySelectProperties, DatabaseEOptionalId {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentESelect;
    country?: CountryESelect;
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
    databaseTypes?: DatabaseTypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseEUpdateProperties extends IEntityUpdateProperties {
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
export interface DatabaseGraph extends DatabaseEOptionalId, IEntityCascadeGraph {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
    continent?: ContinentGraph;
    country?: CountryGraph;
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
    databaseTypes?: DatabaseTypeGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DatabaseEUpdateColumns extends IEntityUpdateColumns {
    DATABASE_DOMAIN?: string | IQStringField;
    DATABASE_GUID?: string | IQStringField;
    CONTINENT_ID?: number | IQNumberField;
    COUNTRY_ID?: number | IQNumberField;
    STATE_ID?: number | IQNumberField;
    METRO_AREA_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseECreateProperties extends Partial<DatabaseEId>, DatabaseEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DatabaseECreateColumns extends DatabaseEId, DatabaseEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QDatabase<IQE extends QDatabase = any> extends IQEntity<IQE | QDatabase> {
    _localId: IQNumberField;
    domain: IQStringField;
    GUID: IQStringField;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
    databaseTypes: IQOneToManyRelation<QDatabaseType>;
}
export interface QDatabaseQId {
    _localId: IQNumberField;
}
export interface QDatabaseQRelation extends IQRelation<QDatabase>, QDatabaseQId {
}
//# sourceMappingURL=qdatabase.d.ts.map