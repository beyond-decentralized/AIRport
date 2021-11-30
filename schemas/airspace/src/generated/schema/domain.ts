import {
	ISchema,
} from './schema';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDomain {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	schemas?: ISchema[];

	// Transient Properties

	// Public Methods
	
}


