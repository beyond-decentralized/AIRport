import { DbSchema, QSchema as AirportQSchema } from '@airport/air-control';
import { AgtRepositoryTransactionBlock } from '../ddl/synchronization/AgtRepositoryTransactionBlock';
import { QAgtRepositoryTransactionBlock } from './synchronization/qagtrepositorytransactionblock';
import { AgtSharingMessage } from '../ddl/synchronization/AgtSharingMessage';
import { QAgtSharingMessage } from './synchronization/qagtsharingmessage';
import { Archive } from '../ddl/repository/Archive';
import { QArchive } from './repository/qarchive';
import { DailyArchiveLog } from '../ddl/archive/DailyArchiveLog';
import { QDailyArchiveLog } from './archive/qdailyarchivelog';
import { DailyTerminalSyncLog } from '../ddl/archive/DailyTerminalSyncLog';
import { QDailyTerminalSyncLog } from './archive/qdailyterminalsynclog';
import { MonthlyArchiveLog } from '../ddl/archive/MonthlyArchiveLog';
import { QMonthlyArchiveLog } from './archive/qmonthlyarchivelog';
import { MonthlyTerminalSyncLog } from '../ddl/archive/MonthlyTerminalSyncLog';
import { QMonthlyTerminalSyncLog } from './archive/qmonthlyterminalsynclog';
import { Repository } from '../ddl/repository/Repository';
import { QRepository } from './repository/qrepository';
import { RepositoryArchive } from '../ddl/repository/RepositoryArchive';
import { QRepositoryArchive } from './repository/qrepositoryarchive';
import { SecurityAnswer } from '../ddl/user/security/SecurityAnswer';
import { QSecurityAnswer } from './user/security/qsecurityanswer';
import { SecurityQuestion } from '../ddl/user/security/SecurityQuestion';
import { QSecurityQuestion } from './user/security/qsecurityquestion';
import { Server } from '../ddl/server/Server';
import { QServer } from './server/qserver';
import { ServerSyncLog } from '../ddl/server/ServerSyncLog';
import { QServerSyncLog } from './server/qserversynclog';
import { SyncLog } from '../ddl/synchronization/SyncLog';
import { QSyncLog } from './synchronization/qsynclog';
import { Terminal } from '../ddl/terminal/Terminal';
import { QTerminal } from './terminal/qterminal';
import { TerminalRepository } from '../ddl/terminal/TerminalRepository';
import { QTerminalRepository } from './terminal/qterminalrepository';
import { TuningParameters } from '../ddl/tuning/TuningParameters';
import { QTuningParameters } from './tuning/qtuningparameters';
import { User } from '../ddl/user/User';
import { QUser } from './user/quser';
import { UserRepository } from '../ddl/user/UserRepository';
import { QUserRepository } from './user/quserrepository';

import {
	IBaseAgtRepositoryTransactionBlockDmo,
	IBaseAgtSharingMessageDmo,
	IBaseArchiveDmo,
	IBaseDailyArchiveLogDmo,
	IBaseDailyTerminalSyncLogDmo,
	IBaseMonthlyArchiveLogDmo,
	IBaseMonthlyTerminalSyncLogDmo,
	IBaseRepositoryDmo,
	IBaseRepositoryArchiveDmo,
	IBaseSecurityAnswerDmo,
	IBaseSecurityQuestionDmo,
	IBaseServerDmo,
	IBaseServerSyncLogDmo,
	IBaseSyncLogDmo,
	IBaseTerminalDmo,
	IBaseTerminalRepositoryDmo,
	IBaseTuningParametersDmo,
	IBaseUserDmo,
	IBaseUserRepositoryDmo
} from './baseDmos';

import {
	IBaseAgtRepositoryTransactionBlockDao,
	IBaseAgtSharingMessageDao,
	IBaseArchiveDao,
	IBaseDailyArchiveLogDao,
	IBaseDailyTerminalSyncLogDao,
	IBaseMonthlyArchiveLogDao,
	IBaseMonthlyTerminalSyncLogDao,
	IBaseRepositoryDao,
	IBaseRepositoryArchiveDao,
	IBaseSecurityAnswerDao,
	IBaseSecurityQuestionDao,
	IBaseServerDao,
	IBaseServerSyncLogDao,
	IBaseSyncLogDao,
	IBaseTerminalDao,
	IBaseTerminalRepositoryDao,
	IBaseTuningParametersDao,
	IBaseUserDao,
	IBaseUserRepositoryDao
} from './baseDaos';

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
	}

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
	}
	
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

const __constructors__ = {
	AgtRepositoryTransactionBlock: AgtRepositoryTransactionBlock,
	AgtSharingMessage: AgtSharingMessage,
	Archive: Archive,
	DailyArchiveLog: DailyArchiveLog,
	DailyTerminalSyncLog: DailyTerminalSyncLog,
	MonthlyArchiveLog: MonthlyArchiveLog,
	MonthlyTerminalSyncLog: MonthlyTerminalSyncLog,
	Repository: Repository,
	RepositoryArchive: RepositoryArchive,
	SecurityAnswer: SecurityAnswer,
	SecurityQuestion: SecurityQuestion,
	Server: Server,
	ServerSyncLog: ServerSyncLog,
	SyncLog: SyncLog,
	Terminal: Terminal,
	TerminalRepository: TerminalRepository,
	TuningParameters: TuningParameters,
	User: User,
	UserRepository: UserRepository
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
