import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QAgtRepositoryTransactionBlock } from './synchronization/qagtrepositorytransactionblock';
import { QAgtSharingMessage } from './synchronization/qagtsharingmessage';
import { QArchive } from './repository/qarchive';
import { QDailyArchiveLog } from './archive/qdailyarchivelog';
import { QDailyTerminalSyncLog } from './archive/qdailyterminalsynclog';
import { QMonthlyArchiveLog } from './archive/qmonthlyarchivelog';
import { QMonthlyTerminalSyncLog } from './archive/qmonthlyterminalsynclog';
import { QRepository } from './repository/qrepository';
import { QRepositoryArchive } from './repository/qrepositoryarchive';
import { QSecurityAnswer } from './user/security/qsecurityanswer';
import { QSecurityQuestion } from './user/security/qsecurityquestion';
import { QServer } from './server/qserver';
import { QServerSyncLog } from './server/qserversynclog';
import { QSyncLog } from './synchronization/qsynclog';
import { QTerminal } from './terminal/qterminal';
import { QTerminalRepository } from './terminal/qterminalrepository';
import { QTuningParameters } from './tuning/qtuningparameters';
import { QUser } from './user/quser';
import { QUserRepository } from './user/quserrepository';
import { IBaseAgtRepositoryTransactionBlockDmo, IBaseAgtSharingMessageDmo, IBaseArchiveDmo, IBaseDailyArchiveLogDmo, IBaseDailyTerminalSyncLogDmo, IBaseMonthlyArchiveLogDmo, IBaseMonthlyTerminalSyncLogDmo, IBaseRepositoryDmo, IBaseRepositoryArchiveDmo, IBaseSecurityAnswerDmo, IBaseSecurityQuestionDmo, IBaseServerDmo, IBaseServerSyncLogDmo, IBaseSyncLogDmo, IBaseTerminalDmo, IBaseTerminalRepositoryDmo, IBaseTuningParametersDmo, IBaseUserDmo, IBaseUserRepositoryDmo } from './baseDmos';
import { IBaseAgtRepositoryTransactionBlockDao, IBaseAgtSharingMessageDao, IBaseArchiveDao, IBaseDailyArchiveLogDao, IBaseDailyTerminalSyncLogDao, IBaseMonthlyArchiveLogDao, IBaseMonthlyTerminalSyncLogDao, IBaseRepositoryDao, IBaseRepositoryArchiveDao, IBaseSecurityAnswerDao, IBaseSecurityQuestionDao, IBaseServerDao, IBaseServerSyncLogDao, IBaseSyncLogDao, IBaseTerminalDao, IBaseTerminalRepositoryDao, IBaseTuningParametersDao, IBaseUserDao, IBaseUserRepositoryDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        AgtRepositoryTransactionBlock: IBaseAgtRepositoryTransactionBlockDmo;
        AgtSharingMessage: IBaseAgtSharingMessageDmo;
        Archive: IBaseArchiveDmo;
        DailyArchiveLog: IBaseDailyArchiveLogDmo;
        DailyTerminalSyncLog: IBaseDailyTerminalSyncLogDmo;
        MonthlyArchiveLog: IBaseMonthlyArchiveLogDmo;
        MonthlyTerminalSyncLog: IBaseMonthlyTerminalSyncLogDmo;
        Repository: IBaseRepositoryDmo;
        RepositoryArchive: IBaseRepositoryArchiveDmo;
        SecurityAnswer: IBaseSecurityAnswerDmo;
        SecurityQuestion: IBaseSecurityQuestionDmo;
        Server: IBaseServerDmo;
        ServerSyncLog: IBaseServerSyncLogDmo;
        SyncLog: IBaseSyncLogDmo;
        Terminal: IBaseTerminalDmo;
        TerminalRepository: IBaseTerminalRepositoryDmo;
        TuningParameters: IBaseTuningParametersDmo;
        User: IBaseUserDmo;
        UserRepository: IBaseUserRepositoryDmo;
    };
    dao: {
        AgtRepositoryTransactionBlock: IBaseAgtRepositoryTransactionBlockDao;
        AgtSharingMessage: IBaseAgtSharingMessageDao;
        Archive: IBaseArchiveDao;
        DailyArchiveLog: IBaseDailyArchiveLogDao;
        DailyTerminalSyncLog: IBaseDailyTerminalSyncLogDao;
        MonthlyArchiveLog: IBaseMonthlyArchiveLogDao;
        MonthlyTerminalSyncLog: IBaseMonthlyTerminalSyncLogDao;
        Repository: IBaseRepositoryDao;
        RepositoryArchive: IBaseRepositoryArchiveDao;
        SecurityAnswer: IBaseSecurityAnswerDao;
        SecurityQuestion: IBaseSecurityQuestionDao;
        Server: IBaseServerDao;
        ServerSyncLog: IBaseServerSyncLogDao;
        SyncLog: IBaseSyncLogDao;
        Terminal: IBaseTerminalDao;
        TerminalRepository: IBaseTerminalRepositoryDao;
        TuningParameters: IBaseTuningParametersDao;
        User: IBaseUserDao;
        UserRepository: IBaseUserRepositoryDao;
    };
    AgtRepositoryTransactionBlock: QAgtRepositoryTransactionBlock;
    AgtSharingMessage: QAgtSharingMessage;
    Archive: QArchive;
    DailyArchiveLog: QDailyArchiveLog;
    DailyTerminalSyncLog: QDailyTerminalSyncLog;
    MonthlyArchiveLog: QMonthlyArchiveLog;
    MonthlyTerminalSyncLog: QMonthlyTerminalSyncLog;
    Repository: QRepository;
    RepositoryArchive: QRepositoryArchive;
    SecurityAnswer: QSecurityAnswer;
    SecurityQuestion: QSecurityQuestion;
    Server: QServer;
    ServerSyncLog: QServerSyncLog;
    SyncLog: QSyncLog;
    Terminal: QTerminal;
    TerminalRepository: QTerminalRepository;
    TuningParameters: QTuningParameters;
    User: QUser;
    UserRepository: QUserRepository;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
