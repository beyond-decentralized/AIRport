import {
	IDailyArchiveLog,
} from './dailyarchivelog';
import {
	ITerminal,
} from '../terminal/terminal';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDailyTerminalSyncLog {
	
	// Id Properties

	// Id Relations
	dailyArchiveLog: IDailyArchiveLog;
	terminal: ITerminal;

	// Non-Id Properties
	acknowledged?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


