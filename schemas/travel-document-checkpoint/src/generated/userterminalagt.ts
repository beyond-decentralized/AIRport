import {
	IUserAccount,
} from './userAccount';
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

export interface IUserAccountTerminalAgt {
	
	// Id Properties
	id: number;
	agtId: number;

	// Id Relations

	// Non-Id Properties
	password?: number;

	// Non-Id Relations
	userAccount?: IUserAccount;
	terminal?: ITerminal;
	agt?: IAgt;
	terminalAgt?: ITerminalAgt;

	// Transient Properties

	// Public Methods
	
}


