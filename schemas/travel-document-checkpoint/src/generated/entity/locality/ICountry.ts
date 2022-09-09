import {
	IContinent,
} from './IContinent';
import {
	IUserAccount,
} from '../IUserAccount';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ICountry {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	abbreviation?: string;
	name?: string;

	// Non-Id Relations
	continent?: IContinent;
	userAccounts?: IUserAccount[];

	// Transient Properties

	// Public Methods
	
}


