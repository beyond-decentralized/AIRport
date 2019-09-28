import {
	IApplicationPackage,
} from './applicationpackage';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IPackage {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	applicationPackages?: IApplicationPackage[];

	// Transient Properties

	// Public Methods
	
}


