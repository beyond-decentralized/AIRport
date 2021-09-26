import { IMissingRecord } from './missingRecord/missingrecord';
import { MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord } from './missingRecord/qmissingrecord';
import { IMissingRecordRepoTransBlock } from './missingRecord/missingrecordrepotransblock';
import { MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockGraph, QMissingRecordRepoTransBlock } from './missingRecord/qmissingrecordrepotransblock';
import { IRecordUpdateStage } from './recordupdatestage';
import { RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage } from './qrecordupdatestage';
import { IRepoTransBlockResponseStage } from './repositoryTransactionBlock/repotransblockresponsestage';
import { RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageGraph, QRepoTransBlockResponseStage } from './repositoryTransactionBlock/qrepotransblockresponsestage';
import { IRepoTransBlockSchemaToChange } from './repositoryTransactionBlock/repotransblockschematochange';
import { RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeGraph, QRepoTransBlockSchemaToChange } from './repositoryTransactionBlock/qrepotransblockschematochange';
import { IRepositoryTransactionBlock } from './repositoryTransactionBlock/repositorytransactionblock';
import { RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockGraph, QRepositoryTransactionBlock } from './repositoryTransactionBlock/qrepositorytransactionblock';
import { IRepositoryTransactionHistoryUpdateStage } from './repositoryTransactionBlock/repositorytransactionhistoryupdatestage';
import { RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageGraph, QRepositoryTransactionHistoryUpdateStage } from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage';
import { ISharingMessage } from './sharingMessage/sharingmessage';
import { SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageGraph, QSharingMessage } from './sharingMessage/qsharingmessage';
import { ISharingMessageRepoTransBlock } from './sharingMessage/sharingmessagerepotransblock';
import { SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockGraph, QSharingMessageRepoTransBlock } from './sharingMessage/qsharingmessagerepotransblock';
import { ISharingNode } from './sharingNode/sharingnode';
import { SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeGraph, QSharingNode } from './sharingNode/qsharingnode';
import { ISharingNodeRepoTransBlock } from './sharingNode/sharingnoderepotransblock';
import { SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockGraph, QSharingNodeRepoTransBlock } from './sharingNode/qsharingnoderepotransblock';
import { ISharingNodeRepoTransBlockStage } from './sharingNode/sharingnoderepotransblockstage';
import { SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageGraph, QSharingNodeRepoTransBlockStage } from './sharingNode/qsharingnoderepotransblockstage';
import { ISharingNodeRepository } from './sharingNode/sharingnoderepository';
import { SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryGraph, QSharingNodeRepository } from './sharingNode/qsharingnoderepository';
import { ISharingNodeTerminal } from './sharingNode/sharingnodeterminal';
import { SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalGraph, QSharingNodeTerminal } from './sharingNode/qsharingnodeterminal';
import { ISynchronizationConflict } from './conflict/synchronizationconflict';
import { SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { ISynchronizationConflictPendingNotification } from './conflict/synchronizationconflictpendingnotification';
import { SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { ISynchronizationConflictValues } from './conflict/synchronizationconflictvalues';
import { SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseMissingRecordDao extends IDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord> {
}
export declare class BaseMissingRecordDao extends SQDIDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord> implements IBaseMissingRecordDao {
    static Find: DaoQueryDecorators<MissingRecordESelect>;
    static FindOne: DaoQueryDecorators<MissingRecordESelect>;
    static Search: DaoQueryDecorators<MissingRecordESelect>;
    static SearchOne: DaoQueryDecorators<MissingRecordESelect>;
    static Save(config: MissingRecordGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseMissingRecordRepoTransBlockDao extends IDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockGraph, QMissingRecordRepoTransBlock> {
}
export declare class BaseMissingRecordRepoTransBlockDao extends SQDIDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockGraph, QMissingRecordRepoTransBlock> implements IBaseMissingRecordRepoTransBlockDao {
    static Find: DaoQueryDecorators<MissingRecordRepoTransBlockESelect>;
    static FindOne: DaoQueryDecorators<MissingRecordRepoTransBlockESelect>;
    static Search: DaoQueryDecorators<MissingRecordRepoTransBlockESelect>;
    static SearchOne: DaoQueryDecorators<MissingRecordRepoTransBlockESelect>;
    static Save(config: MissingRecordRepoTransBlockGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordUpdateStageDao extends IDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> {
}
export declare class BaseRecordUpdateStageDao extends SQDIDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> implements IBaseRecordUpdateStageDao {
    static Find: DaoQueryDecorators<RecordUpdateStageESelect>;
    static FindOne: DaoQueryDecorators<RecordUpdateStageESelect>;
    static Search: DaoQueryDecorators<RecordUpdateStageESelect>;
    static SearchOne: DaoQueryDecorators<RecordUpdateStageESelect>;
    static Save(config: RecordUpdateStageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepoTransBlockResponseStageDao extends IDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageGraph, QRepoTransBlockResponseStage> {
}
export declare class BaseRepoTransBlockResponseStageDao extends SQDIDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageGraph, QRepoTransBlockResponseStage> implements IBaseRepoTransBlockResponseStageDao {
    static Find: DaoQueryDecorators<RepoTransBlockResponseStageESelect>;
    static FindOne: DaoQueryDecorators<RepoTransBlockResponseStageESelect>;
    static Search: DaoQueryDecorators<RepoTransBlockResponseStageESelect>;
    static SearchOne: DaoQueryDecorators<RepoTransBlockResponseStageESelect>;
    static Save(config: RepoTransBlockResponseStageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepoTransBlockSchemaToChangeDao extends IDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeGraph, QRepoTransBlockSchemaToChange> {
}
export declare class BaseRepoTransBlockSchemaToChangeDao extends SQDIDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeGraph, QRepoTransBlockSchemaToChange> implements IBaseRepoTransBlockSchemaToChangeDao {
    static Find: DaoQueryDecorators<RepoTransBlockSchemaToChangeESelect>;
    static FindOne: DaoQueryDecorators<RepoTransBlockSchemaToChangeESelect>;
    static Search: DaoQueryDecorators<RepoTransBlockSchemaToChangeESelect>;
    static SearchOne: DaoQueryDecorators<RepoTransBlockSchemaToChangeESelect>;
    static Save(config: RepoTransBlockSchemaToChangeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionBlockDao extends IDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockGraph, QRepositoryTransactionBlock> {
}
export declare class BaseRepositoryTransactionBlockDao extends SQDIDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockGraph, QRepositoryTransactionBlock> implements IBaseRepositoryTransactionBlockDao {
    static Find: DaoQueryDecorators<RepositoryTransactionBlockESelect>;
    static FindOne: DaoQueryDecorators<RepositoryTransactionBlockESelect>;
    static Search: DaoQueryDecorators<RepositoryTransactionBlockESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryTransactionBlockESelect>;
    static Save(config: RepositoryTransactionBlockGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionHistoryUpdateStageDao extends IDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageGraph, QRepositoryTransactionHistoryUpdateStage> {
}
export declare class BaseRepositoryTransactionHistoryUpdateStageDao extends SQDIDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageGraph, QRepositoryTransactionHistoryUpdateStage> implements IBaseRepositoryTransactionHistoryUpdateStageDao {
    static Find: DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>;
    static FindOne: DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>;
    static Search: DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>;
    static Save(config: RepositoryTransactionHistoryUpdateStageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSharingMessageDao extends IDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageGraph, QSharingMessage> {
}
export declare class BaseSharingMessageDao extends SQDIDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageGraph, QSharingMessage> implements IBaseSharingMessageDao {
    static Find: DaoQueryDecorators<SharingMessageESelect>;
    static FindOne: DaoQueryDecorators<SharingMessageESelect>;
    static Search: DaoQueryDecorators<SharingMessageESelect>;
    static SearchOne: DaoQueryDecorators<SharingMessageESelect>;
    static Save(config: SharingMessageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSharingMessageRepoTransBlockDao extends IDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockGraph, QSharingMessageRepoTransBlock> {
}
export declare class BaseSharingMessageRepoTransBlockDao extends SQDIDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockGraph, QSharingMessageRepoTransBlock> implements IBaseSharingMessageRepoTransBlockDao {
    static Find: DaoQueryDecorators<SharingMessageRepoTransBlockESelect>;
    static FindOne: DaoQueryDecorators<SharingMessageRepoTransBlockESelect>;
    static Search: DaoQueryDecorators<SharingMessageRepoTransBlockESelect>;
    static SearchOne: DaoQueryDecorators<SharingMessageRepoTransBlockESelect>;
    static Save(config: SharingMessageRepoTransBlockGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSharingNodeDao extends IDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeGraph, QSharingNode> {
}
export declare class BaseSharingNodeDao extends SQDIDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeGraph, QSharingNode> implements IBaseSharingNodeDao {
    static Find: DaoQueryDecorators<SharingNodeESelect>;
    static FindOne: DaoQueryDecorators<SharingNodeESelect>;
    static Search: DaoQueryDecorators<SharingNodeESelect>;
    static SearchOne: DaoQueryDecorators<SharingNodeESelect>;
    static Save(config: SharingNodeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSharingNodeRepoTransBlockDao extends IDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockGraph, QSharingNodeRepoTransBlock> {
}
export declare class BaseSharingNodeRepoTransBlockDao extends SQDIDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockGraph, QSharingNodeRepoTransBlock> implements IBaseSharingNodeRepoTransBlockDao {
    static Find: DaoQueryDecorators<SharingNodeRepoTransBlockESelect>;
    static FindOne: DaoQueryDecorators<SharingNodeRepoTransBlockESelect>;
    static Search: DaoQueryDecorators<SharingNodeRepoTransBlockESelect>;
    static SearchOne: DaoQueryDecorators<SharingNodeRepoTransBlockESelect>;
    static Save(config: SharingNodeRepoTransBlockGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSharingNodeRepoTransBlockStageDao extends IDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageGraph, QSharingNodeRepoTransBlockStage> {
}
export declare class BaseSharingNodeRepoTransBlockStageDao extends SQDIDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageGraph, QSharingNodeRepoTransBlockStage> implements IBaseSharingNodeRepoTransBlockStageDao {
    static Find: DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>;
    static FindOne: DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>;
    static Search: DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>;
    static SearchOne: DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>;
    static Save(config: SharingNodeRepoTransBlockStageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSharingNodeRepositoryDao extends IDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryGraph, QSharingNodeRepository> {
}
export declare class BaseSharingNodeRepositoryDao extends SQDIDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryGraph, QSharingNodeRepository> implements IBaseSharingNodeRepositoryDao {
    static Find: DaoQueryDecorators<SharingNodeRepositoryESelect>;
    static FindOne: DaoQueryDecorators<SharingNodeRepositoryESelect>;
    static Search: DaoQueryDecorators<SharingNodeRepositoryESelect>;
    static SearchOne: DaoQueryDecorators<SharingNodeRepositoryESelect>;
    static Save(config: SharingNodeRepositoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSharingNodeTerminalDao extends IDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalGraph, QSharingNodeTerminal> {
}
export declare class BaseSharingNodeTerminalDao extends SQDIDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalGraph, QSharingNodeTerminal> implements IBaseSharingNodeTerminalDao {
    static Find: DaoQueryDecorators<SharingNodeTerminalESelect>;
    static FindOne: DaoQueryDecorators<SharingNodeTerminalESelect>;
    static Search: DaoQueryDecorators<SharingNodeTerminalESelect>;
    static SearchOne: DaoQueryDecorators<SharingNodeTerminalESelect>;
    static Save(config: SharingNodeTerminalGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictDao extends IDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> {
}
export declare class BaseSynchronizationConflictDao extends SQDIDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> implements IBaseSynchronizationConflictDao {
    static Find: DaoQueryDecorators<SynchronizationConflictESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictESelect>;
    static Save(config: SynchronizationConflictGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictPendingNotificationDao extends IDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification> {
}
export declare class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification> implements IBaseSynchronizationConflictPendingNotificationDao {
    static Find: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static Save(config: SynchronizationConflictPendingNotificationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictValuesDao extends IDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> {
}
export declare class BaseSynchronizationConflictValuesDao extends SQDIDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> implements IBaseSynchronizationConflictValuesDao {
    static Find: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static Save(config: SynchronizationConflictValuesGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map