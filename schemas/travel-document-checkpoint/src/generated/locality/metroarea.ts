import {
	ICountry,
} from './country';
import {
	IMetroAreaState,
} from './metroareastate';
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
	metroAreaStates?: IMetroAreaState[];
	users?: IUser[];

	// Transient Properties

	// Public Methods
	
}


