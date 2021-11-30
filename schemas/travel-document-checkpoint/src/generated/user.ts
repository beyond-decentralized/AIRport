import {
	IUserTerminal,
} from './userterminal';
import {
	IUserTerminalAgt,
} from './userterminalagt';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUser {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	uuId?: string;
	username?: string;

	// Non-Id Relations
	userTerminal?: IUserTerminal[];
	userTerminalAgts?: IUserTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}


