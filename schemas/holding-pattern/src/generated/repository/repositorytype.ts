import {
	IRepository,
} from './repository';
import {
	IType,
} from '@airport/travel-document-checkpoint';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryType {
	
	// Id Properties

	// Id Relations
	repository: IRepository;
	type: IType;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


