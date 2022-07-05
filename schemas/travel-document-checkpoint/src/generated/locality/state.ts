import {
	ICountry,
} from './country';
import {
	IUser,
} from '../user';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IState {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	abbreviation?: string;
	name?: string;

	// Non-Id Relations
	country?: ICountry;
	metroAreaStates?: IState[];
	users?: IUser[];

	// Transient Properties

	// Public Methods
	
}


