import {
	IRepository,
} from './repository';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryApplication {
	
	// Id Properties
	id: number;

	// Id Relations
	repository: IRepository;

	// Non-Id Properties
	applicationIndex?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


