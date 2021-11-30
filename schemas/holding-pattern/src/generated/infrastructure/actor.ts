import {
	IUser,
	ITerminal,
} from '@airport/travel-document-checkpoint';
import {
	ISchema,
} from '@airport/airspace';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IActor {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	uuId?: string;

	// Non-Id Relations
	user?: IUser;
	terminal?: ITerminal;
	schema?: ISchema;

	// Transient Properties

	// Public Methods
	
}


