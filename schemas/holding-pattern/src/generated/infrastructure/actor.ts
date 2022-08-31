import {
	IUserAccount,
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
	_localId?: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;

	// Non-Id Relations
	userAccount?: IUserAccount;
	terminal?: ITerminal;
	application?: IApplication;

	// Transient Properties

	// Public Methods
	
}


