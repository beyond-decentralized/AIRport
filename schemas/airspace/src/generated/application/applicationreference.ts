import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';
import {
	IApplicationVersion,
} from './applicationversion';



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


