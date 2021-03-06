import { Actor } from '../ddl/infrastructure/actor';
import { ActorVDescriptor } from './infrastructure/vactor';
import { OperationHistory } from '../ddl/history/operationhistory';
import { OperationHistoryVDescriptor } from './history/voperationhistory';
import { RecordHistory } from '../ddl/history/recordhistory';
import { RecordHistoryVDescriptor } from './history/vrecordhistory';
import { RecordHistoryNewValue } from '../ddl/history/recordhistorynewvalue';
import { RecordHistoryNewValueVDescriptor } from './history/vrecordhistorynewvalue';
import { RecordHistoryOldValue } from '../ddl/history/recordhistoryoldvalue';
import { RecordHistoryOldValueVDescriptor } from './history/vrecordhistoryoldvalue';
import { Repository } from '../ddl/repository/repository';
import { RepositoryVDescriptor } from './repository/vrepository';
import { RepositoryApplication } from '../ddl/repository/repositoryapplication';
import { RepositoryApplicationVDescriptor } from './repository/vrepositoryapplication';
import { RepositoryClient } from '../ddl/repository/repositoryclient';
import { RepositoryClientVDescriptor } from './repository/vrepositoryclient';
import { RepositoryDatabase } from '../ddl/repository/repositorydatabase';
import { RepositoryDatabaseVDescriptor } from './repository/vrepositorydatabase';
import { RepositoryTerminal } from '../ddl/repository/repositoryterminal';
import { RepositoryTerminalVDescriptor } from './repository/vrepositoryterminal';
import { RepositoryTransactionHistory } from '../ddl/history/repositorytransactionhistory';
import { RepositoryTransactionHistoryVDescriptor } from './history/vrepositorytransactionhistory';
import { RepositoryType } from '../ddl/repository/repositorytype';
import { RepositoryTypeVDescriptor } from './repository/vrepositorytype';
import { TransactionHistory } from '../ddl/history/transactionhistory';
import { TransactionHistoryVDescriptor } from './history/vtransactionhistory';
import { IDvo, Dvo } from '@airport/airbridge-validate';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDvo<Entity, EntityVDescriptor> extends Dvo<Entity, EntityVDescriptor> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseActorDvo extends IDvo<Actor, ActorVDescriptor<Actor>> {
}
export declare class BaseActorDvo extends SQDIDvo<Actor, ActorVDescriptor<Actor>> implements IBaseActorDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseOperationHistoryDvo extends IDvo<OperationHistory, OperationHistoryVDescriptor<OperationHistory>> {
}
export declare class BaseOperationHistoryDvo extends SQDIDvo<OperationHistory, OperationHistoryVDescriptor<OperationHistory>> implements IBaseOperationHistoryDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryDvo extends IDvo<RecordHistory, RecordHistoryVDescriptor<RecordHistory>> {
}
export declare class BaseRecordHistoryDvo extends SQDIDvo<RecordHistory, RecordHistoryVDescriptor<RecordHistory>> implements IBaseRecordHistoryDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryNewValueDvo extends IDvo<RecordHistoryNewValue, RecordHistoryNewValueVDescriptor<RecordHistoryNewValue>> {
}
export declare class BaseRecordHistoryNewValueDvo extends SQDIDvo<RecordHistoryNewValue, RecordHistoryNewValueVDescriptor<RecordHistoryNewValue>> implements IBaseRecordHistoryNewValueDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordHistoryOldValueDvo extends IDvo<RecordHistoryOldValue, RecordHistoryOldValueVDescriptor<RecordHistoryOldValue>> {
}
export declare class BaseRecordHistoryOldValueDvo extends SQDIDvo<RecordHistoryOldValue, RecordHistoryOldValueVDescriptor<RecordHistoryOldValue>> implements IBaseRecordHistoryOldValueDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDvo extends IDvo<Repository, RepositoryVDescriptor<Repository>> {
}
export declare class BaseRepositoryDvo extends SQDIDvo<Repository, RepositoryVDescriptor<Repository>> implements IBaseRepositoryDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryApplicationDvo extends IDvo<RepositoryApplication, RepositoryApplicationVDescriptor<RepositoryApplication>> {
}
export declare class BaseRepositoryApplicationDvo extends SQDIDvo<RepositoryApplication, RepositoryApplicationVDescriptor<RepositoryApplication>> implements IBaseRepositoryApplicationDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryClientDvo extends IDvo<RepositoryClient, RepositoryClientVDescriptor<RepositoryClient>> {
}
export declare class BaseRepositoryClientDvo extends SQDIDvo<RepositoryClient, RepositoryClientVDescriptor<RepositoryClient>> implements IBaseRepositoryClientDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDatabaseDvo extends IDvo<RepositoryDatabase, RepositoryDatabaseVDescriptor<RepositoryDatabase>> {
}
export declare class BaseRepositoryDatabaseDvo extends SQDIDvo<RepositoryDatabase, RepositoryDatabaseVDescriptor<RepositoryDatabase>> implements IBaseRepositoryDatabaseDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTerminalDvo extends IDvo<RepositoryTerminal, RepositoryTerminalVDescriptor<RepositoryTerminal>> {
}
export declare class BaseRepositoryTerminalDvo extends SQDIDvo<RepositoryTerminal, RepositoryTerminalVDescriptor<RepositoryTerminal>> implements IBaseRepositoryTerminalDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTransactionHistoryDvo extends IDvo<RepositoryTransactionHistory, RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>> {
}
export declare class BaseRepositoryTransactionHistoryDvo extends SQDIDvo<RepositoryTransactionHistory, RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>> implements IBaseRepositoryTransactionHistoryDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryTypeDvo extends IDvo<RepositoryType, RepositoryTypeVDescriptor<RepositoryType>> {
}
export declare class BaseRepositoryTypeDvo extends SQDIDvo<RepositoryType, RepositoryTypeVDescriptor<RepositoryType>> implements IBaseRepositoryTypeDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTransactionHistoryDvo extends IDvo<TransactionHistory, TransactionHistoryVDescriptor<TransactionHistory>> {
}
export declare class BaseTransactionHistoryDvo extends SQDIDvo<TransactionHistory, TransactionHistoryVDescriptor<TransactionHistory>> implements IBaseTransactionHistoryDvo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDvos.d.ts.map