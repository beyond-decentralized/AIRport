import { SyncAllModifiedColumnsMap } from "../../implementation/sync/SyncAllModifiedColumnsMap"
import { SyncColumnMap } from "../../implementation/sync/SyncColumnMap"
import { IApplication, IApplicationVersion, IDomain } from "../application/IApplication"
import { DbEntity, DbEntity_LocalId } from "../application/DbEntity"
import { DbColumn_Index, DbColumn, DbRelation } from "../application/DbProperty"
import { ChangeType } from "../data/ChangeType"
import { RepositoryTransactionType, TransactionType } from "../data/sync/TransactionType"
import { ActorRecordId, Actor_LocalId, IActor, IRepository, IRepositoryMember, IRepositoryMemberAcceptance, IRepositoryMemberInvitation, IRepositoryMemberUpdate, ITerminal, IUserAccount, RepositoryMemberAcceptance_Signature, RepositoryMemberInvitation_PrivateSigningKey, RepositoryMember_Signature, Repository_LocalId, SystemWideOperationId, UserAccount_Signature } from "../core/types"

export type InMessageIndex = number

export type RepositoryTransactionHistory_IsRepositoryCreation = boolean
export type RepositoryTransactionHistory_LocalId = number
export type RepositoryTransactionHistory_SaveTimestamp = number

/**
 * An entry in repository Transaction History/Log.
 * The main synchronization unit exchanged between terminals.
 */
export interface IRepositoryTransactionHistory {

    _localId: RepositoryTransactionHistory_LocalId
    repositoryTransactionType: RepositoryTransactionType
    saveTimestamp: RepositoryTransactionHistory_SaveTimestamp
    isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation
    invitationPrivateSigningKey?: RepositoryMemberInvitation_PrivateSigningKey

    // ManyToOnes

    block?: IRepositoryBlock
    member: IRepositoryMember
    previousRepositoryTransactionHistory?: IRepositoryTransactionHistory
    repository: IRepository
    transactionHistory: ITransactionHistory

    // OneToManys

    followingRepositoryTransactionHistories?: IRepositoryTransactionHistory[]
    operationHistory: IOperationHistory[]
    newRepositoryMemberAcceptances?: IRepositoryMemberAcceptance[]
    newRepositoryMemberInvitations?: IRepositoryMemberInvitation[]
    newRepositoryMemberUpdates?: IRepositoryMemberUpdate[]
    newRepositoryMembers?: IRepositoryMember[]

    // Transient

    modifiedRepository_LocalIdSet?: Set<Repository_LocalId>
}

export type TransactionHistoryNumberOfOperations = number
export type TransactionHistory_LocalId = number

export interface ITransactionHistory {

    _localId: TransactionHistory_LocalId
    allOperationHistory?: IOperationHistory[]
    allRecordHistory?: IRecordHistory[]
    allRecordHistoryNewValues?: IRecordHistoryNewValue[]
    allRecordHistoryOldValues?: IRecordHistoryOldValue[]
    allModifiedColumnsMap?: SyncAllModifiedColumnsMap
    modifiedRepository_LocalIdSet?: Set<Repository_LocalId>
    repositoryTransactionHistories: IRepositoryTransactionHistory[]
    repositoryTransactionHistoryMap?: { [repositoryLocalId: Repository_LocalId]: IRepositoryTransactionHistory }
    transactionType: TransactionType

}

export type OperationHistory_LocalId = number
export type OperationHistory_OrderNumber = number
/**
 * Marks a group of mutation history changes.
 */
export interface IOperationHistory {

    _localId: OperationHistory_LocalId
    actor: IActor
    changeType: ChangeType
    entity: DbEntity
    orderNumber: OperationHistory_OrderNumber
    repositoryTransactionHistory: IRepositoryTransactionHistory
    recordHistory: IRecordHistory[]
    systemWideOperationId?: SystemWideOperationId

}

/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export type RecordHistory_LocalId = number
export interface IRecordHistory {

    _localId: RecordHistory_LocalId
    _actorRecordId: ActorRecordId
    actor: IActor
    operationHistory: IOperationHistory
    newValues?: IRecordHistoryNewValue[]
    oldValues?: IRecordHistoryOldValue[]
    tableColumnMap?: SyncColumnMap

}

export type RecordHistoryNewValue_ColumnIndex = number
export type RecordHistoryNewValue_NewValue = any
export interface IRecordHistoryNewValue {

    recordHistory: IRecordHistory
    columnIndex: RecordHistoryNewValue_ColumnIndex
    newValue?: RecordHistoryNewValue_NewValue

}

export interface ICurrentValueMapping {

    value: IRecordHistoryNewValue

}

export type RecordHistoryOldValue_ColumnIndex = number
export interface IRecordHistoryOldValue {

    recordHistory: IRecordHistory
    columnIndex: RecordHistoryOldValue_ColumnIndex
    oldValue: IRecordHistoryNewValue

}

export enum SynchronizationConflict_Type {
    LOCAL_UPDATE_REMOTELY_DELETED = 'LOCAL_UPDATE_REMOTELY_DELETED',
    REMOTE_CREATE_REMOTELY_DELETED = 'REMOTE_CREATE_REMOTELY_DELETED',
    REMOTE_UPDATE_LOCALLY_DELETED = 'REMOTE_UPDATE_LOCALLY_DELETED',
    REMOTE_UPDATE_LOCALLY_UPDATED = 'REMOTE_UPDATE_LOCALLY_UPDATED',
}

export type SynchronizationConflict_Id = number
export type SynchronizationConflict_Acknowledged = boolean
export interface ISynchronizationConflict {

    // Id Properties
    _localId: SynchronizationConflict_Id

    // Id Relations

    // Non-Id Properties
    type: SynchronizationConflict_Type
    acknowledged: SynchronizationConflict_Acknowledged

    // Non-Id Relations
    repository: IRepository
    overwrittenRecordHistory: IRecordHistory
    overwritingRecordHistory: IRecordHistory
    values: ISynchronizationConflictValues[]

    // Transient Properties

    // Public Methods

}

export interface ISynchronizationConflictValues {

    // Id Properties
    columnIndex: DbColumn_Index

    // Id Relations
    synchronizationConflict: ISynchronizationConflict

    // Non-Id Properties

    // Non-Id Relations

    // Transient Properties

    // Public Methods

}

export type RecordUpdateStage_LocalId = number
export interface IRecordUpdateStage {

    _localId: RecordUpdateStage_LocalId
    applicationVersion: IApplicationVersion
    entity: DbEntity
    repository: IRepository
    actor: IActor
    _actorRecordId: ActorRecordId
    column: DbColumn
    updatedValue: any

}

export type RepositoryBlock_PackagedData = any
export type RepositoryBlock_GUID = string
export type RepositoryBlock_HashSum = string
export type RepositoryBlock_LocalId = number
export type RepositoryBlock_SyncTimestamp = number


export interface IRepositoryBlockRelationalData {
    repository?: IRepository
    terminal?: ITerminal
}

export interface IRepositoryBlockData
    extends IRepositoryBlockRelationalData {

    actors: IActor[]
    /*
     A given Repository Transaction Block can have multiple versions of any involved application.
     This is because it may contain RTHs across any number of application upgrades (over any
     period of time).

     Hence applications can be referenced in multiple application versions
      */
    applications: IApplication[]
    applicationVersions: IApplicationVersion[]
    // Domains can be referenced in multiple applications of RTB
    domains: IDomain[]
    history?: IRepositoryTransactionHistory
    // Repositories may reference records in other repositories
    referencedApplicationRelations: DbRelation[]
    referencedApplicationVersions: IApplicationVersion[]
    referencedRepositories: IRepository[]

    // For updates and deletes these specifies the records that were
    // updated or deleted and are referenced in IRecordHistoryNewValue(s)
    referencedBlockGUIDs?: RepositoryBlock_GUID[]
    referencedOperationHistories?: IOperationHistory[]
    referencedRecordHistories?: IRecordHistory[]

    terminals: ITerminal[]
    repositoryMembers: IRepositoryMember[]
    userAccounts: IUserAccount[]

}

export interface IRepositoryBlock
    extends IRepositoryBlockRelationalData {

    _localId?: RepositoryBlock_LocalId
    GUID: RepositoryBlock_GUID
    hashSum?: RepositoryBlock_HashSum
    packagedData?: RepositoryBlock_PackagedData
    syncTimestamp?: RepositoryBlock_SyncTimestamp

    // Signed with RepositoryMemberInvitation_PublicSigningKey
    acceptanceSignature?: RepositoryMemberAcceptance_Signature
    // All messages without membership acceptance are signed
    // with a memberSignature
    memberSignature?: RepositoryMember_Signature
    // Repository Creation and messages with RepositoryMemberAcceptance
    // are signed with userAccountSignature
    userAccountSignature?: UserAccount_Signature

    // ManyToOnes

    previousBlock?: IRepositoryBlock
    previousTrunkBlock?: IRepositoryBlock

    // OneToManys

    // Only one history per block is currently supported
    history?: IRepositoryTransactionHistory[]
    nextBlocks?: IRepositoryBlock[]

    // Transient
    data?: IRepositoryBlockData

}
