import {
	IPackage,
} from './package';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IPackagedUnit {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	package?: IPackage;

	// Transient Properties

	// Public Methods
	
}


