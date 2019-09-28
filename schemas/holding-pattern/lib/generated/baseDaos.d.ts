import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IActor } from './infrastructure/actor';
import { ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor } from './infrastructure/qactor';
import { IActorApplication } from './infrastructure/actorapplication';
import { ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication } from './infrastructure/qactorapplication';
import { IApplication } from './infrastructure/application';
import { ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication } from './infrastructure/qapplication';
import { IOperationHistory } from './history/operationhistory';
import { OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory } from './history/qoperationhistory';
import { IRecordHistory } from './history/recordhistory';
import { RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory } from './history/qrecordhistory';
import { IRecordHistoryNewValue } from './history/recordhistorynewvalue';
import { RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue } from './history/recordhistoryoldvalue';
import { RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { IRepoTransHistoryChangedRepositoryActor } from './history/repotranshistorychangedrepositoryactor';
import { RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { IRepository } from './repository/repository';
import { RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository } from './repository/qrepository';
import { IRepositoryActor } from './repository/repositoryactor';
import { RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor } from './repository/qrepositoryactor';
import { IRepositoryApplication } from './repository/repositoryapplication';
import { RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication } from './repository/qrepositoryapplication';
import { IRepositorySchema } from './repository/repositoryschema';
import { RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema } from './repository/qrepositoryschema';
import { IRepositoryTransactionHistory } from './history/repositorytransactionhistory';
import { RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { ITransactionHistory } from './history/transactionhistory';
import { TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory } from './history/qtransactionhistory';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseActorDao extends IDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor> {
}
export declare class BaseActorDao extends SQDIDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor> implements IBaseActorDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseActorApplicationDao extends IDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication> {
}
export declare class BaseActorApplicationDao extends SQDIDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication> implements IBaseActorApplicationDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationDao extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}
export declare class BaseApplicationDao extends SQDIDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> implements IBaseApplicationDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseOperationHistoryDao extends IDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory> {
}
export declare class BaseOperationHistoryDao extends SQDIDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory> implements IBaseOperationHistoryDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryDao extends IDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory> {
}
export declare class BaseRecordHistoryDao extends SQDIDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory> implements IBaseRecordHistoryDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryNewValueDao extends IDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDao extends SQDIDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryOldValueDao extends IDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDao extends SQDIDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepoTransHistoryChangedRepositoryActorDao extends IDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor> {
}
export declare class BaseRepoTransHistoryChangedRepositoryActorDao extends SQDIDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor> implements IBaseRepoTransHistoryChangedRepositoryActorDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDao extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}
export declare class BaseRepositoryDao extends SQDIDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> implements IBaseRepositoryDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryActorDao extends IDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor> {
}
export declare class BaseRepositoryActorDao extends SQDIDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor> implements IBaseRepositoryActorDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryApplicationDao extends IDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDao extends SQDIDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication> implements IBaseRepositoryApplicationDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositorySchemaDao extends IDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema> {
}
export declare class BaseRepositorySchemaDao extends SQDIDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema> implements IBaseRepositorySchemaDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDao extends IDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDao extends SQDIDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTransactionHistoryDao extends IDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDao extends SQDIDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory> implements IBaseTransactionHistoryDao {
    static diSet(): boolean;
    constructor();
}
