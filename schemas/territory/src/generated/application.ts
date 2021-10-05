import {
	IDomain,
} from './domain';
import {
	IApplicationPackage,
} from './applicationpackage';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplication {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;
	signature?: string;

	// Non-Id Relations
	domain?: IDomain;
	applicationPackages?: IApplicationPackage[];

	// Transient Properties

	// Public Methods
	
}


