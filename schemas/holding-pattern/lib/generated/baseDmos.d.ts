import { IDmo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dmo } from "@airport/check-in";
import { IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor } from './infrastructure/qactor';
import { IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication } from './infrastructure/qactorapplication';
import { IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication } from './infrastructure/qapplication';
import { IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow } from './traditional/qchildreporow';
import { IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow } from './traditional/qchildrow';
import { IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow } from './traditional/qimmutablereporow';
import { IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow } from './traditional/qimmutablerow';
import { IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow } from './traditional/qmutablereporow';
import { IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow } from './traditional/qmutablerow';
import { IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory } from './history/qoperationhistory';
import { IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory } from './history/qrecordhistory';
import { IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow } from './traditional/qreferencerow';
import { IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository } from './repository/qrepository';
import { IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor } from './repository/qrepositoryactor';
import { IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication } from './repository/qrepositoryapplication';
import { IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity } from './repository/qrepositoryentity';
import { IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema } from './repository/qrepositoryschema';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable } from './infrastructure/qstageable';
import { ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory } from './history/qtransactionhistory';
export declare class SQDIDmo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Dmo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseActorDmo extends IDmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> {
}
export declare class BaseActorDmo extends SQDIDmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> implements IBaseActorDmo {
    constructor();
}
export interface IBaseActorApplicationDmo extends IDmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}
export declare class BaseActorApplicationDmo extends SQDIDmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> implements IBaseActorApplicationDmo {
    constructor();
}
export interface IBaseApplicationDmo extends IDmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}
export declare class BaseApplicationDmo extends SQDIDmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> implements IBaseApplicationDmo {
    constructor();
}
export interface IBaseChildRepoRowDmo extends IDmo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> {
}
export declare class BaseChildRepoRowDmo extends SQDIDmo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> implements IBaseChildRepoRowDmo {
    constructor();
}
export interface IBaseChildRowDmo extends IDmo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow> {
}
export declare class BaseChildRowDmo extends SQDIDmo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow> implements IBaseChildRowDmo {
    constructor();
}
export interface IBaseImmutableRepoRowDmo extends IDmo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> {
}
export declare class BaseImmutableRepoRowDmo extends SQDIDmo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> implements IBaseImmutableRepoRowDmo {
    constructor();
}
export interface IBaseImmutableRowDmo extends IDmo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> {
}
export declare class BaseImmutableRowDmo extends SQDIDmo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> implements IBaseImmutableRowDmo {
    constructor();
}
export interface IBaseMutableRepoRowDmo extends IDmo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> {
}
export declare class BaseMutableRepoRowDmo extends SQDIDmo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> implements IBaseMutableRepoRowDmo {
    constructor();
}
export interface IBaseMutableRowDmo extends IDmo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> {
}
export declare class BaseMutableRowDmo extends SQDIDmo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> implements IBaseMutableRowDmo {
    constructor();
}
export interface IBaseOperationHistoryDmo extends IDmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}
export declare class BaseOperationHistoryDmo extends SQDIDmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> implements IBaseOperationHistoryDmo {
    constructor();
}
export interface IBaseRecordHistoryDmo extends IDmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}
export declare class BaseRecordHistoryDmo extends SQDIDmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> implements IBaseRecordHistoryDmo {
    constructor();
}
export interface IBaseRecordHistoryNewValueDmo extends IDmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDmo extends SQDIDmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDmo {
    constructor();
}
export interface IBaseRecordHistoryOldValueDmo extends IDmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDmo extends SQDIDmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDmo {
    constructor();
}
export interface IBaseReferenceRowDmo extends IDmo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> {
}
export declare class BaseReferenceRowDmo extends SQDIDmo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> implements IBaseReferenceRowDmo {
    constructor();
}
export interface IBaseRepoTransHistoryChangedRepositoryActorDmo extends IDmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}
export declare class BaseRepoTransHistoryChangedRepositoryActorDmo extends SQDIDmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> implements IBaseRepoTransHistoryChangedRepositoryActorDmo {
    constructor();
}
export interface IBaseRepositoryDmo extends IDmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}
export declare class BaseRepositoryDmo extends SQDIDmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> implements IBaseRepositoryDmo {
    constructor();
}
export interface IBaseRepositoryActorDmo extends IDmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}
export declare class BaseRepositoryActorDmo extends SQDIDmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> implements IBaseRepositoryActorDmo {
    constructor();
}
export interface IBaseRepositoryApplicationDmo extends IDmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDmo extends SQDIDmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> implements IBaseRepositoryApplicationDmo {
    constructor();
}
export interface IBaseRepositoryEntityDmo extends IDmo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> {
}
export declare class BaseRepositoryEntityDmo extends SQDIDmo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> implements IBaseRepositoryEntityDmo {
    constructor();
}
export interface IBaseRepositorySchemaDmo extends IDmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}
export declare class BaseRepositorySchemaDmo extends SQDIDmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> implements IBaseRepositorySchemaDmo {
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDmo extends IDmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDmo extends SQDIDmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDmo {
    constructor();
}
export interface IBaseStageableDmo extends IDmo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable> {
}
export declare class BaseStageableDmo extends SQDIDmo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable> implements IBaseStageableDmo {
    constructor();
}
export interface IBaseTransactionHistoryDmo extends IDmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDmo extends SQDIDmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> implements IBaseTransactionHistoryDmo {
    constructor();
}
