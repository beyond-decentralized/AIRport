import {
	IApplication,
} from './IApplication';
import {
	IApplicationVersion,
} from './IApplicationVersion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationCurrentVersion {
	
	// Id Properties

	// Id Relations
	application: IApplication;
	applicationVersion: IApplicationVersion;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


