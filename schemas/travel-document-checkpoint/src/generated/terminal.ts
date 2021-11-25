import {
	IUser,
} from './user';
import {
	ITerminalAgt,
} from './terminalagt';
import {
	IUserTerminal,
} from './userterminal';
import {
	IUserTerminalAgt,
} from './userterminalagt';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminal {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	uuId?: string;
	isLocal?: boolean;

	// Non-Id Relations
	owner?: IUser;
	terminalAgts?: ITerminalAgt[];
	userTerminal?: IUserTerminal[];
	userTerminalAgt?: IUserTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}


