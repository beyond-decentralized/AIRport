import {
	IRepository,
} from '../repository/repository';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IMonthlyArchiveLog {
	
	// Id Properties
	monthNumber: number;

	// Id Relations
	repository: IRepository;

	// Non-Id Properties
	numberOfChanges?: number;
	daysWithChanges?: any;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


