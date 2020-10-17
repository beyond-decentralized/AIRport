import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IAgtRepositoryTransactionBlock } from './synchronization/agtrepositorytransactionblock';
import { AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock } from './synchronization/qagtrepositorytransactionblock';
import { IAgtSharingMessage } from './synchronization/agtsharingmessage';
import { AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage } from './synchronization/qagtsharingmessage';
import { IArchive } from './repository/archive';
import { ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive } from './repository/qarchive';
import { IDailyArchiveLog } from './archive/dailyarchivelog';
import { DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog } from './archive/qdailyarchivelog';
import { IDailyTerminalSyncLog } from './archive/dailyterminalsynclog';
import { DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog } from './archive/qdailyterminalsynclog';
import { IMonthlyArchiveLog } from './archive/monthlyarchivelog';
import { MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog } from './archive/qmonthlyarchivelog';
import { IMonthlyTerminalSyncLog } from './archive/monthlyterminalsynclog';
import { MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog } from './archive/qmonthlyterminalsynclog';
import { IRepository } from './repository/repository';
import { RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository } from './repository/qrepository';
import { IRepositoryArchive } from './repository/repositoryarchive';
import { RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive } from './repository/qrepositoryarchive';
import { ISecurityAnswer } from './user/security/securityanswer';
import { SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer } from './user/security/qsecurityanswer';
import { ISecurityQuestion } from './user/security/securityquestion';
import { SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion } from './user/security/qsecurityquestion';
import { IServer } from './server/server';
import { ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer } from './server/qserver';
import { IServerSyncLog } from './server/serversynclog';
import { ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog } from './server/qserversynclog';
import { ISyncLog } from './synchronization/synclog';
import { SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog } from './synchronization/qsynclog';
import { ITerminal } from './terminal/terminal';
import { TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal } from './terminal/qterminal';
import { ITerminalRepository } from './terminal/terminalrepository';
import { TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository } from './terminal/qterminalrepository';
import { ITuningParameters } from './tuning/tuningparameters';
import { TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters } from './tuning/qtuningparameters';
import { IUser } from './user/user';
import { UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser } from './user/quser';
import { IUserRepository } from './user/userrepository';
import { UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository } from './user/quserrepository';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAgtRepositoryTransactionBlockDuo extends IDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock> {
}
export declare class BaseAgtRepositoryTransactionBlockDuo extends SQDIDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock> implements IBaseAgtRepositoryTransactionBlockDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseAgtSharingMessageDuo extends IDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage> {
}
export declare class BaseAgtSharingMessageDuo extends SQDIDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage> implements IBaseAgtSharingMessageDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseArchiveDuo extends IDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive> {
}
export declare class BaseArchiveDuo extends SQDIDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive> implements IBaseArchiveDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDailyArchiveLogDuo extends IDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog> {
}
export declare class BaseDailyArchiveLogDuo extends SQDIDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog> implements IBaseDailyArchiveLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDailyTerminalSyncLogDuo extends IDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog> {
}
export declare class BaseDailyTerminalSyncLogDuo extends SQDIDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog> implements IBaseDailyTerminalSyncLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMonthlyArchiveLogDuo extends IDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog> {
}
export declare class BaseMonthlyArchiveLogDuo extends SQDIDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog> implements IBaseMonthlyArchiveLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMonthlyTerminalSyncLogDuo extends IDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog> {
}
export declare class BaseMonthlyTerminalSyncLogDuo extends SQDIDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog> implements IBaseMonthlyTerminalSyncLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDuo extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}
export declare class BaseRepositoryDuo extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> implements IBaseRepositoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryArchiveDuo extends IDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive> {
}
export declare class BaseRepositoryArchiveDuo extends SQDIDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive> implements IBaseRepositoryArchiveDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSecurityAnswerDuo extends IDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer> {
}
export declare class BaseSecurityAnswerDuo extends SQDIDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer> implements IBaseSecurityAnswerDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSecurityQuestionDuo extends IDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion> {
}
export declare class BaseSecurityQuestionDuo extends SQDIDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion> implements IBaseSecurityQuestionDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseServerDuo extends IDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer> {
}
export declare class BaseServerDuo extends SQDIDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer> implements IBaseServerDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseServerSyncLogDuo extends IDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog> {
}
export declare class BaseServerSyncLogDuo extends SQDIDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog> implements IBaseServerSyncLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSyncLogDuo extends IDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog> {
}
export declare class BaseSyncLogDuo extends SQDIDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog> implements IBaseSyncLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDuo extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}
export declare class BaseTerminalDuo extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> implements IBaseTerminalDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalRepositoryDuo extends IDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository> {
}
export declare class BaseTerminalRepositoryDuo extends SQDIDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository> implements IBaseTerminalRepositoryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTuningParametersDuo extends IDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters> {
}
export declare class BaseTuningParametersDuo extends SQDIDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters> implements IBaseTuningParametersDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserDuo extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}
export declare class BaseUserDuo extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> implements IBaseUserDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserRepositoryDuo extends IDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository> {
}
export declare class BaseUserRepositoryDuo extends SQDIDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository> implements IBaseUserRepositoryDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map