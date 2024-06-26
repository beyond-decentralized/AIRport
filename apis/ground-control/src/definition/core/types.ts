import { InternalUserAccount } from "@airport/aviation-communication";
import { Application_FullName, IApplication } from "../application/IApplication";
import { DbEntity } from "../application/DbEntity";
import { DbColumn, DbRelation } from "../application/DbProperty";
import { IRepositoryTransactionHistory } from "../history/historyAndBlock";

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
	GUID: Actor_GUID

	// Non-Id Relations
	userAccount: IUserAccount

	terminal: ITerminal

	application: IApplication

	// Transient Properties

	// Public Methods

}

export type AgeSuitability = number
export type CreatedAt = Date

export type Repository_GUID = string;
export type Repository_Immutable = boolean;
export type Repository_Internal = boolean;
export type Repository_IsPublic = boolean;
export type Repository_LocalId = number;
export type Repository_Name = string;
export type Repository_Source = string;
export type Repository_UiEntryUri = string;
export interface IRepositoryIdentifier {
	GUID: Repository_GUID;
	source: Repository_Source;
}
export interface IRepository
	extends IRepositoryIdentifier {

	// Id Properties
	_localId: Repository_LocalId;

	// Id Relations

	// Non-Id Properties
	ageSuitability: AgeSuitability;
	createdAt: CreatedAt;
	fullApplicationName: Application_FullName;
	immutable: Repository_Immutable;
	internal: Repository_Internal;
	isPublic: Repository_IsPublic;
	name: Repository_Name;
	uiEntryUri: Repository_UiEntryUri;
	// Local-only, represents state of the repository
	// false if only a reference stub is loaded
	isLoaded: boolean

	// Non-Id Relations
	currentRepositoryTransactionHistory?: IRepositoryTransactionHistory
	owner: IUserAccount;
	continent?: IContinent
	country?: ICountry
	state?: IState
	metroArea?: IMetroArea
	referencedRepositories: IRepositoryReference[]
	referencedInRepositories: IRepositoryReference[]
	repositoryMembers: IRepositoryMember[]
	repositoryTransactionHistory: IRepositoryTransactionHistory[]
	repositoryApplications?: IRepositoryApplication[]
	repositoryClients?: IRepositoryClient[]
	repositoryDatabases?: IRepositoryDatabase[]
	repositoryTerminals?: IRepositoryTerminal[]
	repositoryTypes?: IRepositoryType[]

	// Transient Properties

	// Public Methods

}

export interface IRepositoryReference {

	referencingRepository: IRepository
	referencedRepository: IRepository

}

export interface IRepositoryApplication {

	application: IApplication
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
	domain: Database_Domain
	GUID: Database_GUID
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
	domain: Client_Domain
	GUID: Client_GUID
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
	canWrite: RepositoryMember_CanWrite
	isAdministrator: RepositoryMember_IsAdministrator
	isOwner: RepositoryMember_IsOwner
	// doubles as the GUID
	memberPublicSigningKey?: RepositoryMember_PublicSigningKey
	status: RepositoryMember_Status

	// ManyToOnes

	repository: IRepository
	// When the member is first invited to the repository
	// there is no UserAccount associated with it
	userAccount: IUserAccount

	// OneToManys

    acceptances?: IRepositoryMemberAcceptance[]
	// Only populated in the database of the Terminal
	// where the RepositoryTransactionHistory was originally
	// created (for the purpose of being able to reconstruct
	// and re-send the RepositoryTransactionHistory)
	addedInRepositoryTransactionHistory?: IRepositoryTransactionHistory
	invitations?: IRepositoryMemberInvitation[]
	updates?: IRepositoryMemberUpdate[]

}

export type RepositoryMemberInvitation_LocalId = number
// Private Signing Key is sent in the invitation link to the invited user's email
// (or text message, or other messaging service)
export type RepositoryMemberInvitation_PrivateSigningKey = string
export type RepositoryMemberInvitation_PublicSigningKey = string
export interface IRepositoryMemberInvitation {

	_localId: RepositoryMemberUpdate_LocalId
	createdAt: CreatedAt
	invitationPublicSigningKey: RepositoryMemberInvitation_PublicSigningKey
	invitedRepositoryMember: IRepositoryMember
	// Only populated in the database of the Terminal
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
	createdAt: CreatedAt
	invitationPublicSigningKey: RepositoryMemberInvitation_PublicSigningKey
	acceptingRepositoryMember: IRepositoryMember
	// Only populated in the database of the Terminal
	// where the RepositoryTransactionHistory was originally
	// created (for the purpose of being able to reconstruct
	// and re-send the RepositoryTransactionHistory)
	addedInRepositoryTransactionHistory?: IRepositoryTransactionHistory

}


export type RepositoryMemberUpdate_LocalId = number
export interface IRepositoryMemberUpdate {

	_localId: RepositoryMemberUpdate_LocalId
	canWrite?: RepositoryMember_CanWrite
	createdAt: CreatedAt
	isAdministrator?: RepositoryMember_IsAdministrator
	updatedRepositoryMember: IRepositoryMember
	// Only populated in the database of the Terminal
	// where the RepositoryTransactionHistory was originally
	// created (for the purpose of being able to reconstruct
	// and re-send the RepositoryTransactionHistory)
	addedInRepositoryTransactionHistory?: IRepositoryTransactionHistory

}

export type ActorRecordId = number
export type AirEntity_GUID = string

export interface IAirEntityId {
	// Id Properties
	_actorRecordId?: ActorRecordId;

	// Id Relations
	actor?: IActor;
	repository: IRepository;

	// Transient Properties
	id?: AirEntity_GUID
}

export type SystemWideOperationId = number
export type AirEntity_ToBeCopied = boolean
export interface IAirEntity
	extends IAirEntityId {

	// Non-Id Properties
	createdAt: CreatedAt;
	systemWideOperationId?: SystemWideOperationId;

	// Transient Properties
	toBeCopied?: AirEntity_ToBeCopied;
	createdBy?: IUserAccount
	isNew?: boolean

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
	name: MetroArea_Name
	country: ICountry
	metroAreaStates: IMetroAreaState[]
	userAccounts?: IUserAccount[]

}


export type State_Abbreviation = string;
export type State_Id = number;
export type State_Name = string;
export interface IState {
	id: State_Id;
	abbreviation: State_Abbreviation;
	name: State_Name;
	country: ICountry;
	metroAreaStates: IMetroAreaState[];
	userAccounts?: IUserAccount[];
}

export type Country_Abbreviation = string;
export type Country_Id = number;
export type Country_Name = string;
export interface ICountry {
	id: Country_Id;
	abbreviation: Country_Abbreviation
	name: Country_Name
	continent: IContinent
	states: IState[]
	userAccounts?: IUserAccount[]
}

export type Continent_Id = number;
export type Continent_Name = string;
export interface IContinent {
	id: Continent_Id;
	name: Continent_Name
	countries: ICountry[]
	userAccounts?: IUserAccount[]
}

export type Classification_Id = number
export type Classification_Name = string
/**
 * Classification of Generic Types (which can be applied to any entities)
 */
export interface IClassification {
	id: Classification_Id
	name: Classification_Name
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
	id: Type_Id
	name: Type_Name
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
	GUID: Terminal_GUID
	owner: IUserAccount
	isLocal: Terminal_IsLocal
	continent?: IContinent
	country?: ICountry
	state?: IState
	metroArea?: IMetroArea
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

export type EntityRecord_IntegerdId = number
export type EntityRecord_IsACopy = number
export interface IEntityRecord
	extends IAirEntityId {

	integerId: EntityRecord_IntegerdId
	isACopy: EntityRecord_IsACopy

	// ManyToOne

	ddlEntity: DbEntity

	// OneToManys

	referencedRecordRelations: IEntityRelationRecord[]
    referencingRecordRelations: IEntityRelationRecord[]
    copiedRecordReferences: ICopiedEntityRecordReference[]
    entityRecordQueries: IEntityQueryRecord[]

}

export type EntityRelationRecord_IntegerdId = number
export interface IEntityRelationRecord {
	integerId: EntityRelationRecord_IntegerdId

	// ManyToOnes

	referencedRecord: IEntityRecord
	referencingColumn: DbColumn
	referencingRecord: IEntityRecord

	// OneToManys

    copiedEntityRecordReferences: ICopiedEntityRecordReference[]
}

export interface ICopiedEntityRecordReference {

	copiedEntityRelationRecord: IEntityRelationRecord

	referencingEntityRecord: IEntityRecord

}

export type IEntityQueryRecord_QueryNumber = number
export interface IEntityQueryRecord {

	entityRecord: IEntityRecord

	queryNumber: IEntityQueryRecord_QueryNumber

}

export interface IEntityRecordAdditionsForRepository {

	repository: IRepository
	entities: IAirEntity[][]
	ddlEntities: DbEntity[]
}
