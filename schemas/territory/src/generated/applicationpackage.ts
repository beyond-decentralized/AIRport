import {
	IApplication,
} from './application';
import {
	IPackage,
} from './package';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationPackage {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	application?: IApplication;
	package?: IPackage;

	// Transient Properties

	// Public Methods
	
}


