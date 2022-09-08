import {
	IRecordHistory,
} from './RecordHistory';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordHistoryOldValue {
	
	// Id Properties
	columnIndex: number;

	// Id Relations
	recordHistory: IRecordHistory;

	// Non-Id Properties
	oldValue?: any;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


