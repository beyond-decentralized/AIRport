import { airApi } from '@airport/aviation-communication';
import { Actor, AirEntity, ChildRepoRow, ChildRow, ImmutableRepoRow, ImmutableRow, MutableRepoRow, MutableRow, OperationHistory, RecordHistory, RecordHistoryNewValue, RecordHistoryOldValue, ReferenceRow, Repository, RepositoryApplication, RepositoryClient, RepositoryDatabase, RepositoryTerminal, RepositoryTransactionHistory, RepositoryType, TransactionHistory } from '../ddl/ddl';
const __constructors__ = {
    Actor: Actor,
    AirEntity: AirEntity,
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
    RepositoryClient: RepositoryClient,
    RepositoryDatabase: RepositoryDatabase,
    RepositoryTerminal: RepositoryTerminal,
    RepositoryTransactionHistory: RepositoryTransactionHistory,
    RepositoryType: RepositoryType,
    TransactionHistory: TransactionHistory
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/holding-pattern'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return airApi.dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return airApi.ddS(Q.__dbApplication__, dbEntityId);
}
airApi.setQApplication(Q_APPLICATION);
//# sourceMappingURL=qApplication.js.map