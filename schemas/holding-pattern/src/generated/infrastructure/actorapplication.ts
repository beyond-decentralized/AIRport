import {
	IActor,
} from './actor';
import {
	IApplication,
} from './application';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IActorApplication {
	
	// Id Properties
	id: number;

	// Id Relations
	actor: IActor;

	// Non-Id Properties

	// Non-Id Relations
	application?: IApplication;

	// Transient Properties

	// Public Methods
	
}


