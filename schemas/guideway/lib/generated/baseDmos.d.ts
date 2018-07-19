import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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
export interface IBaseAgtRepositoryTransactionBlockDmo extends IDmo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock> {
}
export declare class BaseAgtRepositoryTransactionBlockDmo extends Dmo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock> implements IBaseAgtRepositoryTransactionBlockDmo {
    constructor();
}
export interface IBaseAgtSharingMessageDmo extends IDmo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage> {
}
export declare class BaseAgtSharingMessageDmo extends Dmo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage> implements IBaseAgtSharingMessageDmo {
    constructor();
}
export interface IBaseArchiveDmo extends IDmo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive> {
}
export declare class BaseArchiveDmo extends Dmo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive> implements IBaseArchiveDmo {
    constructor();
}
export interface IBaseDailyArchiveLogDmo extends IDmo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog> {
}
export declare class BaseDailyArchiveLogDmo extends Dmo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog> implements IBaseDailyArchiveLogDmo {
    constructor();
}
export interface IBaseDailyTerminalSyncLogDmo extends IDmo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog> {
}
export declare class BaseDailyTerminalSyncLogDmo extends Dmo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog> implements IBaseDailyTerminalSyncLogDmo {
    constructor();
}
export interface IBaseMonthlyArchiveLogDmo extends IDmo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog> {
}
export declare class BaseMonthlyArchiveLogDmo extends Dmo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog> implements IBaseMonthlyArchiveLogDmo {
    constructor();
}
export interface IBaseMonthlyTerminalSyncLogDmo extends IDmo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog> {
}
export declare class BaseMonthlyTerminalSyncLogDmo extends Dmo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog> implements IBaseMonthlyTerminalSyncLogDmo {
    constructor();
}
export interface IBaseRepositoryDmo extends IDmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}
export declare class BaseRepositoryDmo extends Dmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> implements IBaseRepositoryDmo {
    constructor();
}
export interface IBaseRepositoryArchiveDmo extends IDmo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive> {
}
export declare class BaseRepositoryArchiveDmo extends Dmo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive> implements IBaseRepositoryArchiveDmo {
    constructor();
}
export interface IBaseSecurityAnswerDmo extends IDmo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer> {
}
export declare class BaseSecurityAnswerDmo extends Dmo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer> implements IBaseSecurityAnswerDmo {
    constructor();
}
export interface IBaseSecurityQuestionDmo extends IDmo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion> {
}
export declare class BaseSecurityQuestionDmo extends Dmo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion> implements IBaseSecurityQuestionDmo {
    constructor();
}
export interface IBaseServerDmo extends IDmo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer> {
}
export declare class BaseServerDmo extends Dmo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer> implements IBaseServerDmo {
    constructor();
}
export interface IBaseServerSyncLogDmo extends IDmo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog> {
}
export declare class BaseServerSyncLogDmo extends Dmo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog> implements IBaseServerSyncLogDmo {
    constructor();
}
export interface IBaseSyncLogDmo extends IDmo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog> {
}
export declare class BaseSyncLogDmo extends Dmo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog> implements IBaseSyncLogDmo {
    constructor();
}
export interface IBaseTerminalDmo extends IDmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}
export declare class BaseTerminalDmo extends Dmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> implements IBaseTerminalDmo {
    constructor();
}
export interface IBaseTerminalRepositoryDmo extends IDmo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository> {
}
export declare class BaseTerminalRepositoryDmo extends Dmo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository> implements IBaseTerminalRepositoryDmo {
    constructor();
}
export interface IBaseTuningParametersDmo extends IDmo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters> {
}
export declare class BaseTuningParametersDmo extends Dmo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters> implements IBaseTuningParametersDmo {
    constructor();
}
export interface IBaseUserDmo extends IDmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}
export declare class BaseUserDmo extends Dmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> implements IBaseUserDmo {
    constructor();
}
export interface IBaseUserRepositoryDmo extends IDmo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository> {
}
export declare class BaseUserRepositoryDmo extends Dmo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository> implements IBaseUserRepositoryDmo {
    constructor();
}
