import {
	IRecordHistory,
} from './IRecordHistory';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordHistoryNewValue {
	
	// Id Properties
	columnIndex: number;

	// Id Relations
	recordHistory: IRecordHistory;

	// Non-Id Properties
	newValue?: any;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


