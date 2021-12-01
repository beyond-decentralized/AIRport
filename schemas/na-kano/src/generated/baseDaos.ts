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
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Dao,
	DaoQueryDecorators,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
	extends Dao<Entity,
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


export interface IBaseTodoItemDao
  extends IDao<ITodoItem, TodoItemESelect, TodoItemECreateProperties, TodoItemEUpdateColumns, TodoItemEUpdateProperties, TodoItemEId, TodoItemGraph, QTodoItem> {
}

export class BaseTodoItemDao
  extends SQDIDao<ITodoItem, TodoItemESelect, TodoItemECreateProperties, TodoItemEUpdateColumns, TodoItemEUpdateProperties, TodoItemEId, TodoItemGraph, QTodoItem>
	implements IBaseTodoItemDao {
	
	static Find      = new DaoQueryDecorators<TodoItemESelect>();
	static FindOne   = new DaoQueryDecorators<TodoItemESelect>();
	static Search    = new DaoQueryDecorators<TodoItemESelect>();
	static SearchOne = new DaoQueryDecorators<TodoItemESelect>();
	static Save(
		config: TodoItemGraph
	): PropertyDecorator {
		return Dao.BaseSave<TodoItemGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTodoListDao
  extends IDao<ITodoList, TodoListESelect, TodoListECreateProperties, TodoListEUpdateColumns, TodoListEUpdateProperties, TodoListEId, TodoListGraph, QTodoList> {
}

export class BaseTodoListDao
  extends SQDIDao<ITodoList, TodoListESelect, TodoListECreateProperties, TodoListEUpdateColumns, TodoListEUpdateProperties, TodoListEId, TodoListGraph, QTodoList>
	implements IBaseTodoListDao {
	
	static Find      = new DaoQueryDecorators<TodoListESelect>();
	static FindOne   = new DaoQueryDecorators<TodoListESelect>();
	static Search    = new DaoQueryDecorators<TodoListESelect>();
	static SearchOne = new DaoQueryDecorators<TodoListESelect>();
	static Save(
		config: TodoListGraph
	): PropertyDecorator {
		return Dao.BaseSave<TodoListGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
