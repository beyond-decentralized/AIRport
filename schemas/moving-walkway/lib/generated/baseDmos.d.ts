import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord } from './missingRecord/qmissingrecord';
import { IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock } from './missingRecord/qmissingrecordrepotransblock';
import { IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage } from './qrecordupdatestage';
import { IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage } from './repositoryTransactionBlock/qrepotransblockresponsestage';
import { IRepoTransBlockSchemasToChange, RepoTransBlockSchemasToChangeESelect, RepoTransBlockSchemasToChangeECreateProperties, RepoTransBlockSchemasToChangeEUpdateProperties, RepoTransBlockSchemasToChangeEId, QRepoTransBlockSchemasToChange } from './repositoryTransactionBlock/qrepotransblockschematochange';
import { IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock } from './repositoryTransactionBlock/qrepositorytransactionblock';
import { IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage } from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage';
import { ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage } from './sharingMessage/qsharingmessage';
import { ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock } from './sharingMessage/qsharingmessagerepotransblock';
import { ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode } from './sharingNode/qsharingnode';
import { ISharingNodeDatabase, SharingNodeDatabaseESelect, SharingNodeDatabaseECreateProperties, SharingNodeDatabaseEUpdateProperties, SharingNodeDatabaseEId, QSharingNodeDatabase } from './sharingNode/qsharingnodedatabase';
import { ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock } from './sharingNode/qsharingnoderepotransblock';
import { ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage } from './sharingNode/qsharingnoderepotransblockstage';
import { ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository } from './sharingNode/qsharingnoderepository';
import { ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
export interface IBaseMissingRecordDmo extends IDmo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord> {
}
export declare class BaseMissingRecordDmo extends Dmo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord> implements IBaseMissingRecordDmo {
    constructor();
}
export interface IBaseMissingRecordRepoTransBlockDmo extends IDmo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock> {
}
export declare class BaseMissingRecordRepoTransBlockDmo extends Dmo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock> implements IBaseMissingRecordRepoTransBlockDmo {
    constructor();
}
export interface IBaseRecordUpdateStageDmo extends IDmo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage> {
}
export declare class BaseRecordUpdateStageDmo extends Dmo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage> implements IBaseRecordUpdateStageDmo {
    constructor();
}
export interface IBaseRepoTransBlockResponseStageDmo extends IDmo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage> {
}
export declare class BaseRepoTransBlockResponseStageDmo extends Dmo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage> implements IBaseRepoTransBlockResponseStageDmo {
    constructor();
}
export interface IBaseRepoTransBlockSchemasToChangeDmo extends IDmo<IRepoTransBlockSchemasToChange, RepoTransBlockSchemasToChangeESelect, RepoTransBlockSchemasToChangeECreateProperties, RepoTransBlockSchemasToChangeEUpdateProperties, RepoTransBlockSchemasToChangeEId, QRepoTransBlockSchemasToChange> {
}
export declare class BaseRepoTransBlockSchemasToChangeDmo extends Dmo<IRepoTransBlockSchemasToChange, RepoTransBlockSchemasToChangeESelect, RepoTransBlockSchemasToChangeECreateProperties, RepoTransBlockSchemasToChangeEUpdateProperties, RepoTransBlockSchemasToChangeEId, QRepoTransBlockSchemasToChange> implements IBaseRepoTransBlockSchemasToChangeDmo {
    constructor();
}
export interface IBaseRepositoryTransactionBlockDmo extends IDmo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock> {
}
export declare class BaseRepositoryTransactionBlockDmo extends Dmo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock> implements IBaseRepositoryTransactionBlockDmo {
    constructor();
}
export interface IBaseRepositoryTransactionHistoryUpdateStageDmo extends IDmo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage> {
}
export declare class BaseRepositoryTransactionHistoryUpdateStageDmo extends Dmo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage> implements IBaseRepositoryTransactionHistoryUpdateStageDmo {
    constructor();
}
export interface IBaseSharingMessageDmo extends IDmo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage> {
}
export declare class BaseSharingMessageDmo extends Dmo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage> implements IBaseSharingMessageDmo {
    constructor();
}
export interface IBaseSharingMessageRepoTransBlockDmo extends IDmo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock> {
}
export declare class BaseSharingMessageRepoTransBlockDmo extends Dmo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock> implements IBaseSharingMessageRepoTransBlockDmo {
    constructor();
}
export interface IBaseSharingNodeDmo extends IDmo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode> {
}
export declare class BaseSharingNodeDmo extends Dmo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode> implements IBaseSharingNodeDmo {
    constructor();
}
export interface IBaseSharingNodeDatabaseDmo extends IDmo<ISharingNodeDatabase, SharingNodeDatabaseESelect, SharingNodeDatabaseECreateProperties, SharingNodeDatabaseEUpdateProperties, SharingNodeDatabaseEId, QSharingNodeDatabase> {
}
export declare class BaseSharingNodeDatabaseDmo extends Dmo<ISharingNodeDatabase, SharingNodeDatabaseESelect, SharingNodeDatabaseECreateProperties, SharingNodeDatabaseEUpdateProperties, SharingNodeDatabaseEId, QSharingNodeDatabase> implements IBaseSharingNodeDatabaseDmo {
    constructor();
}
export interface IBaseSharingNodeRepoTransBlockDmo extends IDmo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock> {
}
export declare class BaseSharingNodeRepoTransBlockDmo extends Dmo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock> implements IBaseSharingNodeRepoTransBlockDmo {
    constructor();
}
export interface IBaseSharingNodeRepoTransBlockStageDmo extends IDmo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage> {
}
export declare class BaseSharingNodeRepoTransBlockStageDmo extends Dmo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage> implements IBaseSharingNodeRepoTransBlockStageDmo {
    constructor();
}
export interface IBaseSharingNodeRepositoryDmo extends IDmo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository> {
}
export declare class BaseSharingNodeRepositoryDmo extends Dmo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository> implements IBaseSharingNodeRepositoryDmo {
    constructor();
}
export interface IBaseSynchronizationConflictDmo extends IDmo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict> {
}
export declare class BaseSynchronizationConflictDmo extends Dmo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict> implements IBaseSynchronizationConflictDmo {
    constructor();
}
export interface IBaseSynchronizationConflictPendingNotificationDmo extends IDmo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification> {
}
export declare class BaseSynchronizationConflictPendingNotificationDmo extends Dmo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification> implements IBaseSynchronizationConflictPendingNotificationDmo {
    constructor();
}
export interface IBaseSynchronizationConflictValuesDmo extends IDmo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues> {
}
export declare class BaseSynchronizationConflictValuesDmo extends Dmo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues> implements IBaseSynchronizationConflictValuesDmo {
    constructor();
}
