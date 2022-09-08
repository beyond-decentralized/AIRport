import {
	IVersionedApplicationObject,
} from './VersionedApplicationObject';
import {
	IApplicationVersion,
} from './ApplicationVersion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationReference extends IVersionedApplicationObject {
	
	// Id Properties

	// Id Relations
	ownApplicationVersion: IApplicationVersion;
	referencedApplicationVersion: IApplicationVersion;

	// Non-Id Properties
	index?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


