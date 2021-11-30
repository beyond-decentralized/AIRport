import { IActor } from './infrastructure/actor';
import { ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor } from './infrastructure/qactor';
import { IOperationHistory } from './history/operationhistory';
import { OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory } from './history/qoperationhistory';
import { IRecordHistory } from './history/recordhistory';
import { RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory } from './history/qrecordhistory';
import { IRecordHistoryNewValue } from './history/recordhistorynewvalue';
import { RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue } from './history/recordhistoryoldvalue';
import { RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { IRepository } from './repository/repository';
import { RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository } from './repository/qrepository';
import { IRepositorySchema } from './repository/repositoryschema';
import { RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaGraph, QRepositorySchema } from './repository/qrepositoryschema';
import { IRepositoryTransactionHistory } from './history/repositorytransactionhistory';
import { RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { ITransactionHistory } from './history/transactionhistory';
import { TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory } from './history/qtransactionhistory';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseActorDao extends IDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> {
}
export declare class BaseActorDao extends SQDIDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> implements IBaseActorDao {
    static Find: DaoQueryDecorators<ActorESelect>;
    static FindOne: DaoQueryDecorators<ActorESelect>;
    static Search: DaoQueryDecorators<ActorESelect>;
    static SearchOne: DaoQueryDecorators<ActorESelect>;
    static Save(config: ActorGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseOperationHistoryDao extends IDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> {
}
export declare class BaseOperationHistoryDao extends SQDIDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> implements IBaseOperationHistoryDao {
    static Find: DaoQueryDecorators<OperationHistoryESelect>;
    static FindOne: DaoQueryDecorators<OperationHistoryESelect>;
    static Search: DaoQueryDecorators<OperationHistoryESelect>;
    static SearchOne: DaoQueryDecorators<OperationHistoryESelect>;
    static Save(config: OperationHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryDao extends IDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> {
}
export declare class BaseRecordHistoryDao extends SQDIDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> implements IBaseRecordHistoryDao {
    static Find: DaoQueryDecorators<RecordHistoryESelect>;
    static FindOne: DaoQueryDecorators<RecordHistoryESelect>;
    static Search: DaoQueryDecorators<RecordHistoryESelect>;
    static SearchOne: DaoQueryDecorators<RecordHistoryESelect>;
    static Save(config: RecordHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryNewValueDao extends IDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDao extends SQDIDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDao {
    static Find: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static FindOne: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static Search: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static SearchOne: DaoQueryDecorators<RecordHistoryNewValueESelect>;
    static Save(config: RecordHistoryNewValueGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryOldValueDao extends IDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDao extends SQDIDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDao {
    static Find: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static FindOne: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static Search: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static SearchOne: DaoQueryDecorators<RecordHistoryOldValueESelect>;
    static Save(config: RecordHistoryOldValueGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDao extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> {
}
export declare class BaseRepositoryDao extends SQDIDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> implements IBaseRepositoryDao {
    static Find: DaoQueryDecorators<RepositoryESelect>;
    static FindOne: DaoQueryDecorators<RepositoryESelect>;
    static Search: DaoQueryDecorators<RepositoryESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryESelect>;
    static Save(config: RepositoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositorySchemaDao extends IDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaGraph, QRepositorySchema> {
}
export declare class BaseRepositorySchemaDao extends SQDIDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaGraph, QRepositorySchema> implements IBaseRepositorySchemaDao {
    static Find: DaoQueryDecorators<RepositorySchemaESelect>;
    static FindOne: DaoQueryDecorators<RepositorySchemaESelect>;
    static Search: DaoQueryDecorators<RepositorySchemaESelect>;
    static SearchOne: DaoQueryDecorators<RepositorySchemaESelect>;
    static Save(config: RepositorySchemaGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDao extends IDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDao extends SQDIDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDao {
    static Find: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static FindOne: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static Search: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static SearchOne: DaoQueryDecorators<RepositoryTransactionHistoryESelect>;
    static Save(config: RepositoryTransactionHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTransactionHistoryDao extends IDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDao extends SQDIDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> implements IBaseTransactionHistoryDao {
    static Find: DaoQueryDecorators<TransactionHistoryESelect>;
    static FindOne: DaoQueryDecorators<TransactionHistoryESelect>;
    static Search: DaoQueryDecorators<TransactionHistoryESelect>;
    static SearchOne: DaoQueryDecorators<TransactionHistoryESelect>;
    static Save(config: TransactionHistoryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map