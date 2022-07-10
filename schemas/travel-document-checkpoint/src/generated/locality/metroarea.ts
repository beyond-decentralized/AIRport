import {
	ICountry,
} from './country';
import {
	IMetroAreaState,
} from './metroareastate';
import {
	IUserAccount,
} from '../useraccount';



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


