import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntitySearch,
	IEntitySearchOne,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	Address,
} from '../ddl/Address';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface AddressESelect
    extends IEntitySelectProperties, AddressEOptionalId {
	// Non-Id Properties
	latitude?: string | IQStringField;
	longitude?: string | IQStringField;
	streetNumber?: string | IQStringField;
	street?: string | IQStringField;
	town?: string | IQStringField;
	region?: string | IQStringField;
	country?: string | IQStringField;
	postalCode?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AddressEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface AddressEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AddressEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	latitude?: string | IQStringField;
	longitude?: string | IQStringField;
	streetNumber?: string | IQStringField;
	street?: string | IQStringField;
	town?: string | IQStringField;
	region?: string | IQStringField;
	country?: string | IQStringField;
	postalCode?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AddressGraph
	extends AddressEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	latitude?: string | IQStringField;
	longitude?: string | IQStringField;
	streetNumber?: string | IQStringField;
	street?: string | IQStringField;
	town?: string | IQStringField;
	region?: string | IQStringField;
	country?: string | IQStringField;
	postalCode?: string | IQStringField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface AddressEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
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
export interface AddressECreateProperties
extends Partial<AddressEId>, AddressEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AddressECreateColumns
extends AddressEId, AddressEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAddress extends IQEntity<Address>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	latitude: IQStringField;
	longitude: IQStringField;
	streetNumber: IQStringField;
	street: IQStringField;
	town: IQStringField;
	region: IQStringField;
	country: IQStringField;
	postalCode: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QAddressQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QAddressQRelation
	extends IQRelation<Address, QAddress>, QAddressQId {
}

