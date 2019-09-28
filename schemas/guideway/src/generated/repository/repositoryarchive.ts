import {
	IRepository,
} from './repository';
import {
	IArchive,
} from './archive';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryArchive {
	
	// Id Properties

	// Id Relations
	repository: IRepository;
	archive: IArchive;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


