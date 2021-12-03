import {
	IUser,
} from './user';



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

	// Transient Properties

	// Public Methods
	
}


