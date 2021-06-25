/* eslint-disable */
import { AIR_DB } from '@airport/air-control';
import { DI } from '@airport/di';
import { TodoList } from '../ddl/TodoList';
import { TodoItem } from '../ddl/TodoItem';

DI.db().get(AIR_DB).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'na-kano');
  accumulator.add(TodoList, 0);
  accumulator.add(TodoItem, 1);
});
