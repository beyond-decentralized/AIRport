import {
	IDomain,
} from '@airport/airspace';
import {
	IContinent,
} from './locality/IContinent';
import {
	ICountry,
} from './locality/ICountry';
import {
	IState,
} from './locality/IState';
import {
	IMetroArea,
} from './locality/IMetroArea';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserAccount {
	
	// Id Properties
	GUID?: string;

	// Id Relations

	// Non-Id Properties
	email?: string;
	passwordHash?: string;
	ranking?: number;
	username?: string;

	// Non-Id Relations
	domain?: IDomain;
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;

	// Transient Properties

	// Public Methods
	
}


