import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
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
} from '@airport/tarmaq-query';
import {
	DomainGraph,
	DomainEId,
	DomainEOptionalId,
	DomainEUpdateProperties,
	DomainESelect,
	QDomain,
	QDomainQId,
	QDomainQRelation,
	IDomain,
} from '@airport/airspace';
import {
	ContinentGraph,
	ContinentEId,
	ContinentEOptionalId,
	ContinentEUpdateProperties,
	ContinentESelect,
	QContinent,
	QContinentQId,
	QContinentQRelation,
} from './locality/QContinent';
import {
	IContinent,
} from '../entity/locality/IContinent';
import {
	CountryGraph,
	CountryEId,
	CountryEOptionalId,
	CountryEUpdateProperties,
	CountryESelect,
	QCountry,
	QCountryQId,
	QCountryQRelation,
} from './locality/QCountry';
import {
	ICountry,
} from '../entity/locality/ICountry';
import {
	StateGraph,
	StateEId,
	StateEOptionalId,
	StateEUpdateProperties,
	StateESelect,
	QState,
	QStateQId,
	QStateQRelation,
} from './locality/QState';
import {
	IState,
} from '../entity/locality/IState';
import {
	MetroAreaGraph,
	MetroAreaEId,
	MetroAreaEOptionalId,
	MetroAreaEUpdateProperties,
	MetroAreaESelect,
	QMetroArea,
	QMetroAreaQId,
	QMetroAreaQRelation,
} from './locality/QMetroArea';
import {
	IMetroArea,
} from '../entity/locality/IMetroArea';
import {
	IUserAccount,
} from '../entity/IUserAccount';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface UserAccountESelect
    extends IEntitySelectProperties, UserAccountEOptionalId {
	// Non-Id Properties
	email?: string | IQStringField;
	passwordHash?: string | IQStringField;
	ranking?: number | IQNumberField;
	username?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainESelect;
	continent?: ContinentESelect;
	country?: CountryESelect;
	state?: StateESelect;
	metroArea?: MetroAreaESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserAccountEId
    extends IEntityIdProperties {
	// Id Properties
	GUID?: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserAccountEOptionalId {
	// Id Properties
	GUID?: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserAccountEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	email?: string | IQStringField;
	passwordHash?: string | IQStringField;
	ranking?: number | IQNumberField;
	username?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	domain?: DomainEOptionalId;
	continent?: ContinentEOptionalId;
	country?: CountryEOptionalId;
	state?: StateEOptionalId;
	metroArea?: MetroAreaEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserAccountGraph
	extends UserAccountEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	email?: string | IQStringField;
	passwordHash?: string | IQStringField;
	ranking?: number | IQNumberField;
	username?: string | IQStringField;

	// Relations
	domain?: DomainGraph;
	continent?: ContinentGraph;
	country?: CountryGraph;
	state?: StateGraph;
	metroArea?: MetroAreaGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserAccountEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	EMAIL?: string | IQStringField;
	PASSWORD_HASH?: string | IQStringField;
	RANKING?: number | IQNumberField;
	USERNAME?: string | IQStringField;
	DOMAIN_LID?: number | IQNumberField;
	CONTINENT_ID?: number | IQNumberField;
	COUNTRY_ID?: number | IQNumberField;
	STATE_ID?: number | IQNumberField;
	METRO_AREA_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserAccountECreateProperties
extends Partial<UserAccountEId>, UserAccountEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserAccountECreateColumns
extends UserAccountEId, UserAccountEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUserAccount<IQE extends QUserAccount = any> extends IQEntity<IQE | QUserAccount>
{
	// Id Fields
	GUID: IQStringField;

	// Id Relations

	// Non-Id Fields
	email: IQStringField;
	passwordHash: IQStringField;
	ranking: IQNumberField;
	username: IQStringField;

	// Non-Id Relations
	domain: QDomainQRelation;
	continent: QContinentQRelation;
	country: QCountryQRelation;
	state: QStateQRelation;
	metroArea: QMetroAreaQRelation;

}

// Entity Id Interface
export interface QUserAccountQId
{
	
	// Id Fields
	GUID: IQStringField;

	// Id Relations


}

// Entity Relation Interface
export interface QUserAccountQRelation
	extends IQRelation<QUserAccount>, QUserAccountQId {
}