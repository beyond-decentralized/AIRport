import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { Actor } from '../ddl/infrastructure/Actor';
import { ActorApplication } from '../ddl/infrastructure/ActorApplication';
import { Application } from '../ddl/infrastructure/Application';
import { ChildRepoRow } from '../ddl/traditional/ChildRepoRow';
import { ChildRow } from '../ddl/traditional/ChildRow';
import { ImmutableRepoRow } from '../ddl/traditional/ImmutableRepoRow';
import { ImmutableRow } from '../ddl/traditional/ImmutableRow';
import { MutableRepoRow } from '../ddl/traditional/MutableRepoRow';
import { MutableRow } from '../ddl/traditional/MutableRow';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { ReferenceRow } from '../ddl/traditional/ReferenceRow';
import { RepoTransHistoryChangedRepositoryActor } from '../ddl/history/RepoTransHistoryChangedRepositoryActor';
import { Repository } from '../ddl/repository/Repository';
import { RepositoryActor } from '../ddl/repository/RepositoryActor';
import { RepositoryApplication } from '../ddl/repository/RepositoryApplication';
import { RepositoryEntity } from '../ddl/repository/RepositoryEntity';
import { RepositorySchema } from '../ddl/repository/RepositorySchema';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { Stageable } from '../ddl/infrastructure/Stageable';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
const __constructors__ = {
    Actor: Actor,
    ActorApplication: ActorApplication,
    Application: Application,
    ChildRepoRow: ChildRepoRow,
    ChildRow: ChildRow,
    ImmutableRepoRow: ImmutableRepoRow,
    ImmutableRow: ImmutableRow,
    MutableRepoRow: MutableRepoRow,
    MutableRow: MutableRow,
    OperationHistory: OperationHistory,
    RecordHistory: RecordHistory,
    RecordHistoryNewValue: RecordHistoryNewValue,
    RecordHistoryOldValue: RecordHistoryOldValue,
    ReferenceRow: ReferenceRow,
    RepoTransHistoryChangedRepositoryActor: RepoTransHistoryChangedRepositoryActor,
    Repository: Repository,
    RepositoryActor: RepositoryActor,
    RepositoryApplication: RepositoryApplication,
    RepositoryEntity: RepositoryEntity,
    RepositorySchema: RepositorySchema,
    RepositoryTransactionHistory: RepositoryTransactionHistory,
    Stageable: Stageable,
    TransactionHistory: TransactionHistory
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/holding-pattern'
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