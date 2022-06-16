import {
	IUser,
	ITerminal,
} from '@airport/travel-document-checkpoint';
import {
	IApplication,
} from '@airport/airspace';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IActor {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	uuId?: string;

	// Non-Id Relations
	user?: IUser;
	terminal?: ITerminal;
	application?: IApplication;

	// Transient Properties

	// Public Methods
	
}


