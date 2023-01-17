import { SyncColumnMap } from "../../../dist/esm";
import { SyncApplicationMap } from "../../implementation/sync/SyncApplicationMap";
import { DbEntity } from "../application/Entity";
import { ChangeType } from "../data/ChangeType";
import { RepositoryTransactionType, TransactionType } from "../data/sync/TransactionType";
import { ActorRecordId, IActor, IRepository, SystemWideOperationId } from "./types";

export type RepositoryTransactionHistory_LocalId = number;
export type RepositoryTransactionHistory_IsRepositoryCreation = boolean;
export type RepositoryTransactionHistory_BlockId = number;
export type RepositoryTransactionHistory_SaveTimestamp = number;
export type RepositoryTransactionHistory_SyncTimestamp = number;
export type RepositoryTransactionHistory_GUID = string;
/**
 * An entry in repository Transaction History/Log.
 * The main synchronization unit exchanged between terminals.
 */
export interface IRepositoryTransactionHistory {

    _localId: RepositoryTransactionHistory_LocalId

    repositoryTransactionType?: RepositoryTransactionType | string

    saveTimestamp?: RepositoryTransactionHistory_SaveTimestamp

    syncTimestamp?: RepositoryTransactionHistory_SyncTimestamp

    GUID?: RepositoryTransactionHistory_GUID

    isRepositoryCreation?: RepositoryTransactionHistory_IsRepositoryCreation

    repository?: IRepository

    transactionHistory?: ITransactionHistory

    operationHistory?: IOperationHistory[]

}

export type TransactionHistoryNumberOfOperations = number
export type TransactionHistory_LocalId = number

export class ITransactionHistory {

    _localId: TransactionHistory_LocalId
    transactionType?: TransactionType | string
    repositoryTransactionHistories?: IRepositoryTransactionHistory[]
    repositoryTransactionHistoryMap?: { [repositoryId: number]: IRepositoryTransactionHistory }
    applicationMap?: SyncApplicationMap
    allOperationHistory?: IOperationHistory[]
    allRecordHistory?: IRecordHistory[]
    allRecordHistoryNewValues?: IRecordHistoryNewValue[]
    allRecordHistoryOldValues?: IRecordHistoryOldValue[]

}

export type OperationHistory_LocalId = number;
export type OperationHistory_OrderNumber = number;
/**
 * Marks a group of mutation history changes.
 */
export class IOperationHistory {

    _localId: OperationHistory_LocalId
    orderNumber?: OperationHistory_OrderNumber
    changeType?: ChangeType | string
    systemWideOperationId?: SystemWideOperationId
    entity?: DbEntity
    actor?: IActor
    repositoryTransactionHistory?: IRepositoryTransactionHistory
    recordHistory?: IRecordHistory[]

}

/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export type RecordHistory_LocalId = number;
export class IRecordHistory {

    _localId: RecordHistory_LocalId
    _actorRecordId?: ActorRecordId
    actor?: IActor
    operationHistory?: IOperationHistory
    newValues?: IRecordHistoryNewValue[] = []
    oldValues?: IRecordHistoryOldValue[] = []
    tableColumnMap?: SyncColumnMap

}

export type RecordHistoryNewValue_ColumnIndex = number;
export type RecordHistoryNewValue_NewValue = any;
export class IRecordHistoryNewValue {

    recordHistory: IRecordHistory;
    columnIndex: RecordHistoryNewValue_ColumnIndex;
    newValue?: RecordHistoryNewValue_NewValue;

}

export type RecordHistoryOldValue_ColumnIndex = number;
export type RecordHistoryOldValue_OldValue = any;
export class IRecordHistoryOldValue {

    recordHistory: IRecordHistory;
    columnIndex: RecordHistoryOldValue_ColumnIndex;
    oldValue?: RecordHistoryOldValue_OldValue;

}
