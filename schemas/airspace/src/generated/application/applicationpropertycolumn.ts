import {
	IVersionedApplicationObject,
} from './VersionedApplicationObject';
import {
	IApplicationColumn,
} from './ApplicationColumn';
import {
	IApplicationProperty,
} from './ApplicationProperty';



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


