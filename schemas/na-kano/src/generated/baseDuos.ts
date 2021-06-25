/* eslint-disable */
import {
	ITodoItem,
} from './todoitem';
import {
	TodoItemESelect,
	TodoItemECreateColumns,
	TodoItemECreateProperties,
	TodoItemEUpdateColumns,
	TodoItemEUpdateProperties,
	TodoItemEId,
	TodoItemGraph,
	QTodoItem,
} from './qtodoitem';
import {
	ITodoList,
} from './todolist';
import {
	TodoListESelect,
	TodoListECreateColumns,
	TodoListECreateProperties,
	TodoListEUpdateColumns,
	TodoListEUpdateProperties,
	TodoListEId,
	TodoListGraph,
	QTodoList,
} from './qtodolist';
import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Duo,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qSchema';


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseTodoItemDuo
  extends IDuo<ITodoItem, TodoItemESelect, TodoItemECreateProperties, TodoItemEUpdateColumns, TodoItemEUpdateProperties, TodoItemEId, TodoItemGraph, QTodoItem> {
}

export class BaseTodoItemDuo
  extends SQDIDuo<ITodoItem, TodoItemESelect, TodoItemECreateProperties, TodoItemEUpdateColumns, TodoItemEUpdateProperties, TodoItemEId, TodoItemGraph, QTodoItem>
	implements IBaseTodoItemDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTodoListDuo
  extends IDuo<ITodoList, TodoListESelect, TodoListECreateProperties, TodoListEUpdateColumns, TodoListEUpdateProperties, TodoListEId, TodoListGraph, QTodoList> {
}

export class BaseTodoListDuo
  extends SQDIDuo<ITodoList, TodoListESelect, TodoListECreateProperties, TodoListEUpdateColumns, TodoListEUpdateProperties, TodoListEId, TodoListGraph, QTodoList>
	implements IBaseTodoListDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
