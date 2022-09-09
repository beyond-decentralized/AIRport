import {
	IUserAccount,
} from '../IUserAccount';
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
	ITerminalType,
} from './ITerminalType';



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
	owner?: IUserAccount;
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;
	terminalTypes?: ITerminalType[];

	// Transient Properties

	// Public Methods
	
}


