import {
	IRepository,
} from './repository';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositorySchema {
	
	// Id Properties
	id: number;

	// Id Relations
	repository: IRepository;

	// Non-Id Properties
	schemaIndex?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


