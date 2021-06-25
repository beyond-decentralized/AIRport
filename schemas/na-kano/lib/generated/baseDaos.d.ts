import { ITodoItem } from './todoitem';
import { TodoItemESelect, TodoItemECreateProperties, TodoItemEUpdateColumns, TodoItemEUpdateProperties, TodoItemEId, TodoItemGraph, QTodoItem } from './qtodoitem';
import { ITodoList } from './todolist';
import { TodoListESelect, TodoListECreateProperties, TodoListEUpdateColumns, TodoListEUpdateProperties, TodoListEId, TodoListGraph, QTodoList } from './qtodolist';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseTodoItemDao extends IDao<ITodoItem, TodoItemESelect, TodoItemECreateProperties, TodoItemEUpdateColumns, TodoItemEUpdateProperties, TodoItemEId, TodoItemGraph, QTodoItem> {
}
export declare class BaseTodoItemDao extends SQDIDao<ITodoItem, TodoItemESelect, TodoItemECreateProperties, TodoItemEUpdateColumns, TodoItemEUpdateProperties, TodoItemEId, TodoItemGraph, QTodoItem> implements IBaseTodoItemDao {
    static Find: DaoQueryDecorators<TodoItemESelect>;
    static FindOne: DaoQueryDecorators<TodoItemESelect>;
    static Search: DaoQueryDecorators<TodoItemESelect>;
    static SearchOne: DaoQueryDecorators<TodoItemESelect>;
    static Save(config: TodoItemGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTodoListDao extends IDao<ITodoList, TodoListESelect, TodoListECreateProperties, TodoListEUpdateColumns, TodoListEUpdateProperties, TodoListEId, TodoListGraph, QTodoList> {
}
export declare class BaseTodoListDao extends SQDIDao<ITodoList, TodoListESelect, TodoListECreateProperties, TodoListEUpdateColumns, TodoListEUpdateProperties, TodoListEId, TodoListGraph, QTodoList> implements IBaseTodoListDao {
    static Find: DaoQueryDecorators<TodoListESelect>;
    static FindOne: DaoQueryDecorators<TodoListESelect>;
    static Search: DaoQueryDecorators<TodoListESelect>;
    static SearchOne: DaoQueryDecorators<TodoListESelect>;
    static Save(config: TodoListGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map