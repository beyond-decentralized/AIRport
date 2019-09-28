import {
	ITerminal,
} from './terminal';
import {
	IRepository,
} from '../repository/repository';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminalRepository {
	
	// Id Properties

	// Id Relations
	terminal: ITerminal;
	repository: IRepository;

	// Non-Id Properties
	permission?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


