import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { IAbstractRepositoryEntity, AbstractRepositoryEntityESelect, AbstractRepositoryEntityECreateProperties, AbstractRepositoryEntityEUpdateProperties, AbstractRepositoryEntityEId, QAbstractRepositoryEntity } from './repository/qabstractrepositoryentity';
import { IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor } from './infrastructure/qactor';
import { IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication } from './infrastructure/qactorapplication';
import { IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication } from './infrastructure/qapplication';
import { IDatabase, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateProperties, DatabaseEId, QDatabase } from './infrastructure/qdatabase';
import { IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory } from './history/qoperationhistory';
import { IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory } from './history/qrecordhistory';
import { IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository } from './repository/qrepository';
import { IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor } from './repository/qrepositoryactor';
import { IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication } from './repository/qrepositoryapplication';
import { IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema } from './repository/qrepositoryschema';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory } from './history/qtransactionhistory';
import { IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser } from './infrastructure/quser';
export interface IBaseAbstractRepositoryEntityDmo extends IDmo<IAbstractRepositoryEntity, AbstractRepositoryEntityESelect, AbstractRepositoryEntityECreateProperties, AbstractRepositoryEntityEUpdateProperties, AbstractRepositoryEntityEId, QAbstractRepositoryEntity> {
}
export declare class BaseAbstractRepositoryEntityDmo extends Dmo<IAbstractRepositoryEntity, AbstractRepositoryEntityESelect, AbstractRepositoryEntityECreateProperties, AbstractRepositoryEntityEUpdateProperties, AbstractRepositoryEntityEId, QAbstractRepositoryEntity> implements IBaseAbstractRepositoryEntityDmo {
    constructor();
}
export interface IBaseActorDmo extends IDmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> {
}
export declare class BaseActorDmo extends Dmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> implements IBaseActorDmo {
    constructor();
}
export interface IBaseActorApplicationDmo extends IDmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}
export declare class BaseActorApplicationDmo extends Dmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> implements IBaseActorApplicationDmo {
    constructor();
}
export interface IBaseApplicationDmo extends IDmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}
export declare class BaseApplicationDmo extends Dmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> implements IBaseApplicationDmo {
    constructor();
}
export interface IBaseDatabaseDmo extends IDmo<IDatabase, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateProperties, DatabaseEId, QDatabase> {
}
export declare class BaseDatabaseDmo extends Dmo<IDatabase, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateProperties, DatabaseEId, QDatabase> implements IBaseDatabaseDmo {
    constructor();
}
export interface IBaseOperationHistoryDmo extends IDmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}
export declare class BaseOperationHistoryDmo extends Dmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> implements IBaseOperationHistoryDmo {
    constructor();
}
export interface IBaseRecordHistoryDmo extends IDmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}
export declare class BaseRecordHistoryDmo extends Dmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> implements IBaseRecordHistoryDmo {
    constructor();
}
export interface IBaseRecordHistoryNewValueDmo extends IDmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDmo extends Dmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDmo {
    constructor();
}
export interface IBaseRecordHistoryOldValueDmo extends IDmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDmo extends Dmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDmo {
    constructor();
}
export interface IBaseRepoTransHistoryChangedRepositoryActorDmo extends IDmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}
export declare class BaseRepoTransHistoryChangedRepositoryActorDmo extends Dmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> implements IBaseRepoTransHistoryChangedRepositoryActorDmo {
    constructor();
}
export interface IBaseRepositoryDmo extends IDmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}
export declare class BaseRepositoryDmo extends Dmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> implements IBaseRepositoryDmo {
    constructor();
}
export interface IBaseRepositoryActorDmo extends IDmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}
export declare class BaseRepositoryActorDmo extends Dmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> implements IBaseRepositoryActorDmo {
    constructor();
}
export interface IBaseRepositoryApplicationDmo extends IDmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDmo extends Dmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> implements IBaseRepositoryApplicationDmo {
    constructor();
}
export interface IBaseRepositorySchemaDmo extends IDmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}
export declare class BaseRepositorySchemaDmo extends Dmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> implements IBaseRepositorySchemaDmo {
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDmo extends IDmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDmo extends Dmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDmo {
    constructor();
}
export interface IBaseTransactionHistoryDmo extends IDmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDmo extends Dmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> implements IBaseTransactionHistoryDmo {
    constructor();
}
export interface IBaseUserDmo extends IDmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}
export declare class BaseUserDmo extends Dmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> implements IBaseUserDmo {
    constructor();
}
