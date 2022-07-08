/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Actor } from '../ddl/infrastructure/Actor';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { RepositoryType } from '../ddl/repository/RepositoryType';
import { RepositoryDatabase } from '../ddl/repository/RepositoryDatabase';
import { RepositoryClient } from '../ddl/repository/RepositoryClient';
import { RepositoryTerminal } from '../ddl/repository/RepositoryTerminal';
import { RepositoryApplication } from '../ddl/repository/RepositoryApplication';
import { Repository } from '../ddl/repository/Repository';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { AirEntity } from '../ddl/repository/AirEntity';

DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'holding-pattern');
  accumulator.add(Actor, 0);
  accumulator.add(RecordHistoryNewValue, 1);
  accumulator.add(RecordHistoryOldValue, 2);
  accumulator.add(RecordHistory, 3);
  accumulator.add(RepositoryType, 4);
  accumulator.add(RepositoryDatabase, 5);
  accumulator.add(RepositoryClient, 6);
  accumulator.add(RepositoryTerminal, 7);
  accumulator.add(RepositoryApplication, 8);
  accumulator.add(Repository, 9);
  accumulator.add(TransactionHistory, 10);
  accumulator.add(RepositoryTransactionHistory, 11);
  accumulator.add(OperationHistory, 12);
  accumulator.add(AirEntity, undefined);
});
