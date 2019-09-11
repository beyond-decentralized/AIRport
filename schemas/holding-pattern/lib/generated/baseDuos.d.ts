import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor } from './infrastructure/qactor';
import { IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication } from './infrastructure/qactorapplication';
import { IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication } from './infrastructure/qapplication';
import { IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory } from './history/qoperationhistory';
import { IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory } from './history/qrecordhistory';
import { IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository } from './repository/qrepository';
import { IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor } from './repository/qrepositoryactor';
import { IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication } from './repository/qrepositoryapplication';
import { IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema } from './repository/qrepositoryschema';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory } from './history/qtransactionhistory';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseActorDuo extends IDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor> {
}
export declare class BaseActorDuo extends SQDIDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor> implements IBaseActorDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseActorApplicationDuo extends IDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication> {
}
export declare class BaseActorApplicationDuo extends SQDIDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication> implements IBaseActorApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationDuo extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}
export declare class BaseApplicationDuo extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> implements IBaseApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseOperationHistoryDuo extends IDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory> {
}
export declare class BaseOperationHistoryDuo extends SQDIDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory> implements IBaseOperationHistoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryDuo extends IDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory> {
}
export declare class BaseRecordHistoryDuo extends SQDIDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory> implements IBaseRecordHistoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryNewValueDuo extends IDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDuo extends SQDIDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryOldValueDuo extends IDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDuo extends SQDIDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepoTransHistoryChangedRepositoryActorDuo extends IDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor> {
}
export declare class BaseRepoTransHistoryChangedRepositoryActorDuo extends SQDIDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor> implements IBaseRepoTransHistoryChangedRepositoryActorDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDuo extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}
export declare class BaseRepositoryDuo extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> implements IBaseRepositoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryActorDuo extends IDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor> {
}
export declare class BaseRepositoryActorDuo extends SQDIDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor> implements IBaseRepositoryActorDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryApplicationDuo extends IDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDuo extends SQDIDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication> implements IBaseRepositoryApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositorySchemaDuo extends IDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema> {
}
export declare class BaseRepositorySchemaDuo extends SQDIDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema> implements IBaseRepositorySchemaDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDuo extends IDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDuo extends SQDIDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTransactionHistoryDuo extends IDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDuo extends SQDIDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory> implements IBaseTransactionHistoryDuo {
    static diSet(): boolean;
    constructor();
}
