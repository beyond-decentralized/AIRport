import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { Actor, ActorApplication, Application, ChildRepoRow, ChildRow, ImmutableRepoRow, ImmutableRow, MutableRepoRow, MutableRow, OperationHistory, RecordHistory, RecordHistoryNewValue, RecordHistoryOldValue, ReferenceRow, RepoTransHistoryChangedRepositoryActor, Repository, RepositoryActor, RepositoryApplication, RepositoryEntity, RepositorySchema, RepositoryTransactionHistory, Stageable, TransactionHistory } from '../ddl/ddl';
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
    domain: 'air',
    name: '@airport/holding-pattern'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().eventuallyGet(AIR_DB).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map