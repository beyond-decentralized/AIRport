import {
	IImmutable,
} from './immutable';
import {
	IActor,
} from '@airport/holding-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IImmutableWithActor extends IImmutable {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	actor?: IActor;

	// Transient Properties

	// Public Methods
	
}


