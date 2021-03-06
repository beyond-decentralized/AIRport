import { Actor } from '../ddl/infrastructure/actor';
import { ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor } from './infrastructure/qactor';
import { OperationHistory } from '../ddl/history/operationhistory';
import { OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory } from './history/qoperationhistory';
import { RecordHistory } from '../ddl/history/recordhistory';
import { RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory } from './history/qrecordhistory';
import { RecordHistoryNewValue } from '../ddl/history/recordhistorynewvalue';
import { RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { RecordHistoryOldValue } from '../ddl/history/recordhistoryoldvalue';
import { RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { Repository } from '../ddl/repository/repository';
import { RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository } from './repository/qrepository';
import { RepositoryApplication } from '../ddl/repository/repositoryapplication';
import { RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication } from './repository/qrepositoryapplication';
import { RepositoryClient } from '../ddl/repository/repositoryclient';
import { RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient } from './repository/qrepositoryclient';
import { RepositoryDatabase } from '../ddl/repository/repositorydatabase';
import { RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase } from './repository/qrepositorydatabase';
import { RepositoryTerminal } from '../ddl/repository/repositoryterminal';
import { RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal } from './repository/qrepositoryterminal';
import { RepositoryTransactionHistory } from '../ddl/history/repositorytransactionhistory';
import { RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { RepositoryType } from '../ddl/repository/repositorytype';
import { RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType } from './repository/qrepositorytype';
import { TransactionHistory } from '../ddl/history/transactionhistory';
import { TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory } from './history/qtransactionhistory';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
import { IDao, Dao, DaoQueryDecorators } from '@airport/tarmaq-dao';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseActorDao extends IDao<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> {
}
export declare class BaseActorDao extends SQDIDao<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> implements IBaseActorDao {
    static Find: DaoQueryDecorators<ActorESelect>;
    static FindOne: DaoQueryDecorators<ActorESelect>;
    static Search: DaoQueryDecorators<ActorESelect>;
    static SearchOne: DaoQueryDecorators<ActorESelect>;
    static Save(config: ActorGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseOperationHistoryDao extends IDao<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> {
}
export declare class BaseOperationHistoryDao extends SQDIDao<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> implements IBaseOperationHistoryDao {
    static Find: DaoQueryDecorators<OperationHistoryESelect>;
    static FindOne: DaoQueryDecorators<OperationHistoryESelect>;
    static Search: DaoQueryDecorators<OperationHistoryESelect>;
    static SearchOne: DaoQueryDecorators<OperationHistoryESelect>;
    static Save(config: OperationHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryDao extends IDao<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> {
}
export declare class BaseRecordHistoryDao extends SQDIDao<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> implements IBaseRecordHistoryDao {
    static Find: DaoQueryDecorators<RecordHistoryESelect>;
    static FindOne: DaoQueryDecorators<RecordHistoryESelect>;
    static Search: DaoQueryDecorators<RecordHistoryESelect>;
    static SearchOne: DaoQueryDecorators<RecordHistoryESelect>;
    static Save(config: RecordHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryNewValueDao extends IDao<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDao extends SQDIDao<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDao {
    static Find: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static FindOne: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static Search: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static SearchOne: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static Save(config: RecordHistoryNewValueGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryOldValueDao extends IDao<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDao extends SQDIDao<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDao {
    static Find: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static FindOne: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static Search: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static SearchOne: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static Save(config: RecordHistoryOldValueGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDao extends IDao<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> {
}
export declare class BaseRepositoryDao extends SQDIDao<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> implements IBaseRepositoryDao {
    static Find: DaoQueryDecorators<RepositoryESelect>;
    static FindOne: DaoQueryDecorators<RepositoryESelect>;
    static Search: DaoQueryDecorators<RepositoryESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryESelect>;
    static Save(config: RepositoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryApplicationDao extends IDao<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDao extends SQDIDao<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication> implements IBaseRepositoryApplicationDao {
    static Find: DaoQueryDecorators<RepositoryApplicationESelect>;
    static FindOne: DaoQueryDecorators<RepositoryApplicationESelect>;
    static Search: DaoQueryDecorators<RepositoryApplicationESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryApplicationESelect>;
    static Save(config: RepositoryApplicationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryClientDao extends IDao<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient> {
}
export declare class BaseRepositoryClientDao extends SQDIDao<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient> implements IBaseRepositoryClientDao {
    static Find: DaoQueryDecorators<RepositoryClientESelect>;
    static FindOne: DaoQueryDecorators<RepositoryClientESelect>;
    static Search: DaoQueryDecorators<RepositoryClientESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryClientESelect>;
    static Save(config: RepositoryClientGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDatabaseDao extends IDao<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase> {
}
export declare class BaseRepositoryDatabaseDao extends SQDIDao<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase> implements IBaseRepositoryDatabaseDao {
    static Find: DaoQueryDecorators<RepositoryDatabaseESelect>;
    static FindOne: DaoQueryDecorators<RepositoryDatabaseESelect>;
    static Search: DaoQueryDecorators<RepositoryDatabaseESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryDatabaseESelect>;
    static Save(config: RepositoryDatabaseGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTerminalDao extends IDao<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal> {
}
export declare class BaseRepositoryTerminalDao extends SQDIDao<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal> implements IBaseRepositoryTerminalDao {
    static Find: DaoQueryDecorators<RepositoryTerminalESelect>;
    static FindOne: DaoQueryDecorators<RepositoryTerminalESelect>;
    static Search: DaoQueryDecorators<RepositoryTerminalESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryTerminalESelect>;
    static Save(config: RepositoryTerminalGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDao extends IDao<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDao extends SQDIDao<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDao {
    static Find: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static FindOne: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static Search: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static Save(config: RepositoryTransactionHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTypeDao extends IDao<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType> {
}
export declare class BaseRepositoryTypeDao extends SQDIDao<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType> implements IBaseRepositoryTypeDao {
    static Find: DaoQueryDecorators<RepositoryTypeESelect>;
    static FindOne: DaoQueryDecorators<RepositoryTypeESelect>;
    static Search: DaoQueryDecorators<RepositoryTypeESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryTypeESelect>;
    static Save(config: RepositoryTypeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTransactionHistoryDao extends IDao<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDao extends SQDIDao<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> implements IBaseTransactionHistoryDao {
    static Find: DaoQueryDecorators<TransactionHistoryESelect>;
    static FindOne: DaoQueryDecorators<TransactionHistoryESelect>;
    static Search: DaoQueryDecorators<TransactionHistoryESelect>;
    static SearchOne: DaoQueryDecorators<TransactionHistoryESelect>;
    static Save(config: TransactionHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map