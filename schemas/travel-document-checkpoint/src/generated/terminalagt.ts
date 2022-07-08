import {
	ITerminal,
} from './terminal';
import {
	IAgt,
} from './agt';
import {
	IUserAccountTerminalAgt,
} from './userAccountterminalagt';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminalAgt {
	
	// Id Properties

	// Id Relations
	terminal: ITerminal;
	agt: IAgt;

	// Non-Id Properties
	password?: string;

	// Non-Id Relations
	userAccountTerminalAgts?: IUserAccountTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}


