/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { Actor } from '../ddl/infrastructure/Actor';
import { Repository } from '../ddl/repository/Repository';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { RepositoryEntity } from '../ddl/repository/RepositoryEntity';
import { RepositoryApplication } from '../ddl/repository/RepositoryApplication';
import { ChildRepoRow } from '../ddl/traditional/ChildRepoRow';
import { ChildRow } from '../ddl/traditional/ChildRow';
import { ImmutableRepoRow } from '../ddl/traditional/ImmutableRepoRow';
import { ImmutableRow } from '../ddl/traditional/ImmutableRow';
import { MutableRepoRow } from '../ddl/traditional/MutableRepoRow';
import { MutableRow } from '../ddl/traditional/MutableRow';
import { ReferenceRow } from '../ddl/traditional/ReferenceRow';

DI.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'holding-pattern');
  accumulator.add(RecordHistory, 0);
  accumulator.add(Actor, 1);
  accumulator.add(Repository, 2);
  accumulator.add(RecordHistoryNewValue, 3);
  accumulator.add(RecordHistoryOldValue, 4);
  accumulator.add(TransactionHistory, 5);
  accumulator.add(RepositoryTransactionHistory, 6);
  accumulator.add(OperationHistory, 7);
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
