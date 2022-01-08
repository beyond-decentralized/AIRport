import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntitySearch,
	IEntitySearchOne,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	RepositoryEntityGraph,
	RepositoryEntityEId,
	RepositoryEntityEUpdateColumns,
	RepositoryEntityEUpdateProperties,
	RepositoryEntityESelect,
	QRepositoryEntityQId,
	QRepositoryEntityQRelation,
	QRepositoryEntity,
} from '@airport/holding-pattern';
import {
	TodoListGraph,
	TodoListEId,
	TodoListEOptionalId,
	TodoListEUpdateProperties,
	TodoListESelect,
	QTodoList,
	QTodoListQId,
	QTodoListQRelation,
} from './qtodolist';
import {
	TodoList,
} from '../ddl/TodoList';
import {
	TodoItem,
} from '../ddl/TodoItem';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TodoItemESelect
    extends RepositoryEntityESelect, TodoItemEOptionalId {
	// Non-Id Properties
	assignedTo?: string | IQStringField;
	completed?: boolean | IQBooleanField;
	name?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	todoList?: TodoListESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TodoItemEId
    extends RepositoryEntityEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TodoItemEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TodoItemEUpdateProperties
	extends RepositoryEntityEUpdateProperties {
	// Non-Id Properties
	assignedTo?: string | IQStringField;
	completed?: boolean | IQBooleanField;
	name?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	todoList?: TodoListEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TodoItemGraph
	extends TodoItemEOptionalId, RepositoryEntityGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	assignedTo?: string | IQStringField;
	completed?: boolean | IQBooleanField;
	name?: string | IQStringField;

	// Relations
	todoList?: TodoListGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TodoItemEUpdateColumns
	extends RepositoryEntityEUpdateColumns {
	// Non-Id Columns
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
export interface TodoItemECreateProperties
extends Partial<TodoItemEId>, TodoItemEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TodoItemECreateColumns
extends TodoItemEId, TodoItemEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTodoItem extends QRepositoryEntity<TodoItem>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	assignedTo: IQStringField;
	completed: IQBooleanField;
	name: IQStringField;

	// Non-Id Relations
	todoList: QTodoListQRelation;

}


// Entity Id Interface
export interface QTodoItemQId extends QRepositoryEntityQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QTodoItemQRelation
	extends QRepositoryEntityQRelation<TodoItem, QTodoItem>, QTodoItemQId {
}

