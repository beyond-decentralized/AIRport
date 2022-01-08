import { IQBooleanField, IQNumberField, IQStringField } from '@airport/air-control';
import { RepositoryEntityGraph, RepositoryEntityEId, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityESelect, QRepositoryEntityQId, QRepositoryEntityQRelation, QRepositoryEntity } from '@airport/holding-pattern';
import { TodoListGraph, TodoListEOptionalId, TodoListESelect, QTodoListQRelation } from './qtodolist';
import { TodoItem } from '../ddl/TodoItem';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TodoItemESelect extends RepositoryEntityESelect, TodoItemEOptionalId {
    assignedTo?: string | IQStringField;
    completed?: boolean | IQBooleanField;
    name?: string | IQStringField;
    todoList?: TodoListESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TodoItemEId extends RepositoryEntityEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface TodoItemEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TodoItemEUpdateProperties extends RepositoryEntityEUpdateProperties {
    assignedTo?: string | IQStringField;
    completed?: boolean | IQBooleanField;
    name?: string | IQStringField;
    todoList?: TodoListEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TodoItemGraph extends TodoItemEOptionalId, RepositoryEntityGraph {
    assignedTo?: string | IQStringField;
    completed?: boolean | IQBooleanField;
    name?: string | IQStringField;
    todoList?: TodoListGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TodoItemEUpdateColumns extends RepositoryEntityEUpdateColumns {
    AGE_SUITABILITY?: number | IQNumberField;
    SYSTEM_WIDE_OPERATION_ID?: number | IQNumberField;
    ORIGINAL_ACTOR_RECORD_ID?: number | IQNumberField;
    ORIGINAL_REPOSITORY_ID?: number | IQNumberField;
    ORIGINAL_ACTOR_ID?: number | IQNumberField;
    ASSIGNED_TO?: string | IQStringField;
    COMPLETED?: boolean | IQBooleanField;
    NAME?: string | IQStringField;
    TODO_LIST_RID_1?: number | IQNumberField;
    TODO_LIST_AID_1?: number | IQNumberField;
    TODO_LIST_ARID_1?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TodoItemECreateProperties extends Partial<TodoItemEId>, TodoItemEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TodoItemECreateColumns extends TodoItemEId, TodoItemEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTodoItem extends QRepositoryEntity<TodoItem> {
    assignedTo: IQStringField;
    completed: IQBooleanField;
    name: IQStringField;
    todoList: QTodoListQRelation;
}
export interface QTodoItemQId extends QRepositoryEntityQId {
}
export interface QTodoItemQRelation extends QRepositoryEntityQRelation<TodoItem, QTodoItem>, QTodoItemQId {
}
//# sourceMappingURL=qtodoitem.d.ts.map