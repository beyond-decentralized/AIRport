import {
	IContinent,
} from '../locality/IContinent';
import {
	ICountry,
} from '../locality/ICountry';
import {
	IState,
} from '../locality/IState';
import {
	IMetroArea,
} from '../locality/IMetroArea';
import {
	IClientType,
} from './IClientType';



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


