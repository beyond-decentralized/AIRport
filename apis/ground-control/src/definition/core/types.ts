import { InternalUserAccount } from "@airport/aviation-communication";
import { Application_FullName, DbApplication, DbDomain } from "../application/Application";
import { IRepositoryTransactionHistory } from "./synchronizationTypes";

export interface IRootTransaction {
	numberOfOperations: number
	// Only one new repository can be created at at time
	newRepository?: IRepository
}

export interface IUserAccount
	extends InternalUserAccount {

	domain?: DbDomain
	continent?: IContinent
	country?: ICountry
	state?: IState
	metroArea?: IMetroArea

}

export type Actor_LocalId = number;
export type Actor_GUID = string;

export interface IActor {

	// Id Properties
	_localId: Actor_LocalId

	// Id Relations

	// Non-Id Properties
	GUID?: Actor_GUID

	// Non-Id Relations
	userAccount?: IUserAccount

	terminal?: ITerminal

	application?: DbApplication

	// Transient Properties

	// Public Methods

}

export type AgeSuitability = number
export type CreatedAt = Date

export type Repository_GUID = string;
export type Repository_Immutable = boolean;
export type Repository_LocalId = number;
export type Repository_Name = string;
export type Repository_Source = string;
export type Repository_UiEntryUri = string;
export interface IRepositoryIdentifier {
	source?: Repository_Source;
	GUID?: Repository_GUID;
}
export interface IRepository {

	// Id Properties
	_localId: Repository_LocalId;

	// Id Relations

	// Non-Id Properties
	ageSuitability?: AgeSuitability;
	createdAt?: CreatedAt;
	fullApplicationName?: Application_FullName;
	GUID?: Repository_GUID;
	immutable?: Repository_Immutable;
	name?: Repository_Name;
	source?: Repository_Source;
	uiEntryUri?: Repository_UiEntryUri;
	areDependenciesLoaded?: boolean

	// Non-Id Relations
	owner?: IUserAccount;
	continent?: IContinent
	country?: ICountry
	state?: IState
	metroArea?: IMetroArea
	repositoryMembers?: IRepositoryMember[]
	repositoryTransactionHistory?: IRepositoryTransactionHistory[]
	repositoryApplications?: IRepositoryApplication[]
	repositoryClients?: IRepositoryClient[]
	repositoryDatabases?: IRepositoryDatabase[]
	repositoryTerminals?: IRepositoryTerminal[]
	repositoryTypes?: IRepositoryType[]

	// Transient Properties

	// Public Methods

}

export interface IRepositoryApplication {

	application: DbApplication
	repository: IRepository

}

export interface IRepositoryClient {

	repository: IRepository
	client: IClient

}

export interface IRepositoryDatabase {

	repository: IRepository
	database: IDatabase

}
export type Database_LocalId = number
export type Database_Domain = string
export type Database_GUID = string
export interface IDatabase {

	_localId: Database_LocalId
	domain?: Database_Domain
	GUID?: Database_GUID
	continent?: IContinent
	country?: ICountry
	state?: IState
	metroArea?: IMetroArea
	databaseTypes?: IDatabaseType[]

}

export interface IDatabaseType {

	database: IDatabase
	type: IType

}

export interface IRepositoryTerminal {

	repository: IRepository
	terminal: ITerminal

}

export interface IRepositoryType {

	repository: IRepository
	type: IType

}

export type Client_LocalId = number
export type Client_Domain = string
export type Client_GUID = string
export interface IClient {

	_localId: Client_LocalId
	domain?: Client_Domain
	GUID?: Client_GUID
	continent?: IContinent
	country?: ICountry
	state?: IState
	metroArea?: IMetroArea
	clientTypes?: IClientType[]

}

export interface IClientType {

	client: IClient
	type: IType

}


export type RepositoryMember_LocalId = number
export type RepositoryMember_GUID = string
export type RepositoryMember_IsOwner = boolean
export type RepositoryMember_IsAdministrator = boolean
export type RepositoryMember_CanWrite = boolean
export type RepositoryMember_PublicSigningKey = string

export interface IRepositoryMember {

	_localId: RepositoryMember_LocalId
	canWrite?: RepositoryMember_CanWrite
	GUID?: RepositoryMember_GUID
	isOwner?: RepositoryMember_IsOwner
	isAdministrator?: RepositoryMember_IsAdministrator
	publicSigningKey?: RepositoryMember_PublicSigningKey
	repository?: IRepository
	userAccount?: IUserAccount

}

export type SystemWideOperationId = number
export type ActorRecordId = number
export type AirEntity_Id = string
export interface IAirEntity {
	// Id Properties
	_actorRecordId?: ActorRecordId;

	// Id Relations
	repository?: IRepository;
	actor?: IActor;

	// Non-Id Properties
	ageSuitability?: number;
	copied?: boolean;
	createdAt?: Date;
	systemWideOperationId?: SystemWideOperationId;

	// Transient Properties
	id?: AirEntity_Id

	// Public Methods
}

export interface IMetroAreaState {

	state: IState
	metroArea: IMetroArea

}

export type MetroArea_Id = number;
export type MetroArea_Name = string;
export interface IMetroArea {

	id: MetroArea_Id
	name?: MetroArea_Name
	country?: ICountry
	metroAreaStates?: IMetroAreaState[]
	userAccounts?: IUserAccount[]

}


export type State_Abbreviation = string;
export type State_Id = number;
export type State_Name = string;
export interface IState {
	id: State_Id;
	abbreviation?: State_Abbreviation;
	name?: State_Name;
	country?: ICountry;
	metroAreaStates?: IMetroAreaState[];
	userAccounts?: IUserAccount[];
}

export type Country_Abbreviation = string;
export type Country_Id = number;
export type Country_Name = string;
export interface ICountry {
	id: Country_Id;
	abbreviation?: Country_Abbreviation
	name?: Country_Name
	continent?: IContinent
	states?: IState[]
	userAccounts?: IUserAccount[]
}

export type Continent_Id = number;
export type Continent_Name = string;
export interface IContinent {
	id?: Continent_Id;
	name?: Continent_Name
	countries?: ICountry[]
	userAccounts?: IUserAccount[]
}

export type Classification_Id = number
export type Classification_Name = string
/**
 * Classification of Generic Types (which can be applied to any entities)
 */
export interface IClassification {
	id?: Classification_Id
	name?: Classification_Name
}

export interface ITypeClassification {
	classification: IClassification
	type: IType
}


export type Type_Id = number
export type Type_Name = string
/**
 * Generic Type (can be applied to any entities)
 */
export interface IType {
	id?: number
	name?: string
	typeClassifications?: ITypeClassification[]
}

/**
 * Types applicable to terminals
 */
export interface ITerminalType {
	terminal: ITerminal
	type: IType
}

export type Terminal_LocalId = number;
export type Terminal_IsLocal = boolean;
export type Terminal_GUID = string;
/**
 * AIRport terminal where the Apps execute (a browser tab, native app, etc.)
 */
export interface ITerminal {
	_localId: Terminal_LocalId
	GUID?: Terminal_GUID
	owner?: IUserAccount
	isLocal?: Terminal_IsLocal
	continent?: IContinent
	country?: ICountry
	terminalTypes?: ITerminalType[]
}
