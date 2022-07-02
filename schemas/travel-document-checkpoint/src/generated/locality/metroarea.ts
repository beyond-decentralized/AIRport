import {
	ICountry,
} from './country';
import {
	IState,
} from './state';
import {
	IUser,
} from '../user';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IMetroArea {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	country?: ICountry;
	metroAreaStates?: IState[];
	users?: IUser[];

	// Transient Properties

	// Public Methods
	
}


