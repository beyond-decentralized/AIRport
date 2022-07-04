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
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
import {
	ContinentGraph,
	ContinentEId,
	ContinentEOptionalId,
	ContinentEUpdateProperties,
	ContinentESelect,
	QContinent,
	QContinentQId,
	QContinentQRelation,
} from './qcontinent';
import {
	IContinent,
} from './continent';
import {
	UserGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from '../quser';
import {
	IUser,
} from '../user';
import {
	ICountry,
} from './country';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface CountryESelect
    extends IEntitySelectProperties, CountryEOptionalId {
	// Non-Id Properties
	name?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	continent?: ContinentESelect;
	users?: UserESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface CountryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface CountryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface CountryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	continent?: ContinentEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface CountryGraph
	extends CountryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	name?: string | IQStringField;

	// Relations
	continent?: ContinentGraph;
	users?: UserGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface CountryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;
	CONTINENT_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface CountryECreateProperties
extends Partial<CountryEId>, CountryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface CountryECreateColumns
extends CountryEId, CountryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QCountry extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;

	// Non-Id Relations
	continent: QContinentQRelation;
	users: IQOneToManyRelation<QUser>;

}


// Entity Id Interface
export interface QCountryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QCountryQRelation
	extends IQRelation<QCountry>, QCountryQId {
}

