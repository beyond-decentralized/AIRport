import { SyncAllModifiedColumnsMap } from "../../implementation/sync/SyncAllModifiedColumnsMap";
import { SyncColumnMap } from "../../implementation/sync/SyncColumnMap";
import { IApplicationVersion } from "../application/IApplication";
import { DbEntity } from "../application/DbEntity";
import { DbColumn_Index, DbColumn } from "../application/DbProperty";
import { ChangeType } from "../data/ChangeType";
import { RepositoryTransactionType, TransactionType } from "../data/sync/TransactionType";
import { ActorRecordId, IActor, IRepository, IRepositoryMember, IRepositoryMemberAcceptance, IRepositoryMemberInvitation, IRepositoryMemberUpdate, RepositoryMemberInvitation_PrivateSigningKey, Repository_IsPublic, Repository_LocalId, SystemWideOperationId } from "../core/types";

export type InMessageIndex = number

export type RepositoryTransactionHistory_LocalId = number;
export type RepositoryTransactionHistory_IsRepositoryCreation = boolean;
export type RepositoryTransactionHistory_SaveTimestamp = number;
export type RepositoryTransactionHistory_SyncTimestamp = number;
export type RepositoryTransactionHistory_GUID = string;
/**
 * An entry in repository Transaction History/Log.
 * The main synchronization unit exchanged between terminals.
 */
export interface IRepositoryTransactionHistory {

    _localId: RepositoryTransactionHistory_LocalId
    actor: IActor
    repositoryTransactionType: RepositoryTransactionType
    saveTimestamp: RepositoryTransactionHistory_SaveTimestamp
    syncTimestamp?: RepositoryTransactionHistory_SyncTimestamp
    GUID: RepositoryTransactionHistory_GUID
    isPublic: Repository_IsPublic
    isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation
    member: IRepositoryMember
    modifiedRepository_LocalIdSet?: Set<Repository_LocalId>
    repository: IRepository
    transactionHistory: ITransactionHistory
    operationHistory: IOperationHistory[]
    newRepositoryMemberAcceptances?: IRepositoryMemberAcceptance[]
    newRepositoryMemberInvitations?: IRepositoryMemberInvitation[]
    newRepositoryMemberUpdates?: IRepositoryMemberUpdate[]
    newRepositoryMembers?: IRepositoryMember[]
    invitationPrivateSigningKey?: RepositoryMemberInvitation_PrivateSigningKey
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
    remoteRepositoryMemberAcceptances?: IRepositoryMemberAcceptance[]
    remoteRepositoryMemberInvitations?: IRepositoryMemberInvitation[]
    remoteRepositoryMembers?: IRepositoryMember[]
    transactionType: TransactionType

}

export type OperationHistory_LocalId = number;
export type OperationHistory_OrderNumber = number;
/**
 * Marks a group of mutation history changes.
 */
export interface IOperationHistory {

    _localId: OperationHistory_LocalId
    orderNumber: OperationHistory_OrderNumber
    changeType: ChangeType
    systemWideOperationId?: SystemWideOperationId
    entity: DbEntity
    repositoryTransactionHistory: IRepositoryTransactionHistory
    recordHistory: IRecordHistory[]

}

/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export type RecordHistory_LocalId = number;
export interface IRecordHistory {

    _localId: RecordHistory_LocalId
    _actorRecordId: ActorRecordId
    actor: IActor
    operationHistory: IOperationHistory
    newValues?: IRecordHistoryNewValue[]
    oldValues?: IRecordHistoryOldValue[]
    tableColumnMap?: SyncColumnMap

}

export type RecordHistoryNewValue_ColumnIndex = number;
export type RecordHistoryNewValue_NewValue = any;
export interface IRecordHistoryNewValue {

    recordHistory: IRecordHistory;
    columnIndex: RecordHistoryNewValue_ColumnIndex;
    newValue?: RecordHistoryNewValue_NewValue;

}

export type RecordHistoryOldValue_ColumnIndex = number;
export type RecordHistoryOldValue_OldValue = any;
export interface IRecordHistoryOldValue {

    recordHistory: IRecordHistory;
    columnIndex: RecordHistoryOldValue_ColumnIndex;
    oldValue?: RecordHistoryOldValue_OldValue;

}

export enum SynchronizationConflict_Type {
    LOCAL_UPDATE_REMOTELY_DELETED = 'LOCAL_UPDATE_REMOTELY_DELETED',
    REMOTE_CREATE_REMOTELY_DELETED = 'REMOTE_CREATE_REMOTELY_DELETED',
    REMOTE_UPDATE_LOCALLY_DELETED = 'REMOTE_UPDATE_LOCALLY_DELETED',
    REMOTE_UPDATE_LOCALLY_UPDATED = 'REMOTE_UPDATE_LOCALLY_UPDATED',
}

export type SynchronizationConflict_Id = number;
export type SynchronizationConflict_Acknowledged = boolean;
export interface ISynchronizationConflict {

    // Id Properties
    _localId: SynchronizationConflict_Id;

    // Id Relations

    // Non-Id Properties
    type: SynchronizationConflict_Type;
    acknowledged: SynchronizationConflict_Acknowledged;

    // Non-Id Relations
    repository: IRepository;
    overwrittenRecordHistory: IRecordHistory;
    overwritingRecordHistory: IRecordHistory;
    values: ISynchronizationConflictValues[];

    // Transient Properties

    // Public Methods

}

export interface ISynchronizationConflictValues {

    // Id Properties
    columnIndex: DbColumn_Index;

    // Id Relations
    synchronizationConflict: ISynchronizationConflict;

    // Non-Id Properties

    // Non-Id Relations

    // Transient Properties

    // Public Methods

}

export type RecordUpdateStage_LocalId = number;
export class IRecordUpdateStage {

    _localId: RecordUpdateStage_LocalId
    applicationVersion: IApplicationVersion
    entity: DbEntity
    repository: IRepository
    actor: IActor
    _actorRecordId: ActorRecordId
    column: DbColumn
    updatedValue: any

}
