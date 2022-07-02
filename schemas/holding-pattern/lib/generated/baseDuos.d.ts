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
import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-traffic-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseActorDuo extends IDuo<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> {
}
export declare class BaseActorDuo extends SQDIDuo<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> implements IBaseActorDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseOperationHistoryDuo extends IDuo<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> {
}
export declare class BaseOperationHistoryDuo extends SQDIDuo<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> implements IBaseOperationHistoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryDuo extends IDuo<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> {
}
export declare class BaseRecordHistoryDuo extends SQDIDuo<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> implements IBaseRecordHistoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryNewValueDuo extends IDuo<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> {
}
export declare class BaseRecordHistoryNewValueDuo extends SQDIDuo<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> implements IBaseRecordHistoryNewValueDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryOldValueDuo extends IDuo<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> {
}
export declare class BaseRecordHistoryOldValueDuo extends SQDIDuo<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> implements IBaseRecordHistoryOldValueDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDuo extends IDuo<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> {
}
export declare class BaseRepositoryDuo extends SQDIDuo<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> implements IBaseRepositoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryApplicationDuo extends IDuo<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication> {
}
export declare class BaseRepositoryApplicationDuo extends SQDIDuo<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication> implements IBaseRepositoryApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryClientDuo extends IDuo<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient> {
}
export declare class BaseRepositoryClientDuo extends SQDIDuo<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient> implements IBaseRepositoryClientDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDatabaseDuo extends IDuo<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase> {
}
export declare class BaseRepositoryDatabaseDuo extends SQDIDuo<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase> implements IBaseRepositoryDatabaseDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTerminalDuo extends IDuo<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal> {
}
export declare class BaseRepositoryTerminalDuo extends SQDIDuo<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal> implements IBaseRepositoryTerminalDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDuo extends IDuo<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> {
}
export declare class BaseRepositoryTransactionHistoryDuo extends SQDIDuo<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> implements IBaseRepositoryTransactionHistoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTypeDuo extends IDuo<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType> {
}
export declare class BaseRepositoryTypeDuo extends SQDIDuo<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType> implements IBaseRepositoryTypeDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTransactionHistoryDuo extends IDuo<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> {
}
export declare class BaseTransactionHistoryDuo extends SQDIDuo<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> implements IBaseTransactionHistoryDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map