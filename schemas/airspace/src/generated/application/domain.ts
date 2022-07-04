import {
	IApplication,
} from './application';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDomain {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	applications?: IApplication[];

	// Transient Properties

	// Public Methods
	
}


