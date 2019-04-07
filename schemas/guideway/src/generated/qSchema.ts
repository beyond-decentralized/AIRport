import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { AgtRepositoryTransactionBlock } from '../ddl/synchronization/agtrepositorytransactionblock';
import { QAgtRepositoryTransactionBlock } from './synchronization/qagtrepositorytransactionblock';
import { AgtSharingMessage } from '../ddl/synchronization/agtsharingmessage';
import { QAgtSharingMessage } from './synchronization/qagtsharingmessage';
import { Archive } from '../ddl/repository/archive';
import { QArchive } from './repository/qarchive';
import { DailyArchiveLog } from '../ddl/archive/dailyarchivelog';
import { QDailyArchiveLog } from './archive/qdailyarchivelog';
import { DailyTerminalSyncLog } from '../ddl/archive/dailyterminalsynclog';
import { QDailyTerminalSyncLog } from './archive/qdailyterminalsynclog';
import { MonthlyArchiveLog } from '../ddl/archive/monthlyarchivelog';
import { QMonthlyArchiveLog } from './archive/qmonthlyarchivelog';
import { MonthlyTerminalSyncLog } from '../ddl/archive/monthlyterminalsynclog';
import { QMonthlyTerminalSyncLog } from './archive/qmonthlyterminalsynclog';
import { Repository } from '../ddl/repository/repository';
import { QRepository } from './repository/qrepository';
import { RepositoryArchive } from '../ddl/repository/repositoryarchive';
import { QRepositoryArchive } from './repository/qrepositoryarchive';
import { SecurityAnswer } from '../ddl/user/security/securityanswer';
import { QSecurityAnswer } from './user/security/qsecurityanswer';
import { SecurityQuestion } from '../ddl/user/security/securityquestion';
import { QSecurityQuestion } from './user/security/qsecurityquestion';
import { Server } from '../ddl/server/server';
import { QServer } from './server/qserver';
import { ServerSyncLog } from '../ddl/server/serversynclog';
import { QServerSyncLog } from './server/qserversynclog';
import { SyncLog } from '../ddl/synchronization/synclog';
import { QSyncLog } from './synchronization/qsynclog';
import { Terminal } from '../ddl/terminal/terminal';
import { QTerminal } from './terminal/qterminal';
import { TerminalRepository } from '../ddl/terminal/terminalrepository';
import { QTerminalRepository } from './terminal/qterminalrepository';
import { TuningParameters } from '../ddl/tuning/tuningparameters';
import { QTuningParameters } from './tuning/qtuningparameters';
import { User } from '../ddl/user/user';
import { QUser } from './user/quser';
import { UserRepository } from '../ddl/user/userrepository';
import { QUserRepository } from './user/quserrepository';

import {
	IBaseAgtRepositoryTransactionBlockDuo,
	IBaseAgtSharingMessageDuo,
	IBaseArchiveDuo,
	IBaseDailyArchiveLogDuo,
	IBaseDailyTerminalSyncLogDuo,
	IBaseMonthlyArchiveLogDuo,
	IBaseMonthlyTerminalSyncLogDuo,
	IBaseRepositoryDuo,
	IBaseRepositoryArchiveDuo,
	IBaseSecurityAnswerDuo,
	IBaseSecurityQuestionDuo,
	IBaseServerDuo,
	IBaseServerSyncLogDuo,
	IBaseSyncLogDuo,
	IBaseTerminalDuo,
	IBaseTerminalRepositoryDuo,
	IBaseTuningParametersDuo,
	IBaseUserDuo,
	IBaseUserRepositoryDuo
} from './baseDuos';

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

	duo: {
		AgtRepositoryTransactionBlock: IBaseAgtRepositoryTransactionBlockDuo;
		AgtSharingMessage: IBaseAgtSharingMessageDuo;
		Archive: IBaseArchiveDuo;
		DailyArchiveLog: IBaseDailyArchiveLogDuo;
		DailyTerminalSyncLog: IBaseDailyTerminalSyncLogDuo;
		MonthlyArchiveLog: IBaseMonthlyArchiveLogDuo;
		MonthlyTerminalSyncLog: IBaseMonthlyTerminalSyncLogDuo;
		Repository: IBaseRepositoryDuo;
		RepositoryArchive: IBaseRepositoryArchiveDuo;
		SecurityAnswer: IBaseSecurityAnswerDuo;
		SecurityQuestion: IBaseSecurityQuestionDuo;
		Server: IBaseServerDuo;
		ServerSyncLog: IBaseServerSyncLogDuo;
		SyncLog: IBaseSyncLogDuo;
		Terminal: IBaseTerminalDuo;
		TerminalRepository: IBaseTerminalRepositoryDuo;
		TuningParameters: IBaseTuningParametersDuo;
		User: IBaseUserDuo;
		UserRepository: IBaseUserRepositoryDuo;
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
