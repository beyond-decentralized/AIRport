import {
	IApplicationPackage,
	IPackagedUnit,
} from '@airport/territory';
import {
	ILogEntry,
} from './logentry';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILogEntryType {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	level?: string;
	text?: string;

	// Non-Id Relations
	applicationPackage?: IApplicationPackage;
	packagedUnit?: IPackagedUnit;
	logEntries?: ILogEntry[];

	// Transient Properties

	// Public Methods
	
}


