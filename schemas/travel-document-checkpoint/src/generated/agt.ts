import {
	ITerminalAgt,
} from './terminalagt';
import {
	IUserTerminalAgt,
} from './userterminalagt';



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
	userTerminalAgts?: IUserTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}


