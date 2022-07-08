import {
	ITerminalAgt,
} from './terminalagt';
import {
	IUserAccountTerminalAgt,
} from './userAccountterminalagt';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IAgt {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	address?: string;

	// Non-Id Relations
	terminalAgts?: ITerminalAgt[];
	userAccountTerminalAgts?: IUserAccountTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}


