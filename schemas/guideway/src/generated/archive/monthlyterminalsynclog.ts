import {
	IMonthlyArchiveLog,
} from './monthlyarchivelog';
import {
	ITerminal,
} from '../terminal/terminal';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IMonthlyTerminalSyncLog {
	
	// Id Properties

	// Id Relations
	monthlyArchiveLog: IMonthlyArchiveLog;
	terminal: ITerminal;

	// Non-Id Properties
	allAcknowledged?: boolean;
	dailySyncStatuses?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


