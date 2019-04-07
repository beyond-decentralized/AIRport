import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
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
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseActorDuo extends IDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> {
}
export declare class BaseActorDuo extends SQDIDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> implements IBaseActorDuo {
    constructor();
}
export interface IBaseActorApplicationDuo extends IDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}
export declare class BaseActorApplicationDuo extends SQDIDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> implements IBaseActorApplicationDuo {
    constructor();
}
export interface IBaseApplicationDuo extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}
export declare class BaseApplicationDuo extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> implements IBaseApplicationDuo {
    constructor();
}
export interface IBaseChildRepoRowDuo extends IDuo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> {
}
export declare class BaseChildRepoRowDuo extends SQDIDuo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> implements IBaseChildRepoRowDuo {
    constructor();
}
export interface IBaseChildRowDuo extends IDuo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow> {
}
export declare class BaseChildRowDuo extends SQDIDuo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow> implements IBaseChildRowDuo {
    constructor();
}
export interface IBaseImmutableRepoRowDuo extends IDuo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> {
}
export declare class BaseImmutableRepoRowDuo extends SQDIDuo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> implements IBaseImmutableRepoRowDuo {
    constructor();
}
export interface IBaseImmutableRowDuo extends IDuo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> {
}
export declare class BaseImmutableRowDuo extends SQDIDuo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> implements IBaseImmutableRowDuo {
    constructor();
}
export interface IBaseMutableRepoRowDuo extends IDuo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> {
}
export declare class BaseMutableRepoRowDuo extends SQDIDuo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> implements IBaseMutableRepoRowDuo {
    constructor();
}
export interface IBaseMutableRowDuo extends IDuo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> {
}
export declare class BaseMutableRowDuo extends SQDIDuo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> implements IBaseMutableRowDuo {
    constructor();
}
export interface IBaseOperationHistoryDuo extends IDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}
export declare class BaseOperationHistoryDuo extends SQDIDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> implements IBaseOperationHistoryDuo {
    constructor();
}
export interface IBaseRecordHistoryDuo extends IDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}
export declare class BaseRecordHistoryDuo extends SQDIDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> implements IBaseRecordHistoryDuo {
    constructor();
}
export interface IBaseRecordHistoryNewValueDuo extends IDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDuo extends SQDIDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDuo {
    constructor();
}
export interface IBaseRecordHistoryOldValueDuo extends IDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDuo extends SQDIDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDuo {
    constructor();
}
export interface IBaseReferenceRowDuo extends IDuo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> {
}
export declare class BaseReferenceRowDuo extends SQDIDuo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> implements IBaseReferenceRowDuo {
    constructor();
}
export interface IBaseRepoTransHistoryChangedRepositoryActorDuo extends IDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}
export declare class BaseRepoTransHistoryChangedRepositoryActorDuo extends SQDIDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> implements IBaseRepoTransHistoryChangedRepositoryActorDuo {
    constructor();
}
export interface IBaseRepositoryDuo extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}
export declare class BaseRepositoryDuo extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> implements IBaseRepositoryDuo {
    constructor();
}
export interface IBaseRepositoryActorDuo extends IDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}
export declare class BaseRepositoryActorDuo extends SQDIDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> implements IBaseRepositoryActorDuo {
    constructor();
}
export interface IBaseRepositoryApplicationDuo extends IDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDuo extends SQDIDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> implements IBaseRepositoryApplicationDuo {
    constructor();
}
export interface IBaseRepositoryEntityDuo extends IDuo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> {
}
export declare class BaseRepositoryEntityDuo extends SQDIDuo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> implements IBaseRepositoryEntityDuo {
    constructor();
}
export interface IBaseRepositorySchemaDuo extends IDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}
export declare class BaseRepositorySchemaDuo extends SQDIDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> implements IBaseRepositorySchemaDuo {
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDuo extends IDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDuo extends SQDIDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDuo {
    constructor();
}
export interface IBaseStageableDuo extends IDuo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable> {
}
export declare class BaseStageableDuo extends SQDIDuo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable> implements IBaseStageableDuo {
    constructor();
}
export interface IBaseTransactionHistoryDuo extends IDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDuo extends SQDIDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> implements IBaseTransactionHistoryDuo {
    constructor();
}
