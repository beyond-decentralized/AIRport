import {
	IRepository,
} from '../repository/repository';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDailyArchiveLog {
	
	// Id Properties
	dateNumber: number;

	// Id Relations
	repository: IRepository;

	// Non-Id Properties
	numberOfChanges?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


