import {
	IApplicationVersion,
} from './applicationversion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IVersionedApplicationObject {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	deprecatedSinceVersion?: IApplicationVersion;
	removedInVersion?: IApplicationVersion;
	sinceVersion?: IApplicationVersion;

	// Transient Properties

	// Public Methods
	
}


