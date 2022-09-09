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
	ContinentGraph,
	ContinentEId,
	ContinentEOptionalId,
	ContinentEUpdateProperties,
	ContinentESelect,
	QContinent,
	QContinentQId,
	QContinentQRelation,
} from '../locality/QContinent';
import {
	IContinent,
} from '../../entity/locality/IContinent';
import {
	CountryGraph,
	CountryEId,
	CountryEOptionalId,
	CountryEUpdateProperties,
	CountryESelect,
	QCountry,
	QCountryQId,
	QCountryQRelation,
} from '../locality/QCountry';
import {
	ICountry,
} from '../../entity/locality/ICountry';
import {
	StateGraph,
	StateEId,
	StateEOptionalId,
	StateEUpdateProperties,
	StateESelect,
	QState,
	QStateQId,
	QStateQRelation,
} from '../locality/QState';
import {
	IState,
} from '../../entity/locality/IState';
import {
	MetroAreaGraph,
	MetroAreaEId,
	MetroAreaEOptionalId,
	MetroAreaEUpdateProperties,
	MetroAreaESelect,
	QMetroArea,
	QMetroAreaQId,
	QMetroAreaQRelation,
} from '../locality/QMetroArea';
import {
	IMetroArea,
} from '../../entity/locality/IMetroArea';
import {
	ClientTypeGraph,
	ClientTypeEId,
	ClientTypeEOptionalId,
	ClientTypeEUpdateProperties,
	ClientTypeESelect,
	QClientType,
	QClientTypeQId,
	QClientTypeQRelation,
} from './QClientType';
import {
	IClientType,
} from '../../entity/client/IClientType';
import {
	IClient,
} from '../../entity/client/IClient';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ClientESelect
    extends IEntitySelectProperties, ClientEOptionalId {
	// Non-Id Properties
	domain?: string | IQStringField;
	GUID?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	continent?: ContinentESelect;
	country?: CountryESelect;
	state?: StateESelect;
	metroArea?: MetroAreaESelect;
	clientTypes?: ClientTypeESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClientEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ClientEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ClientEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	domain?: string | IQStringField;
	GUID?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	continent?: ContinentEOptionalId;
	country?: CountryEOptionalId;
	state?: StateEOptionalId;
	metroArea?: MetroAreaEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ClientGraph
	extends ClientEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	domain?: string | IQStringField;
	GUID?: string | IQStringField;

	// Relations
	continent?: ContinentGraph;
	country?: CountryGraph;
	state?: StateGraph;
	metroArea?: MetroAreaGraph;
	clientTypes?: ClientTypeGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ClientEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	CLIENT_DOMAIN?: string | IQStringField;
	CLIENT_GUID?: string | IQStringField;
	CONTINENT_ID?: number | IQNumberField;
	COUNTRY_ID?: number | IQNumberField;
	STATE_ID?: number | IQNumberField;
	METRO_AREA_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ClientECreateProperties
extends Partial<ClientEId>, ClientEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ClientECreateColumns
extends ClientEId, ClientEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QClient<IQE extends QClient = any> extends IQEntity<IQE | QClient>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	domain: IQStringField;
	GUID: IQStringField;

	// Non-Id Relations
	continent: QContinentQRelation;
	country: QCountryQRelation;
	state: QStateQRelation;
	metroArea: QMetroAreaQRelation;
	clientTypes: IQOneToManyRelation<QClientType>;

}

// Entity Id Interface
export interface QClientQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QClientQRelation
	extends IQRelation<QClient>, QClientQId {
}