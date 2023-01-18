import { IActor, IRepository } from "../core/types"

/**
 * Save results are needed to update application/application isolates:
 *     - created objects with new _localIds
 *     - trim deleted objects
 *     - notify the client if an expected update did not take place
 * 
 * For that reason there must be a way to traverse the original
 * tree of saved objects and make modifications to them.  A
 * natural fit for that is to use operationUniqueIds that are
 * generated for each object passed into the save commands.
 */
export interface ICreateResultRecords {
    // Generated Column values if any are present
    // or a flag that the entity has been created
    [operationUniqueId: string]: {
        [propertyName: string]: number
    } | boolean
}

export interface IUpdateResultRecords {
    [operationUniqueId: string]: boolean
}
export interface IDeleteResultRecords {
    [operationUniqueId: string]: boolean
}

export interface IRepositoryIdParts {
    source: string
    GUID: string
}

export interface ISaveResult {
    actor: IActor
    created: ICreateResultRecords
    deleted: IDeleteResultRecords
    newRepository: IRepository
    repositoryIdParts: IRepositoryIdParts
    updated: IUpdateResultRecords
}