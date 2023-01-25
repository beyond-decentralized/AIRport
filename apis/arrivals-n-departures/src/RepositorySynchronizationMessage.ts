import { DbApplication, DbApplicationVersion, DbRelation, IActor, IRepository, IRepositoryMember, IRepositoryTransactionHistory, ITerminal, IUserAccount, RepositoryMemberAcceptance_Signature, RepositoryMember_Signature, UserAccount_Signature } from "@airport/ground-control";

export type ReferencedApplicationVersion_InMessageIndex = number
export type ReferencedApplicationRelation_InMessageIndex = number
export type ReferencedRepository_InMessageIndex = number

export type RepositorySynchronizationMessage_Signature = string

export interface RepositorySynchronizationMessage {

	data: RepositorySynchronizationData
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

export interface RepositorySynchronizationData {

	actors: IActor[]
	applications: DbApplication[]
	applicationVersions: DbApplicationVersion[]
	history: IRepositoryTransactionHistory
	// Repositories may reference records in other repositories
	referencedApplicationRelations: DbRelation[]
	referencedApplicationVersions: DbApplicationVersion[]
	referencedRepositories: IRepository[]
	repositoryMembers: IRepositoryMember[]
	terminals: ITerminal[]
	userAccounts: IUserAccount[]

}

export interface RepositorySynchronizationWriteRequest {

	messages: RepositorySynchronizationMessage[]
	repositoryGUID: string

}

export interface RepositorySynchronizationWriteResponse {

	error?: string
	syncTimestamp: number

}

export interface RepositorySynchronizationReadRequest {

	repositoryGUID: string
	syncTimestamp?: number

}

export interface RepositorySynchronizationReadResponse {

	error?: string
	fragments: RepositorySynchronizationReadResponseFragment[]

}

export interface RepositorySynchronizationReadResponseFragment {

	messages: RepositorySynchronizationMessage[]
	repositoryGUID: string
	syncTimestamp: number

}
