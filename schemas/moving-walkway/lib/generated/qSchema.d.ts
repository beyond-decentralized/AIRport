import { DbSchema, QSchema as AirportQSchema } from '@airport/air-control';
import { QMissingRecord } from './missingRecord/qmissingrecord';
import { QMissingRecordRepoTransBlock } from './missingRecord/qmissingrecordrepotransblock';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QRepoTransBlockResponseStage } from './repositoryTransactionBlock/qrepotransblockresponsestage';
import { QRepoTransBlockSchemasToChange } from './repositoryTransactionBlock/qrepotransblockschematochange';
import { QRepositoryTransactionBlock } from './repositoryTransactionBlock/qrepositorytransactionblock';
import { QRepositoryTransactionHistoryUpdateStage } from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage';
import { QSharingMessage } from './sharingMessage/qsharingmessage';
import { QSharingMessageRepoTransBlock } from './sharingMessage/qsharingmessagerepotransblock';
import { QSharingNode } from './sharingNode/qsharingnode';
import { QSharingNodeDatabase } from './sharingNode/qsharingnodedatabase';
import { QSharingNodeRepoTransBlock } from './sharingNode/qsharingnoderepotransblock';
import { QSharingNodeRepoTransBlockStage } from './sharingNode/qsharingnoderepotransblockstage';
import { QSharingNodeRepository } from './sharingNode/qsharingnoderepository';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
import { IBaseMissingRecordDmo, IBaseMissingRecordRepoTransBlockDmo, IBaseRecordUpdateStageDmo, IBaseRepoTransBlockResponseStageDmo, IBaseRepoTransBlockSchemasToChangeDmo, IBaseRepositoryTransactionBlockDmo, IBaseRepositoryTransactionHistoryUpdateStageDmo, IBaseSharingMessageDmo, IBaseSharingMessageRepoTransBlockDmo, IBaseSharingNodeDmo, IBaseSharingNodeDatabaseDmo, IBaseSharingNodeRepoTransBlockDmo, IBaseSharingNodeRepoTransBlockStageDmo, IBaseSharingNodeRepositoryDmo, IBaseSynchronizationConflictDmo, IBaseSynchronizationConflictPendingNotificationDmo, IBaseSynchronizationConflictValuesDmo } from './baseDmos';
import { IBaseMissingRecordDao, IBaseMissingRecordRepoTransBlockDao, IBaseRecordUpdateStageDao, IBaseRepoTransBlockResponseStageDao, IBaseRepoTransBlockSchemasToChangeDao, IBaseRepositoryTransactionBlockDao, IBaseRepositoryTransactionHistoryUpdateStageDao, IBaseSharingMessageDao, IBaseSharingMessageRepoTransBlockDao, IBaseSharingNodeDao, IBaseSharingNodeDatabaseDao, IBaseSharingNodeRepoTransBlockDao, IBaseSharingNodeRepoTransBlockStageDao, IBaseSharingNodeRepositoryDao, IBaseSynchronizationConflictDao, IBaseSynchronizationConflictPendingNotificationDao, IBaseSynchronizationConflictValuesDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        MissingRecord: IBaseMissingRecordDmo;
        MissingRecordRepoTransBlock: IBaseMissingRecordRepoTransBlockDmo;
        RecordUpdateStage: IBaseRecordUpdateStageDmo;
        RepoTransBlockResponseStage: IBaseRepoTransBlockResponseStageDmo;
        RepoTransBlockSchemasToChange: IBaseRepoTransBlockSchemasToChangeDmo;
        RepositoryTransactionBlock: IBaseRepositoryTransactionBlockDmo;
        RepositoryTransactionHistoryUpdateStage: IBaseRepositoryTransactionHistoryUpdateStageDmo;
        SharingMessage: IBaseSharingMessageDmo;
        SharingMessageRepoTransBlock: IBaseSharingMessageRepoTransBlockDmo;
        SharingNode: IBaseSharingNodeDmo;
        SharingNodeDatabase: IBaseSharingNodeDatabaseDmo;
        SharingNodeRepoTransBlock: IBaseSharingNodeRepoTransBlockDmo;
        SharingNodeRepoTransBlockStage: IBaseSharingNodeRepoTransBlockStageDmo;
        SharingNodeRepository: IBaseSharingNodeRepositoryDmo;
        SynchronizationConflict: IBaseSynchronizationConflictDmo;
        SynchronizationConflictPendingNotification: IBaseSynchronizationConflictPendingNotificationDmo;
        SynchronizationConflictValues: IBaseSynchronizationConflictValuesDmo;
    };
    dao: {
        MissingRecord: IBaseMissingRecordDao;
        MissingRecordRepoTransBlock: IBaseMissingRecordRepoTransBlockDao;
        RecordUpdateStage: IBaseRecordUpdateStageDao;
        RepoTransBlockResponseStage: IBaseRepoTransBlockResponseStageDao;
        RepoTransBlockSchemasToChange: IBaseRepoTransBlockSchemasToChangeDao;
        RepositoryTransactionBlock: IBaseRepositoryTransactionBlockDao;
        RepositoryTransactionHistoryUpdateStage: IBaseRepositoryTransactionHistoryUpdateStageDao;
        SharingMessage: IBaseSharingMessageDao;
        SharingMessageRepoTransBlock: IBaseSharingMessageRepoTransBlockDao;
        SharingNode: IBaseSharingNodeDao;
        SharingNodeDatabase: IBaseSharingNodeDatabaseDao;
        SharingNodeRepoTransBlock: IBaseSharingNodeRepoTransBlockDao;
        SharingNodeRepoTransBlockStage: IBaseSharingNodeRepoTransBlockStageDao;
        SharingNodeRepository: IBaseSharingNodeRepositoryDao;
        SynchronizationConflict: IBaseSynchronizationConflictDao;
        SynchronizationConflictPendingNotification: IBaseSynchronizationConflictPendingNotificationDao;
        SynchronizationConflictValues: IBaseSynchronizationConflictValuesDao;
    };
    MissingRecord: QMissingRecord;
    MissingRecordRepoTransBlock: QMissingRecordRepoTransBlock;
    RecordUpdateStage: QRecordUpdateStage;
    RepoTransBlockResponseStage: QRepoTransBlockResponseStage;
    RepoTransBlockSchemasToChange: QRepoTransBlockSchemasToChange;
    RepositoryTransactionBlock: QRepositoryTransactionBlock;
    RepositoryTransactionHistoryUpdateStage: QRepositoryTransactionHistoryUpdateStage;
    SharingMessage: QSharingMessage;
    SharingMessageRepoTransBlock: QSharingMessageRepoTransBlock;
    SharingNode: QSharingNode;
    SharingNodeDatabase: QSharingNodeDatabase;
    SharingNodeRepoTransBlock: QSharingNodeRepoTransBlock;
    SharingNodeRepoTransBlockStage: QSharingNodeRepoTransBlockStage;
    SharingNodeRepository: QSharingNodeRepository;
    SynchronizationConflict: QSynchronizationConflict;
    SynchronizationConflictPendingNotification: QSynchronizationConflictPendingNotification;
    SynchronizationConflictValues: QSynchronizationConflictValues;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
