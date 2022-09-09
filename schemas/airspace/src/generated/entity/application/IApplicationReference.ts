import {
	IVersionedApplicationObject,
} from './IVersionedApplicationObject';
import {
	IApplicationVersion,
} from './IApplicationVersion';



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


