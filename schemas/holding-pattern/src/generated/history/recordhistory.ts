import {
	SyncColumnMap,
} from '@airport/ground-control';
import {
	IActor,
} from '../infrastructure/actor';
import {
	IOperationHistory,
} from './operationhistory';
import {
	IRecordHistoryNewValue,
} from './recordhistorynewvalue';
import {
	IRecordHistoryOldValue,
} from './recordhistoryoldvalue';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordHistory {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	_actorRecordId?: number;

	// Non-Id Relations
	actor?: IActor;
	operationHistory?: IOperationHistory;
	newValues?: IRecordHistoryNewValue[];
	oldValues?: IRecordHistoryOldValue[];

	// Transient Properties
	tableColumnMap?: SyncColumnMap;

	// Public Methods
	
}


