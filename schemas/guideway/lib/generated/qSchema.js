import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { AgtRepositoryTransactionBlock } from '../ddl/synchronization/AgtRepositoryTransactionBlock';
import { AgtSharingMessage } from '../ddl/synchronization/AgtSharingMessage';
import { Archive } from '../ddl/repository/Archive';
import { DailyArchiveLog } from '../ddl/archive/DailyArchiveLog';
import { DailyTerminalSyncLog } from '../ddl/archive/DailyTerminalSyncLog';
import { MonthlyArchiveLog } from '../ddl/archive/MonthlyArchiveLog';
import { MonthlyTerminalSyncLog } from '../ddl/archive/MonthlyTerminalSyncLog';
import { Repository } from '../ddl/repository/Repository';
import { RepositoryArchive } from '../ddl/repository/RepositoryArchive';
import { SecurityAnswer } from '../ddl/user/security/SecurityAnswer';
import { SecurityQuestion } from '../ddl/user/security/SecurityQuestion';
import { Server } from '../ddl/server/Server';
import { ServerSyncLog } from '../ddl/server/ServerSyncLog';
import { SyncLog } from '../ddl/synchronization/SyncLog';
import { Terminal } from '../ddl/terminal/Terminal';
import { TerminalRepository } from '../ddl/terminal/TerminalRepository';
import { TuningParameters } from '../ddl/tuning/TuningParameters';
import { User } from '../ddl/user/User';
import { UserRepository } from '../ddl/user/UserRepository';
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
export const Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/guideway'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().get(AIR_DB).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map