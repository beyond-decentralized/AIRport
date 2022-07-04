import {
	IUser,
} from '../user';
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
	ITerminalType,
} from './terminaltype';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminal {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;
	isLocal?: boolean;

	// Non-Id Relations
	owner?: IUser;
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;
	terminalTypes?: ITerminalType[];

	// Transient Properties

	// Public Methods
	
}


