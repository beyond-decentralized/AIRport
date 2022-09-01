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
	UserAccountGraph,
	UserAccountEId,
	UserAccountEOptionalId,
	UserAccountEUpdateProperties,
	UserAccountESelect,
	QUserAccount,
	QUserAccountQId,
	QUserAccountQRelation,
} from '../quseraccount';
import {
	IUserAccount,
} from '../useraccount';
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
	TerminalTypeGraph,
	TerminalTypeEId,
	TerminalTypeEOptionalId,
	TerminalTypeEUpdateProperties,
	TerminalTypeESelect,
	QTerminalType,
	QTerminalTypeQId,
	QTerminalTypeQRelation,
} from './qterminaltype';
import {
	ITerminalType,
} from './terminaltype';
import {
	ITerminal,
} from './terminal';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect
    extends IEntitySelectProperties, TerminalEOptionalId {
	// Non-Id Properties
	GUID?: string | IQStringField;
	isLocal?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserAccountESelect;
	continent?: ContinentESelect;
	country?: CountryESelect;
	state?: StateESelect;
	metroArea?: MetroAreaESelect;
	terminalTypes?: TerminalTypeESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TerminalEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	GUID?: string | IQStringField;
	isLocal?: boolean | IQBooleanField;

	// Non-Id Relations - _localIds only & no OneToMany's
	owner?: UserAccountEOptionalId;
	continent?: ContinentEOptionalId;
	country?: CountryEOptionalId;
	state?: StateEOptionalId;
	metroArea?: MetroAreaEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalGraph
	extends TerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	GUID?: string | IQStringField;
	isLocal?: boolean | IQBooleanField;

	// Relations
	owner?: UserAccountGraph;
	continent?: ContinentGraph;
	country?: CountryGraph;
	state?: StateGraph;
	metroArea?: MetroAreaGraph;
	terminalTypes?: TerminalTypeGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	GUID?: string | IQStringField;
	IS_LOCAL?: boolean | IQBooleanField;
	OWNER_USER_ACCOUNT_LID?: number | IQNumberField;
	CONTINENT_ID?: number | IQNumberField;
	COUNTRY_ID?: number | IQNumberField;
	STATE_ID?: number | IQNumberField;
	METRO_AREA_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalECreateProperties
extends Partial<TerminalEId>, TerminalEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalECreateColumns
extends TerminalEId, TerminalEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QTerminal<IQE extends QTerminal = any> extends IQEntity<IQE | QTerminal>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	GUID: IQStringField;
	isLocal: IQBooleanField;

	// Non-Id Relations
	owner: QUserAccountQRelation;
	continent: QContinentQRelation;
	country: QCountryQRelation;
	state: QStateQRelation;
	metroArea: QMetroAreaQRelation;
	terminalTypes: IQOneToManyRelation<QTerminalType>;

}

// Entity Id Interface
export interface QTerminalQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QTerminalQRelation
	extends IQRelation<QTerminal>, QTerminalQId {
}