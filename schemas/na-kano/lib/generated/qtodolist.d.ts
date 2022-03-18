import { IQNumberField, IQStringField, IQRepositoryEntityOneToManyRelation } from '@airport/air-control';
import { RepositoryEntityGraph, RepositoryEntityEId, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityESelect, QRepositoryEntityQId, QRepositoryEntityQRelation, QRepositoryEntity } from '@airport/holding-pattern';
import { TodoItemGraph, TodoItemESelect, QTodoItem } from './qtodoitem';
import { TodoItem } from '../ddl/TodoItem';
import { TodoList } from '../ddl/TodoList';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TodoListESelect extends RepositoryEntityESelect, TodoListEOptionalId {
    name?: string | IQStringField;
    items?: TodoItemESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TodoListEId extends RepositoryEntityEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface TodoListEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TodoListEUpdateProperties extends RepositoryEntityEUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TodoListGraph extends TodoListEOptionalId, RepositoryEntityGraph {
    name?: string | IQStringField;
    items?: TodoItemGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TodoListEUpdateColumns extends RepositoryEntityEUpdateColumns {
    AGE_SUITABILITY?: number | IQNumberField;
    SYSTEM_WIDE_OPERATION_ID?: number | IQNumberField;
    ORIGINAL_ACTOR_RECORD_ID?: number | IQNumberField;
    ORIGINAL_REPOSITORY_ID?: number | IQNumberField;
    ORIGINAL_ACTOR_ID?: number | IQNumberField;
    NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TodoListECreateProperties extends Partial<TodoListEId>, TodoListEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TodoListECreateColumns extends TodoListEId, TodoListEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTodoList extends QRepositoryEntity<TodoList> {
    name: IQStringField;
    items: IQRepositoryEntityOneToManyRelation<TodoItem, QTodoItem>;
}
export interface QTodoListQId extends QRepositoryEntityQId {
}
export interface QTodoListQRelation extends QRepositoryEntityQRelation<TodoList, QTodoList>, QTodoListQId {
}
//# sourceMappingURL=qtodolist.d.ts.map