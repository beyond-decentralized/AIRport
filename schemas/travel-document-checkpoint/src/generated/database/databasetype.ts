import {
	IDatabase,
} from './database';
import {
	IType,
} from '../type/type';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabaseType {
	
	// Id Properties

	// Id Relations
	database: IDatabase;
	type: IType;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


