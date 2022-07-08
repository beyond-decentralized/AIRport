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
	UserAccountGraph,
	UserAccountEId,
	UserAccountEOptionalId,
	UserAccountEUpdateProperties,
	UserAccountESelect,
	QUserAccount,
	QUserAccountQId,
	QUserAccountQRelation,
} from '../quserAccount';
import {
	IUserAccount,
} from '../userAccount';
import {
	IState,
} from './state';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface StateESelect
    extends IEntitySelectProperties, StateEOptionalId {
	// Non-Id Properties
	abbreviation?: string | IQStringField;
	name?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	country?: CountryESelect;
	metroAreaStates?: StateESelect;
	userAccounts?: UserAccountESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface StateEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface StateEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface StateEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	abbreviation?: string | IQStringField;
	name?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	country?: CountryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface StateGraph
	extends StateEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	abbreviation?: string | IQStringField;
	name?: string | IQStringField;

	// Relations
	country?: CountryGraph;
	metroAreaStates?: StateGraph[];
	userAccounts?: UserAccountGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface StateEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ABBREVIATION?: string | IQStringField;
	NAME?: string | IQStringField;
	COUNTRY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface StateECreateProperties
extends Partial<StateEId>, StateEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface StateECreateColumns
extends StateEId, StateEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QState extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	abbreviation: IQStringField;
	name: IQStringField;

	// Non-Id Relations
	country: QCountryQRelation;
	metroAreaStates: IQOneToManyRelation<QState>;
	userAccounts: IQOneToManyRelation<QUserAccount>;

}


// Entity Id Interface
export interface QStateQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QStateQRelation
	extends IQRelation<QState>, QStateQId {
}

