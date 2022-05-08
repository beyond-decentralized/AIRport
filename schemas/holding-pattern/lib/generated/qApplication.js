import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Actor, ChildRepoRow, ChildRow, ImmutableRepoRow, ImmutableRow, MutableRepoRow, MutableRow, OperationHistory, RecordHistory, RecordHistoryNewValue, RecordHistoryOldValue, ReferenceRow, Repository, RepositoryApplication, RepositoryEntity, RepositoryTransactionHistory, TransactionHistory } from '../ddl/ddl';
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
    RepositoryApplication: RepositoryApplication,
    RepositoryEntity: RepositoryEntity,
    RepositoryTransactionHistory: RepositoryTransactionHistory,
    TransactionHistory: TransactionHistory
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/holding-pattern'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((airportDatabase) => {
    airportDatabase.setQApplication(Q_APPLICATION);
});
//# sourceMappingURL=qApplication.js.map