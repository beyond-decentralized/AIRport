import {
	IUser,
} from './user';
import {
	ITerminal,
} from './terminal';
import {
	IAgt,
} from './agt';
import {
	ITerminalAgt,
} from './terminalagt';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserTerminalAgt {
	
	// Id Properties
	id: number;
	agtId: number;

	// Id Relations

	// Non-Id Properties
	password?: number;

	// Non-Id Relations
	user?: IUser;
	terminal?: ITerminal;
	agt?: IAgt;
	terminalAgt?: ITerminalAgt;

	// Transient Properties

	// Public Methods
	
}


