import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
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
export const Q_SCHEMA = {
    __constructors__,
    domain: 'air',
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