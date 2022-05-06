import {
	IRepository,
	IRecordHistory,
} from '@airport/holding-pattern-runtime';
import {
	ISynchronizationConflictValues,
} from './synchronizationconflictvalues';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISynchronizationConflict {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	type?: string;
	acknowledged?: boolean;

	// Non-Id Relations
	repository?: IRepository;
	overwrittenRecordHistory?: IRecordHistory;
	overwritingRecordHistory?: IRecordHistory;
	values?: ISynchronizationConflictValues[];

	// Transient Properties

	// Public Methods
	
}


