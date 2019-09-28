import {
	ILogEntry,
} from './logentry';
import {
	ILoggedErrorStackTrace,
} from './loggederrorstacktrace';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILoggedError {
	
	// Id Properties

	// Id Relations
	logEntry: ILogEntry;

	// Non-Id Properties

	// Non-Id Relations
	stackTrace?: ILoggedErrorStackTrace;

	// Transient Properties

	// Public Methods
	
}


