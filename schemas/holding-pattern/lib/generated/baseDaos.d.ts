import { IDao, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, QActor } from './infrastructure/qactor';
import { IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication } from './infrastructure/qactorapplication';
import { IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication } from './infrastructure/qapplication';
import { IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateColumns, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow } from './traditional/qchildreporow';
import { IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateColumns, ChildRowEUpdateProperties, ChildRowEId, QChildRow } from './traditional/qchildrow';
import { IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateColumns, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow } from './traditional/qimmutablereporow';
import { IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateColumns, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow } from './traditional/qimmutablerow';
import { IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateColumns, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow } from './traditional/qmutablereporow';
import { IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateColumns, MutableRowEUpdateProperties, MutableRowEId, QMutableRow } from './traditional/qmutablerow';
import { IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory } from './history/qoperationhistory';
import { IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory } from './history/qrecordhistory';
import { IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateColumns, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow } from './traditional/qreferencerow';
import { IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, QRepository } from './repository/qrepository';
import { IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor } from './repository/qrepositoryactor';
import { IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication } from './repository/qrepositoryapplication';
import { IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity } from './repository/qrepositoryentity';
import { IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema } from './repository/qrepositoryschema';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateColumns, StageableEUpdateProperties, StageableEId, QStageable } from './infrastructure/qstageable';
import { ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory } from './history/qtransactionhistory';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseActorDao extends IDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, QActor> {
}
export declare class BaseActorDao extends SQDIDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, QActor> implements IBaseActorDao {
    constructor();
}
export interface IBaseActorApplicationDao extends IDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}
export declare class BaseActorApplicationDao extends SQDIDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> implements IBaseActorApplicationDao {
    constructor();
}
export interface IBaseApplicationDao extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}
export declare class BaseApplicationDao extends SQDIDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication> implements IBaseApplicationDao {
    constructor();
}
export interface IBaseChildRepoRowDao extends IDao<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateColumns, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> {
}
export declare class BaseChildRepoRowDao extends SQDIDao<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateColumns, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> implements IBaseChildRepoRowDao {
    constructor();
}
export interface IBaseChildRowDao extends IDao<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateColumns, ChildRowEUpdateProperties, ChildRowEId, QChildRow> {
}
export declare class BaseChildRowDao extends SQDIDao<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateColumns, ChildRowEUpdateProperties, ChildRowEId, QChildRow> implements IBaseChildRowDao {
    constructor();
}
export interface IBaseImmutableRepoRowDao extends IDao<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateColumns, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> {
}
export declare class BaseImmutableRepoRowDao extends SQDIDao<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateColumns, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> implements IBaseImmutableRepoRowDao {
    constructor();
}
export interface IBaseImmutableRowDao extends IDao<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateColumns, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> {
}
export declare class BaseImmutableRowDao extends SQDIDao<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateColumns, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> implements IBaseImmutableRowDao {
    constructor();
}
export interface IBaseMutableRepoRowDao extends IDao<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateColumns, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> {
}
export declare class BaseMutableRepoRowDao extends SQDIDao<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateColumns, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> implements IBaseMutableRepoRowDao {
    constructor();
}
export interface IBaseMutableRowDao extends IDao<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateColumns, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> {
}
export declare class BaseMutableRowDao extends SQDIDao<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateColumns, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> implements IBaseMutableRowDao {
    constructor();
}
export interface IBaseOperationHistoryDao extends IDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}
export declare class BaseOperationHistoryDao extends SQDIDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> implements IBaseOperationHistoryDao {
    constructor();
}
export interface IBaseRecordHistoryDao extends IDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}
export declare class BaseRecordHistoryDao extends SQDIDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> implements IBaseRecordHistoryDao {
    constructor();
}
export interface IBaseRecordHistoryNewValueDao extends IDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDao extends SQDIDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDao {
    constructor();
}
export interface IBaseRecordHistoryOldValueDao extends IDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDao extends SQDIDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDao {
    constructor();
}
export interface IBaseReferenceRowDao extends IDao<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateColumns, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> {
}
export declare class BaseReferenceRowDao extends SQDIDao<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateColumns, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> implements IBaseReferenceRowDao {
    constructor();
}
export interface IBaseRepoTransHistoryChangedRepositoryActorDao extends IDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}
export declare class BaseRepoTransHistoryChangedRepositoryActorDao extends SQDIDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> implements IBaseRepoTransHistoryChangedRepositoryActorDao {
    constructor();
}
export interface IBaseRepositoryDao extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}
export declare class BaseRepositoryDao extends SQDIDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, QRepository> implements IBaseRepositoryDao {
    constructor();
}
export interface IBaseRepositoryActorDao extends IDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}
export declare class BaseRepositoryActorDao extends SQDIDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> implements IBaseRepositoryActorDao {
    constructor();
}
export interface IBaseRepositoryApplicationDao extends IDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDao extends SQDIDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> implements IBaseRepositoryApplicationDao {
    constructor();
}
export interface IBaseRepositoryEntityDao extends IDao<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> {
}
export declare class BaseRepositoryEntityDao extends SQDIDao<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> implements IBaseRepositoryEntityDao {
    constructor();
}
export interface IBaseRepositorySchemaDao extends IDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}
export declare class BaseRepositorySchemaDao extends SQDIDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> implements IBaseRepositorySchemaDao {
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDao extends IDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDao extends SQDIDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDao {
    constructor();
}
export interface IBaseStageableDao extends IDao<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateColumns, StageableEUpdateProperties, StageableEId, QStageable> {
}
export declare class BaseStageableDao extends SQDIDao<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateColumns, StageableEUpdateProperties, StageableEId, QStageable> implements IBaseStageableDao {
    constructor();
}
export interface IBaseTransactionHistoryDao extends IDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDao extends SQDIDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> implements IBaseTransactionHistoryDao {
    constructor();
}
