import {
	IContinent,
} from './continent';
import {
	IUser,
} from './user';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ICountry {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	continent?: IContinent;
	users?: IUser[];

	// Transient Properties

	// Public Methods
	
}


