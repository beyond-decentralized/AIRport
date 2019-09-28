import {
	IStageable,
} from '../infrastructure/stageable';
import {
	IUser,
} from '@airport/travel-document-checkpoint';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IImmutableRow extends IStageable {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties
	createdAt?: Date;

	// Non-Id Relations
	user?: IUser;

	// Transient Properties

	// Public Methods
	
}


