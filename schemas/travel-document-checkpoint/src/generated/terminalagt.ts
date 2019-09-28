import {
	ITerminal,
} from './terminal';
import {
	IAgt,
} from './agt';
import {
	IUserTerminalAgt,
} from './userterminalagt';



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
	userTerminalAgts?: IUserTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}


