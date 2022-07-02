import {
	IUser,
	ITerminal,
	IClient,
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
	GUID?: string;

	// Non-Id Relations
	user?: IUser;
	terminal?: ITerminal;
	application?: IApplication;
	client?: IClient;

	// Transient Properties

	// Public Methods
	
}


