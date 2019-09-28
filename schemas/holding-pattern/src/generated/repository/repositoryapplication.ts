import {
	IRepository,
} from './repository';
import {
	IApplication,
} from '../infrastructure/application';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryApplication {
	
	// Id Properties
	id: number;

	// Id Relations
	repository: IRepository;

	// Non-Id Properties

	// Non-Id Relations
	application?: IApplication;

	// Transient Properties

	// Public Methods
	
}


