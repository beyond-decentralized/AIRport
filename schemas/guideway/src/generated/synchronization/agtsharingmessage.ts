import {
	ITerminal,
} from '../terminal/terminal';
import {
	ISyncLog,
} from './synclog';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IAgtSharingMessage {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	tmSharingMessageId?: number;
	acknowledged?: string;

	// Non-Id Relations
	terminal?: ITerminal;
	syncLogs?: ISyncLog[];

	// Transient Properties

	// Public Methods
	
}


