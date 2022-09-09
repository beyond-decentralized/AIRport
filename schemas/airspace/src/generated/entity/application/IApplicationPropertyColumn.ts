import {
	IVersionedApplicationObject,
} from './IVersionedApplicationObject';
import {
	IApplicationColumn,
} from './IApplicationColumn';
import {
	IApplicationProperty,
} from './IApplicationProperty';



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


