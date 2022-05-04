/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { Actor } from '../ddl/infrastructure/Actor';
import { Repository } from '../ddl/repository/Repository';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { RepositoryEntity } from '../ddl/repository/RepositoryEntity';
import { RepositoryApplication } from '../ddl/repository/RepositoryApplication';
import { ChildRepoRow } from '../ddl/traditional/ChildRepoRow';
import { ChildRow } from '../ddl/traditional/ChildRow';
import { ImmutableRepoRow } from '../ddl/traditional/ImmutableRepoRow';
import { ImmutableRow } from '../ddl/traditional/ImmutableRow';
import { MutableRepoRow } from '../ddl/traditional/MutableRepoRow';
import { MutableRow } from '../ddl/traditional/MutableRow';
import { ReferenceRow } from '../ddl/traditional/ReferenceRow';
DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'holding-pattern');
    accumulator.add(RecordHistory, 0);
    accumulator.add(Actor, 1);
    accumulator.add(Repository, 2);
    accumulator.add(TransactionHistory, 3);
    accumulator.add(RepositoryTransactionHistory, 4);
    accumulator.add(OperationHistory, 5);
    accumulator.add(RecordHistoryNewValue, 6);
    accumulator.add(RecordHistoryOldValue, 7);
    accumulator.add(RepositoryEntity, undefined);
    accumulator.add(RepositoryApplication, 8);
    accumulator.add(ChildRepoRow, undefined);
    accumulator.add(ChildRow, undefined);
    accumulator.add(ImmutableRepoRow, undefined);
    accumulator.add(ImmutableRow, undefined);
    accumulator.add(MutableRepoRow, undefined);
    accumulator.add(MutableRow, undefined);
    accumulator.add(ReferenceRow, undefined);
});
//# sourceMappingURL=entityMappings.js.map