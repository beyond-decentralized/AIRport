/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { TodoList } from '../ddl/TodoList';
import { TodoItem } from '../ddl/TodoItem';

DI.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'na-kano');
  accumulator.add(TodoList, 0);
  accumulator.add(TodoItem, 1);
});
