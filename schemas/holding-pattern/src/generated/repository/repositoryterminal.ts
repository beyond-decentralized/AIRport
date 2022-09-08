import {
	IRepository,
} from './Repository';
import {
	ITerminal,
} from '@airport/travel-document-checkpoint';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryTerminal {
	
	// Id Properties

	// Id Relations
	repository: IRepository;
	terminal: ITerminal;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


