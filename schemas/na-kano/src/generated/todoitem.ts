import {
	IRepositoryEntity,
} from '@airport/holding-pattern';
import {
	ITodoList,
} from './todolist';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITodoItem extends IRepositoryEntity {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties
	assignedTo?: string;
	completed?: boolean;
	name?: string;

	// Non-Id Relations
	todoList?: ITodoList;

	// Transient Properties

	// Public Methods
	
}


