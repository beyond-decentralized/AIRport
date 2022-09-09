import {
	ICountry,
} from './ICountry';
import {
	IUserAccount,
} from '../IUserAccount';



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
	userAccounts?: IUserAccount[];

	// Transient Properties

	// Public Methods
	
}


