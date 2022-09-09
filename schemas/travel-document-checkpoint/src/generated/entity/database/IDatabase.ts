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
	IDatabaseType,
} from './IDatabaseType';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabase {
	
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
	databaseTypes?: IDatabaseType[];

	// Transient Properties

	// Public Methods
	
}


