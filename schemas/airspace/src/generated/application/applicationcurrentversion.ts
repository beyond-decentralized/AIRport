import {
	IApplication,
} from './Application';
import {
	IApplicationVersion,
} from './ApplicationVersion';



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


