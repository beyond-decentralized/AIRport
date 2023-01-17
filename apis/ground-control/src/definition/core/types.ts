import { InternalUserAccount } from "@airport/aviation-communication";
import { Application_FullName, DbApplication } from "../application/Application";

export interface IRootTransaction {
	numberOfOperations: number
	// Only one new repository can be created at at time
	newRepository?: IRepository
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
	userAccount?: InternalUserAccount

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

	// Non-Id Relations
	owner?: InternalUserAccount;

	// Transient Properties

	// Public Methods

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

export type Country_Abbreviation = string;
export type Country_Id = number;
export type Country_Name = string;
export interface ICountry {
	id?: Country_Id;
	abbreviation?: Country_Abbreviation
	name?: Country_Name
	continent?: IContinent
	userAccounts?: InternalUserAccount[]
}

export type Continent_Id = number;
export type Continent_Name = string;
export interface IContinent {
	id?: Continent_Id;
	name?: Continent_Name
	countries?: ICountry[]
	userAccounts?: InternalUserAccount[]
}

export type Classification_Id = number
export type Classification_Name = string
/**
 * Classification of Generic Types (which can be applied to any entities)
 */
export class IClassification {
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
	owner?: InternalUserAccount
	isLocal?: Terminal_IsLocal
	continent?: IContinent
	country?: ICountry
	terminalTypes?: ITerminalType[]
}
