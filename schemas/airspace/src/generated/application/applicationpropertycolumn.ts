import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	IApplicationProperty,
} from './applicationproperty';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationPropertyColumn extends IVersionedApplicationObject {
	
	// Id Properties

	// Id Relations
	column: IApplicationColumn;
	property: IApplicationProperty;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


