import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getFullApplicationName } from '@airport/ground-control';
import { AgtRepositoryTransactionBlock, AgtSharingMessage, Archive, DailyArchiveLog, DailyTerminalSyncLog, MonthlyArchiveLog, MonthlyTerminalSyncLog, Repository, RepositoryArchive, SecurityAnswer, SecurityQuestion, Server, ServerSyncLog, SyncLog, Terminal, TerminalRepository, TuningParameters, User, UserRepository } from '../ddl/ddl';
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
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/guideway'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q;
});
//# sourceMappingURL=qApplication.js.map