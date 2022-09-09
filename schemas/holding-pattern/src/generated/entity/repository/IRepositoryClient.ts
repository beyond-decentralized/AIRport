import {
	IRepository,
} from './IRepository';
import {
	IClient,
} from '@airport/travel-document-checkpoint';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryClient {
	
	// Id Properties

	// Id Relations
	repository: IRepository;
	client: IClient;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


