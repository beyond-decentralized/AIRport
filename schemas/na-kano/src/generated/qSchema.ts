import {
	AIRPORT_DATABASE,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
import { QTodoItem } from './qtodoitem';
import { QTodoList } from './qtodolist';
import {
  TodoItem,
  TodoList
} from '../ddl/ddl';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	TodoItem: QTodoItem;
	TodoList: QTodoList;

}

const __constructors__ = {
	TodoItem: TodoItem,
	TodoList: TodoList
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/na-kano'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
