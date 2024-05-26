import { Repository_GUID } from "../core/types"
import { IRepositoryBlock, RepositoryBlock_SyncTimestamp } from "./historyAndBlock"

export interface RepositoryBlockWriteRequest {

	blocks: IRepositoryBlock[]
	repositoryGUID: Repository_GUID

}

export interface RepositoryBlockWriteResponse {

	error?: string
	syncTimestamp: RepositoryBlock_SyncTimestamp

}

export interface RepositoryBlocksReadRequest {

	repositoryGUID: Repository_GUID
	syncTimestamp?: RepositoryBlock_SyncTimestamp

}

export type RepositoryBlocksReadResponse_Error = string;
export interface RepositoryBlocksReadResponse {

	blocks?: IRepositoryBlock[]
	error?: RepositoryBlocksReadResponse_Error
	repositoryGUID: Repository_GUID

}
