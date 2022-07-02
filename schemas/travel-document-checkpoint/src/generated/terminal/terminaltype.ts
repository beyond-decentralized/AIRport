import {
	ITerminal,
} from './terminal';
import {
	IType,
} from '../type/type';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminalType {
	
	// Id Properties

	// Id Relations
	terminal: ITerminal;
	type: IType;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


