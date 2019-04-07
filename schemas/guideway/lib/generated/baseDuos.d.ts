import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock } from './synchronization/qagtrepositorytransactionblock';
import { IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage } from './synchronization/qagtsharingmessage';
import { IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive } from './repository/qarchive';
import { IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog } from './archive/qdailyarchivelog';
import { IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog } from './archive/qdailyterminalsynclog';
import { IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog } from './archive/qmonthlyarchivelog';
import { IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog } from './archive/qmonthlyterminalsynclog';
import { IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository } from './repository/qrepository';
import { IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive } from './repository/qrepositoryarchive';
import { ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer } from './user/security/qsecurityanswer';
import { ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion } from './user/security/qsecurityquestion';
import { IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer } from './server/qserver';
import { IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog } from './server/qserversynclog';
import { ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog } from './synchronization/qsynclog';
import { ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal } from './terminal/qterminal';
import { ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository } from './terminal/qterminalrepository';
import { ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters } from './tuning/qtuningparameters';
import { IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser } from './user/quser';
import { IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository } from './user/quserrepository';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseAgtRepositoryTransactionBlockDuo extends IDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock> {
}
export declare class BaseAgtRepositoryTransactionBlockDuo extends SQDIDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock> implements IBaseAgtRepositoryTransactionBlockDuo {
    constructor();
}
export interface IBaseAgtSharingMessageDuo extends IDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage> {
}
export declare class BaseAgtSharingMessageDuo extends SQDIDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage> implements IBaseAgtSharingMessageDuo {
    constructor();
}
export interface IBaseArchiveDuo extends IDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive> {
}
export declare class BaseArchiveDuo extends SQDIDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive> implements IBaseArchiveDuo {
    constructor();
}
export interface IBaseDailyArchiveLogDuo extends IDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog> {
}
export declare class BaseDailyArchiveLogDuo extends SQDIDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog> implements IBaseDailyArchiveLogDuo {
    constructor();
}
export interface IBaseDailyTerminalSyncLogDuo extends IDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog> {
}
export declare class BaseDailyTerminalSyncLogDuo extends SQDIDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog> implements IBaseDailyTerminalSyncLogDuo {
    constructor();
}
export interface IBaseMonthlyArchiveLogDuo extends IDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog> {
}
export declare class BaseMonthlyArchiveLogDuo extends SQDIDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog> implements IBaseMonthlyArchiveLogDuo {
    constructor();
}
export interface IBaseMonthlyTerminalSyncLogDuo extends IDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog> {
}
export declare class BaseMonthlyTerminalSyncLogDuo extends SQDIDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog> implements IBaseMonthlyTerminalSyncLogDuo {
    constructor();
}
export interface IBaseRepositoryDuo extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}
export declare class BaseRepositoryDuo extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> implements IBaseRepositoryDuo {
    constructor();
}
export interface IBaseRepositoryArchiveDuo extends IDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive> {
}
export declare class BaseRepositoryArchiveDuo extends SQDIDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive> implements IBaseRepositoryArchiveDuo {
    constructor();
}
export interface IBaseSecurityAnswerDuo extends IDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer> {
}
export declare class BaseSecurityAnswerDuo extends SQDIDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer> implements IBaseSecurityAnswerDuo {
    constructor();
}
export interface IBaseSecurityQuestionDuo extends IDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion> {
}
export declare class BaseSecurityQuestionDuo extends SQDIDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion> implements IBaseSecurityQuestionDuo {
    constructor();
}
export interface IBaseServerDuo extends IDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer> {
}
export declare class BaseServerDuo extends SQDIDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer> implements IBaseServerDuo {
    constructor();
}
export interface IBaseServerSyncLogDuo extends IDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog> {
}
export declare class BaseServerSyncLogDuo extends SQDIDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog> implements IBaseServerSyncLogDuo {
    constructor();
}
export interface IBaseSyncLogDuo extends IDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog> {
}
export declare class BaseSyncLogDuo extends SQDIDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog> implements IBaseSyncLogDuo {
    constructor();
}
export interface IBaseTerminalDuo extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}
export declare class BaseTerminalDuo extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> implements IBaseTerminalDuo {
    constructor();
}
export interface IBaseTerminalRepositoryDuo extends IDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository> {
}
export declare class BaseTerminalRepositoryDuo extends SQDIDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository> implements IBaseTerminalRepositoryDuo {
    constructor();
}
export interface IBaseTuningParametersDuo extends IDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters> {
}
export declare class BaseTuningParametersDuo extends SQDIDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters> implements IBaseTuningParametersDuo {
    constructor();
}
export interface IBaseUserDuo extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}
export declare class BaseUserDuo extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> implements IBaseUserDuo {
    constructor();
}
export interface IBaseUserRepositoryDuo extends IDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository> {
}
export declare class BaseUserRepositoryDuo extends SQDIDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository> implements IBaseUserRepositoryDuo {
    constructor();
}
