import {
	IApplication,
} from '@airport/airspace';
import {
	IRepository,
} from './Repository';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryApplication {
	
	// Id Properties

	// Id Relations
	application: IApplication;
	repository: IRepository;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


