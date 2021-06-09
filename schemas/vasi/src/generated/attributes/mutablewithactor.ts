import {
	IMutable,
} from './mutable';
import {
	IActor,
} from '@airport/holding-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IMutableWithActor extends IMutable {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	actor?: IActor;

	// Transient Properties

	// Public Methods
	
}


