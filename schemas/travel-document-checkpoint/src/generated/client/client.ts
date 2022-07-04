import {
	IContinent,
} from '../locality/continent';
import {
	ICountry,
} from '../locality/country';
import {
	IState,
} from '../locality/state';
import {
	IMetroArea,
} from '../locality/metroarea';
import {
	IClientType,
} from './clienttype';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IClient {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	domain?: string;
	GUID?: string;

	// Non-Id Relations
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;
	clientTypes?: IClientType[];

	// Transient Properties

	// Public Methods
	
}


