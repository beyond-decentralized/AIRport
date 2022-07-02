import {
	ICountry,
} from './country';
import {
	IUser,
} from '../user';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IContinent {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	countries?: ICountry[];
	users?: IUser[];

	// Transient Properties

	// Public Methods
	
}


