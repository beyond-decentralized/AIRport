import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getApplicationName } from '@airport/ground-control';
import { Actor, ChildRepoRow, ChildRow, ImmutableRepoRow, ImmutableRow, MutableRepoRow, MutableRow, OperationHistory, RecordHistory, RecordHistoryNewValue, RecordHistoryOldValue, ReferenceRow, Repository, RepositoryEntity, RepositoryApplication, RepositoryTransactionHistory, Stageable, TransactionHistory } from '../ddl/ddl';
const __constructors__ = {
    Actor: Actor,
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
    Repository: Repository,
    RepositoryEntity: RepositoryEntity,
    RepositoryApplication: RepositoryApplication,
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
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getApplicationName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qApplication.js.map