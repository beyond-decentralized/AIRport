import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
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
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAgtRepositoryTransactionBlockDao extends IDao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock> {
}
export declare class BaseAgtRepositoryTransactionBlockDao extends SQDIDao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock> implements IBaseAgtRepositoryTransactionBlockDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseAgtSharingMessageDao extends IDao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage> {
}
export declare class BaseAgtSharingMessageDao extends SQDIDao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage> implements IBaseAgtSharingMessageDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseArchiveDao extends IDao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive> {
}
export declare class BaseArchiveDao extends SQDIDao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive> implements IBaseArchiveDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDailyArchiveLogDao extends IDao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog> {
}
export declare class BaseDailyArchiveLogDao extends SQDIDao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog> implements IBaseDailyArchiveLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDailyTerminalSyncLogDao extends IDao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog> {
}
export declare class BaseDailyTerminalSyncLogDao extends SQDIDao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog> implements IBaseDailyTerminalSyncLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMonthlyArchiveLogDao extends IDao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog> {
}
export declare class BaseMonthlyArchiveLogDao extends SQDIDao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog> implements IBaseMonthlyArchiveLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMonthlyTerminalSyncLogDao extends IDao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog> {
}
export declare class BaseMonthlyTerminalSyncLogDao extends SQDIDao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog> implements IBaseMonthlyTerminalSyncLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryDao extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}
export declare class BaseRepositoryDao extends SQDIDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> implements IBaseRepositoryDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseRepositoryArchiveDao extends IDao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive> {
}
export declare class BaseRepositoryArchiveDao extends SQDIDao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive> implements IBaseRepositoryArchiveDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSecurityAnswerDao extends IDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer> {
}
export declare class BaseSecurityAnswerDao extends SQDIDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer> implements IBaseSecurityAnswerDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSecurityQuestionDao extends IDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion> {
}
export declare class BaseSecurityQuestionDao extends SQDIDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion> implements IBaseSecurityQuestionDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseServerDao extends IDao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer> {
}
export declare class BaseServerDao extends SQDIDao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer> implements IBaseServerDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseServerSyncLogDao extends IDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog> {
}
export declare class BaseServerSyncLogDao extends SQDIDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog> implements IBaseServerSyncLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSyncLogDao extends IDao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog> {
}
export declare class BaseSyncLogDao extends SQDIDao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog> implements IBaseSyncLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDao extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}
export declare class BaseTerminalDao extends SQDIDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> implements IBaseTerminalDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalRepositoryDao extends IDao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository> {
}
export declare class BaseTerminalRepositoryDao extends SQDIDao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository> implements IBaseTerminalRepositoryDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTuningParametersDao extends IDao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters> {
}
export declare class BaseTuningParametersDao extends SQDIDao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters> implements IBaseTuningParametersDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserDao extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}
export declare class BaseUserDao extends SQDIDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> implements IBaseUserDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserRepositoryDao extends IDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository> {
}
export declare class BaseUserRepositoryDao extends SQDIDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository> implements IBaseUserRepositoryDao {
    static diSet(): boolean;
    constructor();
}
