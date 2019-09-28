import {
	IUser,
} from '../user/user';
import {
	ITerminalRepository,
} from './terminalrepository';
import {
	IAgtSharingMessage,
} from '../synchronization/agtsharingmessage';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminal {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;
	secondId?: number;
	password?: string;
	lastPollConnectionDatetime?: number;
	lastSseConnectionDatetime?: number;

	// Non-Id Relations
	user?: IUser;
	terminalRepositories?: ITerminalRepository[];
	sharingMessages?: IAgtSharingMessage[];

	// Transient Properties

	// Public Methods
	
}


