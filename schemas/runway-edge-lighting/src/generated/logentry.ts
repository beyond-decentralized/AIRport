import {
	ILogEntryType,
} from './logentrytype';
import {
	ILogEntryValue,
} from './logentryvalue';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILogEntry {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	timestamp?: Date;

	// Non-Id Relations
	type?: ILogEntryType;
	values?: ILogEntryValue[];

	// Transient Properties

	// Public Methods
	
}


