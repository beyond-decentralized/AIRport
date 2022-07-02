/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Actor } from '../ddl/infrastructure/Actor';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { RepositoryType } from '../ddl/repository/RepositoryType';
import { Repository } from '../ddl/repository/Repository';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { AirEntity } from '../ddl/repository/AirEntity';
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
  accumulator.add(Actor, 0);
  accumulator.add(RecordHistoryNewValue, 1);
  accumulator.add(RecordHistoryOldValue, 2);
  accumulator.add(RecordHistory, 3);
  accumulator.add(RepositoryType, 4);
  accumulator.add(Repository, 5);
  accumulator.add(TransactionHistory, 6);
  accumulator.add(RepositoryTransactionHistory, 7);
  accumulator.add(OperationHistory, 8);
  accumulator.add(AirEntity, undefined);
  accumulator.add(RepositoryApplication, 9);
  accumulator.add(ChildRepoRow, undefined);
  accumulator.add(ChildRow, undefined);
  accumulator.add(ImmutableRepoRow, undefined);
  accumulator.add(ImmutableRow, undefined);
  accumulator.add(MutableRepoRow, undefined);
  accumulator.add(MutableRow, undefined);
  accumulator.add(ReferenceRow, undefined);
});
