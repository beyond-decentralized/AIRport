import {
	ICountry,
} from './ICountry';
import {
	IMetroAreaState,
} from './IMetroAreaState';
import {
	IUserAccount,
} from '../IUserAccount';



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
	userAccounts?: IUserAccount[];

	// Transient Properties

	// Public Methods
	
}


