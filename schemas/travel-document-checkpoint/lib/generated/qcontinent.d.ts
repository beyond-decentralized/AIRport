import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { CountryGraph, CountryESelect, QCountry } from './qcountry';
import { Country } from '../ddl/Country';
import { Continent } from '../ddl/Continent';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ContinentESelect extends IEntitySelectProperties, ContinentEOptionalId {
    name?: string | IQStringField;
    countries?: CountryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ContinentEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ContinentEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ContinentEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ContinentGraph extends ContinentEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    countries?: CountryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ContinentEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ContinentECreateProperties extends Partial<ContinentEId>, ContinentEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ContinentECreateColumns extends ContinentEId, ContinentEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QContinent extends IQEntity<Continent> {
    id: IQNumberField;
    name: IQStringField;
    countries: IQOneToManyRelation<Country, QCountry>;
}
export interface QContinentQId {
    id: IQNumberField;
}
export interface QContinentQRelation extends IQRelation<Continent, QContinent>, QContinentQId {
}
//# sourceMappingURL=qcontinent.d.ts.map