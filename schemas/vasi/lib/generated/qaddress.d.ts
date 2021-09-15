import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { Address } from '../ddl/Address';
/**
 * SELECT - All fields and relations (optional).
 */
export interface AddressESelect extends IEntitySelectProperties, AddressEOptionalId {
    latitude?: string | IQStringField;
    longitude?: string | IQStringField;
    streetNumber?: string | IQStringField;
    street?: string | IQStringField;
    town?: string | IQStringField;
    region?: string | IQStringField;
    country?: string | IQStringField;
    postalCode?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AddressEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AddressEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AddressEUpdateProperties extends IEntityUpdateProperties {
    latitude?: string | IQStringField;
    longitude?: string | IQStringField;
    streetNumber?: string | IQStringField;
    street?: string | IQStringField;
    town?: string | IQStringField;
    region?: string | IQStringField;
    country?: string | IQStringField;
    postalCode?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AddressGraph extends AddressEOptionalId, IEntityCascadeGraph {
    latitude?: string | IQStringField;
    longitude?: string | IQStringField;
    streetNumber?: string | IQStringField;
    street?: string | IQStringField;
    town?: string | IQStringField;
    region?: string | IQStringField;
    country?: string | IQStringField;
    postalCode?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AddressEUpdateColumns extends IEntityUpdateColumns {
    LATITUDE?: string | IQStringField;
    LONGITUDE?: string | IQStringField;
    STREET_NUMBER?: string | IQStringField;
    STREET?: string | IQStringField;
    TOWN?: string | IQStringField;
    REGION?: string | IQStringField;
    COUNTRY?: string | IQStringField;
    POSTAL_CODE?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AddressECreateProperties extends Partial<AddressEId>, AddressEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AddressECreateColumns extends AddressEId, AddressEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAddress extends IQEntity<Address> {
    id: IQNumberField;
    latitude: IQStringField;
    longitude: IQStringField;
    streetNumber: IQStringField;
    street: IQStringField;
    town: IQStringField;
    region: IQStringField;
    country: IQStringField;
    postalCode: IQStringField;
}
export interface QAddressQId {
    id: IQNumberField;
}
export interface QAddressQRelation extends IQRelation<Address, QAddress>, QAddressQId {
}
//# sourceMappingURL=qaddress.d.ts.map