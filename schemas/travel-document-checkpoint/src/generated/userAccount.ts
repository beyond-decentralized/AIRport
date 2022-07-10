import {
	IDomain,
} from '@airport/airspace';
import {
	IContinent,
} from './locality/continent';
import {
	ICountry,
} from './locality/country';
import {
	IState,
} from './locality/state';
import {
	IMetroArea,
} from './locality/metroarea';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserAccount {
	
	// Id Properties
	_localId?: number;

	// Id Relations

	// Non-Id Properties
	email?: string;
	passwordHash?: string;
	ranking?: number;
	username?: string;
	GUID?: string;

	// Non-Id Relations
	domain?: IDomain;
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;

	// Transient Properties

	// Public Methods
	
}


