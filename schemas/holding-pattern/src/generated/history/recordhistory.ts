import {
	SyncColumnMap,
} from '@airport/ground-control';
import {
	IRepository,
} from '../repository/repository';
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
	id: number;

	// Id Relations

	// Non-Id Properties
	actorRecordId?: number;

	// Non-Id Relations
	repository?: IRepository;
	actor?: IActor;
	operationHistory?: IOperationHistory;
	newValues?: IRecordHistoryNewValue[];
	oldValues?: IRecordHistoryOldValue[];

	// Transient Properties
	tableColumnMap?: SyncColumnMap;

	// Public Methods
	
}


