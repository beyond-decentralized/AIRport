import {
	IUserAccount,
} from './userAccount';
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

export interface ITerminal {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;
	isLocal?: boolean;

	// Non-Id Relations
	owner?: IUserAccount;
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;

	// Transient Properties

	// Public Methods
	
}


