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
} from '../locality/qcontinent';
import {
	IContinent,
} from '../locality/continent';
import {
	CountryGraph,
	CountryEId,
	CountryEOptionalId,
	CountryEUpdateProperties,
	CountryESelect,
	QCountry,
	QCountryQId,
	QCountryQRelation,
} from '../locality/qcountry';
import {
	ICountry,
} from '../locality/country';
import {
	StateGraph,
	StateEId,
	StateEOptionalId,
	StateEUpdateProperties,
	StateESelect,
	QState,
	QStateQId,
	QStateQRelation,
} from '../locality/qstate';
import {
	IState,
} from '../locality/state';
import {
	MetroAreaGraph,
	MetroAreaEId,
	MetroAreaEOptionalId,
	MetroAreaEUpdateProperties,
	MetroAreaESelect,
	QMetroArea,
	QMetroAreaQId,
	QMetroAreaQRelation,
} from '../locality/qmetroarea';
import {
	IMetroArea,
} from '../locality/metroarea';
import {
	DatabaseTypeGraph,
	DatabaseTypeEId,
	DatabaseTypeEOptionalId,
	DatabaseTypeEUpdateProperties,
	DatabaseTypeESelect,
	QDatabaseType,
	QDatabaseTypeQId,
	QDatabaseTypeQRelation,
} from './qdatabasetype';
import {
	IDatabaseType,
} from './databasetype';
import {
	IDatabase,
} from './database';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseESelect
	extends IEntitySelectProperties, DatabaseEOptionalId {
	// Non-Id Properties
	domain?: string | IQStringField;
	GUID?: string | IQStringField;

	// Id Relations - full property interfaces

	// Non-Id relations (including OneToMany's)
	continent?: ContinentESelect;
	country?: CountryESelect;
	state?: StateESelect;
	metroArea?: MetroAreaESelect;
	databaseTypes?: DatabaseTypeESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseEId
	extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseEUpdateProperties
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
export interface DatabaseGraph
	extends DatabaseEOptionalId, IEntityCascadeGraph {
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
	databaseTypes?: DatabaseTypeGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DatabaseEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	DATABASE_DOMAIN?: string | IQStringField;
	DATABASE_GUID?: string | IQStringField;
	CONTINENT_ID?: number | IQNumberField;
	COUNTRY_ID?: number | IQNumberField;
	STATE_ID?: number | IQNumberField;
	METRO_AREA_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseECreateProperties
	extends Partial<DatabaseEId>, DatabaseEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DatabaseECreateColumns
	extends DatabaseEId, DatabaseEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QDatabase extends IQEntity {
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
	databaseTypes: IQOneToManyRelation<QDatabaseType>;

}


// Entity Id Interface
export interface QDatabaseQId {

	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QDatabaseQRelation
	extends IQRelation<QDatabase>, QDatabaseQId {
}

