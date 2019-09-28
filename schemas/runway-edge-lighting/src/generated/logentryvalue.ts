import {
	ILogEntry,
} from './logentry';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILogEntryValue {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	position?: number;
	value?: any;

	// Non-Id Relations
	logEntry?: ILogEntry;

	// Transient Properties

	// Public Methods
	
}


