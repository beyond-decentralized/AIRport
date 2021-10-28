import {
	ICountry,
} from './country';
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
	privateId?: string;
	publicId?: string;
	email?: string;
	username?: string;

	// Non-Id Relations
	country?: ICountry;
	userTerminal?: IUserTerminal[];
	userTerminalAgts?: IUserTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}


