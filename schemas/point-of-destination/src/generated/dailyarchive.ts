import {
	IDailyArchiveLog,
	IRepository,
} from '@airport/guideway';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDailyArchive {
	
	// Id Properties

	// Id Relations
	dailyArchiveLog: IDailyArchiveLog;

	// Non-Id Properties
	repositoryData?: string;

	// Non-Id Relations
	repository?: IRepository;

	// Transient Properties

	// Public Methods
	
}


