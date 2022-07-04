import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation } from './qcontinent';
import { UserGraph, UserESelect, QUser } from '../quser';
/**
 * SELECT - All fields and relations (optional).
 */
export interface CountryESelect extends IEntitySelectProperties, CountryEOptionalId {
    name?: string | IQStringField;
    continent?: ContinentESelect;
    users?: UserESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface CountryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface CountryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface CountryEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
    continent?: ContinentEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface CountryGraph extends CountryEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    continent?: ContinentGraph;
    users?: UserGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface CountryEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    CONTINENT_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface CountryECreateProperties extends Partial<CountryEId>, CountryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface CountryECreateColumns extends CountryEId, CountryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QCountry extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    continent: QContinentQRelation;
    users: IQOneToManyRelation<QUser>;
}
export interface QCountryQId {
    id: IQNumberField;
}
export interface QCountryQRelation extends IQRelation<QCountry>, QCountryQId {
}
//# sourceMappingURL=qcountry.d.ts.map