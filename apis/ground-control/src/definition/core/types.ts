import { InternalUserAccount } from "@airport/aviation-communication";
import { Application_FullName } from "../application/Application";

export interface IRootTransaction {
	numberOfOperations: number
	// Only one new repository can be created at at time
	newRepository?: IRepository
}

export type Actor_LocalId = number;
export type Actor_GUID = string;

export interface IActor {

	// Id Properties
	_localId?: Actor_LocalId;

	// Id Relations

	// Non-Id Properties
	GUID?: Actor_GUID;

	// Non-Id Relations
	userAccount?: InternalUserAccount;

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
