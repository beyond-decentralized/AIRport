import {
	AIRPORT_DATABASE,
	QApplication as AirportQApplication
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbApplication,
	EntityId,
	getFullApplicationName
}                      from '@airport/ground-control';
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
import {
  AgtRepositoryTransactionBlock,
  AgtSharingMessage,
  Archive,
  DailyArchiveLog,
  DailyTerminalSyncLog,
  MonthlyArchiveLog,
  MonthlyTerminalSyncLog,
  Repository,
  RepositoryArchive,
  SecurityAnswer,
  SecurityQuestion,
  Server,
  ServerSyncLog,
  SyncLog,
  Terminal,
  TerminalRepository,
  TuningParameters,
  User,
  UserRepository
} from '../ddl/ddl';

export interface LocalQApplication extends AirportQApplication {

  db: DbApplication;

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

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/guideway'
};
export const Q: LocalQApplication = Q_APPLICATION

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbApplication__, dbEntityId)
}

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q
})
