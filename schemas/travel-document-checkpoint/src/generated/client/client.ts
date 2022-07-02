import {
	IClientType,
} from './clienttype';
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



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IClient {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	domain?: string;
	GUID?: string;

	// Non-Id Relations
	clienType?: IClientType;
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;

	// Transient Properties

	// Public Methods
	
}


