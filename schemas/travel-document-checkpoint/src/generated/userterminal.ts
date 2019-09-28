import {
	IUser,
} from './user';
import {
	ITerminal,
} from './terminal';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserTerminal {
	
	// Id Properties

	// Id Relations
	user: IUser;
	terminal: ITerminal;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


