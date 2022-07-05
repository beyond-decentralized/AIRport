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
	CountryGraph,
	CountryEId,
	CountryEOptionalId,
	CountryEUpdateProperties,
	CountryESelect,
	QCountry,
	QCountryQId,
	QCountryQRelation,
} from './qcountry';
import {
	ICountry,
} from './country';
import {
	MetroAreaStateGraph,
	MetroAreaStateEId,
	MetroAreaStateEOptionalId,
	MetroAreaStateEUpdateProperties,
	MetroAreaStateESelect,
	QMetroAreaState,
	QMetroAreaStateQId,
	QMetroAreaStateQRelation,
} from './qmetroareastate';
import {
	IMetroAreaState,
} from './metroareastate';
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
	IMetroArea,
} from './metroarea';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MetroAreaESelect
    extends IEntitySelectProperties, MetroAreaEOptionalId {
	// Non-Id Properties
	name?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	country?: CountryESelect;
	metroAreaStates?: MetroAreaStateESelect;
	users?: UserESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MetroAreaEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MetroAreaEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MetroAreaEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	country?: CountryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MetroAreaGraph
	extends MetroAreaEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	name?: string | IQStringField;

	// Relations
	country?: CountryGraph;
	metroAreaStates?: MetroAreaStateGraph[];
	users?: UserGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MetroAreaEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;
	COUNTRY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MetroAreaECreateProperties
extends Partial<MetroAreaEId>, MetroAreaEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MetroAreaECreateColumns
extends MetroAreaEId, MetroAreaEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QMetroArea extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;

	// Non-Id Relations
	country: QCountryQRelation;
	metroAreaStates: IQOneToManyRelation<QMetroAreaState>;
	users: IQOneToManyRelation<QUser>;

}


// Entity Id Interface
export interface QMetroAreaQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QMetroAreaQRelation
	extends IQRelation<QMetroArea>, QMetroAreaQId {
}

