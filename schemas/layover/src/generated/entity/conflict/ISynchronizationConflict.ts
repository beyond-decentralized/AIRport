import {
	IRepository,
	IRecordHistory,
} from '@airport/holding-pattern';
import {
	ISynchronizationConflictValues,
} from './ISynchronizationConflictValues';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISynchronizationConflict {
	
	// Id Properties
	_localId: number;

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


