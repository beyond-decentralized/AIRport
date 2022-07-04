import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { CountryGraph, CountryESelect, QCountry } from './qcountry';
import { UserGraph, UserESelect, QUser } from '../quser';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ContinentESelect extends IEntitySelectProperties, ContinentEOptionalId {
    name?: string | IQStringField;
    countries?: CountryESelect;
    users?: UserESelect;
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
    users?: UserGraph[];
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QContinent extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    countries: IQOneToManyRelation<QCountry>;
    users: IQOneToManyRelation<QUser>;
}
export interface QContinentQId {
    id: IQNumberField;
}
export interface QContinentQRelation extends IQRelation<QContinent>, QContinentQId {
}
//# sourceMappingURL=qcontinent.d.ts.map