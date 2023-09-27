import { IApplication, IApplicationVersion } from "../application/IApplication"
import { DbRelation } from "../application/DbProperty"
import { IRepositoryTransactionHistory } from "./synchronizationTypes"
import { IActor, IRepository, IRepositoryMember, ITerminal, IUserAccount, RepositoryMemberAcceptance_Signature, RepositoryMember_Signature, UserAccount_Signature } from "../core/types"

export type ReferencedApplicationVersion_InMessageIndex = number
export type ReferencedDbRelation_InMessageIndex = number
export type ReferencedRepository_InMessageIndex = number

export type SyncRepositoryMessage_Signature = string

export interface SyncRepositoryMessage {

	data: SyncRepositoryData
	// Signed with RepositoryMemberInvitation_PublicSigningKey
	acceptanceSignature?: RepositoryMemberAcceptance_Signature
	// All messages without membership acceptance are signed
	// with a memberSignature
	memberSignature?: RepositoryMember_Signature
	syncTimestamp?: number
	// Repository Creation and messages with RepositoryMemberAcceptance
	// are signed with userAccountSignature
	userAccountSignature?: UserAccount_Signature

}

export interface SyncRepositoryData {

	actors: IActor[]
	applications: IApplication[]
	applicationVersions: IApplicationVersion[]
	history: IRepositoryTransactionHistory
	// Repositories may reference records in other repositories
	referencedApplicationRelations: DbRelation[]
	referencedApplicationVersions: IApplicationVersion[]
	referencedRepositories: IRepository[]
	repositoryMembers: IRepositoryMember[]
	terminals: ITerminal[]
	userAccounts: IUserAccount[]

}

export interface SyncRepositoryWriteRequest {

	messages: SyncRepositoryMessage[]
	repositoryGUID: string

}

export interface SyncRepositoryWriteResponse {

	error?: string
	syncTimestamp: number

}

export interface SyncRepositoryReadRequest {

	repositoryGUID: string
	syncTimestamp?: number

}

export interface SyncRepositoryReadResponse {

	error?: string
	fragments: SyncRepositoryReadResponseFragment[]

}

export interface SyncRepositoryReadResponseFragment {

	messages: SyncRepositoryMessage[]
	repositoryGUID: string
	syncTimestamp: number

}
