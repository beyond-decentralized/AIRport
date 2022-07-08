import {
	IUserAccount,
} from './userAccount';
import {
	ITerminal,
} from './terminal';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserAccountTerminal {
	
	// Id Properties

	// Id Relations
	userAccount: IUserAccount;
	terminal: ITerminal;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


