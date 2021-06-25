import {
	IRepositoryEntity,
} from '@airport/holding-pattern';
import {
	ITodoItem,
} from './todoitem';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITodoList extends IRepositoryEntity {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	items?: ITodoItem[];

	// Transient Properties

	// Public Methods
	
}


