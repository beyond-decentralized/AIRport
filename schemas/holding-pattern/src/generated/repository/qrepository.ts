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
	IUserAccount,
	ContinentGraph,
	ContinentEId,
	ContinentEOptionalId,
	ContinentEUpdateProperties,
	ContinentESelect,
	QContinent,
	QContinentQId,
	QContinentQRelation,
	IContinent,
	CountryGraph,
	CountryEId,
	CountryEOptionalId,
	CountryEUpdateProperties,
	CountryESelect,
	QCountry,
	QCountryQId,
	QCountryQRelation,
	ICountry,
	StateGraph,
	StateEId,
	StateEOptionalId,
	StateEUpdateProperties,
	StateESelect,
	QState,
	QStateQId,
	QStateQRelation,
	IState,
	MetroAreaGraph,
	MetroAreaEId,
	MetroAreaEOptionalId,
	MetroAreaEUpdateProperties,
	MetroAreaESelect,
	QMetroArea,
	QMetroAreaQId,
	QMetroAreaQRelation,
	IMetroArea,
} from '@airport/travel-document-checkpoint';
import {
	RepositoryTransactionHistoryGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from '../history/qRepositoryTransactionHistory';
import {
	IRepositoryTransactionHistory,
} from '../history/RepositoryTransactionHistory';
import {
	RepositoryApplicationGraph,
	RepositoryApplicationEId,
	RepositoryApplicationEOptionalId,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationESelect,
	QRepositoryApplication,
	QRepositoryApplicationQId,
	QRepositoryApplicationQRelation,
} from './qRepositoryApplication';
import {
	IRepositoryApplication,
} from './RepositoryApplication';
import {
	RepositoryClientGraph,
	RepositoryClientEId,
	RepositoryClientEOptionalId,
	RepositoryClientEUpdateProperties,
	RepositoryClientESelect,
	QRepositoryClient,
	QRepositoryClientQId,
	QRepositoryClientQRelation,
} from './qRepositoryClient';
import {
	IRepositoryClient,
} from './RepositoryClient';
import {
	RepositoryDatabaseGraph,
	RepositoryDatabaseEId,
	RepositoryDatabaseEOptionalId,
	RepositoryDatabaseEUpdateProperties,
	RepositoryDatabaseESelect,
	QRepositoryDatabase,
	QRepositoryDatabaseQId,
	QRepositoryDatabaseQRelation,
} from './qRepositoryDatabase';
import {
	IRepositoryDatabase,
} from './RepositoryDatabase';
import {
	RepositoryTerminalGraph,
	RepositoryTerminalEId,
	RepositoryTerminalEOptionalId,
	RepositoryTerminalEUpdateProperties,
	RepositoryTerminalESelect,
	QRepositoryTerminal,
	QRepositoryTerminalQId,
	QRepositoryTerminalQRelation,
} from './qRepositoryTerminal';
import {
	IRepositoryTerminal,
} from './RepositoryTerminal';
import {
	RepositoryTypeGraph,
	RepositoryTypeEId,
	RepositoryTypeEOptionalId,
	RepositoryTypeEUpdateProperties,
	RepositoryTypeESelect,
	QRepositoryType,
	QRepositoryTypeQId,
	QRepositoryTypeQRelation,
} from './qRepositoryType';
import {
	IRepositoryType,
} from './RepositoryType';
import {
	IRepository,
} from './Repository';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect
    extends IEntitySelectProperties, RepositoryEOptionalId {
	// Non-Id Properties
	GUID?: string | IQStringField;
	name?: string | IQStringField;
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	immutable?: boolean | IQBooleanField;
	source?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserAccountESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
	continent?: ContinentESelect;
	country?: CountryESelect;
	state?: StateESelect;
	metroArea?: MetroAreaESelect;
	repositoryApplications?: RepositoryApplicationESelect;
	repositoryClients?: RepositoryClientESelect;
	repositoryDatabases?: RepositoryDatabaseESelect;
	repositoryTerminals?: RepositoryTerminalESelect;
	repositoryTypes?: RepositoryTypeESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	GUID?: string | IQStringField;
	name?: string | IQStringField;
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	immutable?: boolean | IQBooleanField;
	source?: string | IQStringField;

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
export interface RepositoryGraph
	extends RepositoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	GUID?: string | IQStringField;
	name?: string | IQStringField;
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	immutable?: boolean | IQBooleanField;
	source?: string | IQStringField;

	// Relations
	owner?: UserAccountGraph;
	repositoryTransactionHistory?: RepositoryTransactionHistoryGraph[];
	continent?: ContinentGraph;
	country?: CountryGraph;
	state?: StateGraph;
	metroArea?: MetroAreaGraph;
	repositoryApplications?: RepositoryApplicationGraph[];
	repositoryClients?: RepositoryClientGraph[];
	repositoryDatabases?: RepositoryDatabaseGraph[];
	repositoryTerminals?: RepositoryTerminalGraph[];
	repositoryTypes?: RepositoryTypeGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	GUID?: string | IQStringField;
	NAME?: string | IQStringField;
	AGE_SUITABILITY?: number | IQNumberField;
	CREATED_AT?: Date | IQDateField;
	IMMUTABLE?: boolean | IQBooleanField;
	SOURCE?: string | IQStringField;
	OWNER_USER_ACCOUNT_LID?: number | IQNumberField;
	CONTINENT_ID?: number | IQNumberField;
	COUNTRY_ID?: number | IQNumberField;
	STATE_ID?: number | IQNumberField;
	METRO_AREA_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties
extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns
extends RepositoryEId, RepositoryEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepository<IQE extends QRepository = any> extends IQEntity<IQE | QRepository>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	GUID: IQStringField;
	name: IQStringField;
	ageSuitability: IQNumberField;
	createdAt: IQDateField;
	immutable: IQBooleanField;
	source: IQStringField;

	// Non-Id Relations
	owner: QUserAccountQRelation;
	repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;
	continent: QContinentQRelation;
	country: QCountryQRelation;
	state: QStateQRelation;
	metroArea: QMetroAreaQRelation;
	repositoryApplications: IQOneToManyRelation<QRepositoryApplication>;
	repositoryClients: IQOneToManyRelation<QRepositoryClient>;
	repositoryDatabases: IQOneToManyRelation<QRepositoryDatabase>;
	repositoryTerminals: IQOneToManyRelation<QRepositoryTerminal>;
	repositoryTypes: IQOneToManyRelation<QRepositoryType>;

}

// Entity Id Interface
export interface QRepositoryQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryQRelation
	extends IQRelation<QRepository>, QRepositoryQId {
}