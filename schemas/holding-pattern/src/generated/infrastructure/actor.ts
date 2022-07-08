import {
	IUserAccount,
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
	_localId?: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;

	// Non-Id Relations
	userAccount?: IUserAccount;
	terminal?: ITerminal;
	application?: IApplication;
	client?: IClient;

	// Transient Properties

	// Public Methods
	
}


