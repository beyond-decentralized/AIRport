import {
	IRepository,
} from './repository';
import {
	IActor,
} from '../infrastructure/actor';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryActor {
	
	// Id Properties
	id: number;

	// Id Relations
	repository: IRepository;

	// Non-Id Properties

	// Non-Id Relations
	actor?: IActor;

	// Transient Properties

	// Public Methods
	
}


