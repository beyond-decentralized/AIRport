import { InternalUserAccount } from "@airport/aviation-communication";
import { Application_FullName, DbApplication } from "../application/Application";
import { DbEntity } from "../application/Entity";
import { DbRelation } from "../application/Property";
import { IRepositoryTransactionHistory } from "./synchronizationTypes";

export interface IRootTransaction {
	numberOfOperations: number
	// Only one new repository can be created at at time
	newRepository?: IRepository
}

// Signature is used in all entities that represent
// direct UserAccount actions (such as inviting someone
// to a Repository or joining a Repository)
export type UserAccount_Signature = string

export interface IUserAccount
	extends InternalUserAccount {
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
export type Repository_IsPublic = boolean;
export type Repository_LocalId = number;
export type Repository_Name = string;
export type Repository_Source = string;
export type Repository_UiEntryUri = string;
export interface IRepositoryIdentifier {
	GUID?: Repository_GUID;
	source?: Repository_Source;
}
export interface IRepository
	extends IRepositoryIdentifier {

	// Id Properties
	_localId: Repository_LocalId;

	// Id Relations

	// Non-Id Properties
	ageSuitability?: AgeSuitability;
	createdAt?: CreatedAt;
	fullApplicationName?: Application_FullName;
	immutable?: Repository_Immutable;
	isPublic?: Repository_IsPublic;
	name?: Repository_Name;
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


export type RepositoryMember_CanWrite = boolean
export type RepositoryMember_LocalId = number
export type RepositoryMember_IsOwner = boolean
export type RepositoryMember_IsAdministrator = boolean
export type RepositoryMember_PublicSigningKey = string
// All Repository operations must be signed
// (RepositoryTransactionHistory records)
export type RepositoryMember_Signature = string
export enum RepositoryMember_Status {
	INVITED,
	JOINED
}
export interface IRepositoryMember {

	_localId: RepositoryMember_LocalId
	canWrite?: RepositoryMember_CanWrite
	invitations?: IRepositoryMemberInvitation[]
	isOwner?: RepositoryMember_IsOwner
	isAdministrator?: RepositoryMember_IsAdministrator
	// doubles as the GUID
	memberPublicSigningKey?: RepositoryMember_PublicSigningKey
	repository?: IRepository
	updates?: IRepositoryMemberUpdate[]
	status?: RepositoryMember_Status
	// When the member is first invited to the repository
	// there is no UserAccount associated with it
	userAccount?: IUserAccount
	// Only populated in the database of the terminal
	// where the RepositoryTransactionHistory was originally
	// created (for the purpose of being able to reconstruct
	// and re-send the RepositoryTransactionHistory)
	addedInRepositoryTransactionHistory?: IRepositoryTransactionHistory

}

export type RepositoryMemberInvitation_LocalId = number
// Private Signing Key is sent in the invitation link to the invited user's email
// (or text message, or other messaging service)
export type RepositoryMemberInvitation_PrivateSigningKey = string
export type RepositoryMemberInvitation_PublicSigningKey = string
export interface IRepositoryMemberInvitation {

	_localId: RepositoryMemberUpdate_LocalId
	createdAt?: CreatedAt
	invitationPublicSigningKey?: RepositoryMemberInvitation_PublicSigningKey
	invitedRepositoryMember?: IRepositoryMember
	// Only populated in the database of the terminal
	// where the RepositoryTransactionHistory was originally
	// created (for the purpose of being able to reconstruct
	// and re-send the RepositoryTransactionHistory)
	addedInRepositoryTransactionHistory?: IRepositoryTransactionHistory

}

export type RepositoryMemberAcceptance_LocalId = number
// Used to sign the message with acceptance of Repository membership
export type RepositoryMemberAcceptance_Signature = string
export class IRepositoryMemberAcceptance {

	_localId: RepositoryMemberAcceptance_LocalId
	createdAt?: CreatedAt
	invitationPublicSigningKey?: RepositoryMemberInvitation_PublicSigningKey
	acceptingRepositoryMember?: IRepositoryMember
	// Only populated in the database of the terminal
	// where the RepositoryTransactionHistory was originally
	// created (for the purpose of being able to reconstruct
	// and re-send the RepositoryTransactionHistory)
	addedInRepositoryTransactionHistory?: IRepositoryTransactionHistory

}


export type RepositoryMemberUpdate_LocalId = number
export interface IRepositoryMemberUpdate {

	_localId: RepositoryMemberUpdate_LocalId
	canWrite?: RepositoryMember_CanWrite
	createdAt?: CreatedAt
	isAdministrator?: RepositoryMember_IsAdministrator
	updatedRepositoryMember?: IRepositoryMember
	// Only populated in the database of the terminal
	// where the RepositoryTransactionHistory was originally
	// created (for the purpose of being able to reconstruct
	// and re-send the RepositoryTransactionHistory)
	addedInRepositoryTransactionHistory?: IRepositoryTransactionHistory

}

export type SystemWideOperationId = number
export type ActorRecordId = number
export type AirEntity_Id = string
export type AirEntity_Copied = boolean
export interface IAirEntity {
	// Id Properties
	_actorRecordId?: ActorRecordId;

	// Id Relations
	actor?: IActor;
	repository?: IRepository;

	// Non-Id Properties
	ageSuitability?: AgeSuitability;
	copied?: AirEntity_Copied;
	createdAt?: CreatedAt;
	systemWideOperationId?: SystemWideOperationId;

	// Transient Properties
	createdBy?: IUserAccount
	isNew?: boolean
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
	id?: Type_Id
	name?: Type_Name
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

export type TerminalRun_LocalId = number
export type TerminalRun_CreateTimestamp = number
export type TerminalRun_RandomNumber = number
export class ITerminalRun {

	_localId: TerminalRun_LocalId
	createTimestamp: TerminalRun_CreateTimestamp
	randomNumber: TerminalRun_RandomNumber

}

export interface ICrossRepositoryRelationLedger
	extends IAirEntity {

	relation: DbRelation
	relatedRepository: IRepository

}
export interface ICopiedRecordLedger
	extends IAirEntity {

	copyAppEntity: DbEntity
	copyActorRecordId: ActorRecordId
	copyActor: IActor
	copyRepository: IRepository

}
export interface ILocalCopyReplacementLedger {

	copiedRecordLedger: ICopiedRecordLedger

}
