import {
	ICountry,
} from './country';
import {
	IUserAccount,
} from '../userAccount';



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
	userAccounts?: IUserAccount[];

	// Transient Properties

	// Public Methods
	
}


