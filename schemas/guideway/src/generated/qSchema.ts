import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {diSet as dS}          from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
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

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

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
	__constructors__,
  domain: 'github.com',
  name: '@airport/guideway'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

DI.get((
	airportDatabase
) => {
	airportDatabase.QM[getSchemaName(Q_SCHEMA)] = Q
}, AIR_DB)
